from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import joblib
import pandas as pd
import numpy as np
import os

# ──────────────────────────────────────────────────────────────
# App setup
# ──────────────────────────────────────────────────────────────
app = FastAPI(
    title="Job-Change Prediction API",
    description="Predicts whether a data-science candidate is likely to look for a new job.",
    version="1.0.0",
)

# Allow all origins for local development / Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────────────────────
# Load saved ML artifacts (relative to this file)
# ──────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model   = joblib.load(os.path.join(BASE_DIR, "model.pkl"))
encoder = joblib.load(os.path.join(BASE_DIR, "encoder.pkl"))
scaler  = joblib.load(os.path.join(BASE_DIR, "scaler.pkl"))

# ──────────────────────────────────────────────────────────────
# Column lists  (must match the training order exactly)
# ──────────────────────────────────────────────────────────────
CATEGORICAL_COLUMNS = [
    "city",
    "gender",
    "relevent_experience",
    "enrolled_university",
    "education_level",
    "major_discipline",
    "experience",
    "company_size",
    "company_type",
    "last_new_job",
]

NUMERICAL_COLUMNS = [
    "city_development_index",
    "training_hours",
]

# Missing-value fill rules (mirrors the notebook's df_clean step)
# Columns with few missing values → filled with the training-set mode
MODE_FILL = {
    "enrolled_university": "no_enrollment",
    "education_level": "Graduate",
    "experience": ">20",
    "last_new_job": "1",
}

# Columns with many missing values → filled with "Unknown"
UNKNOWN_FILL = ["gender", "major_discipline", "company_size", "company_type"]


# ──────────────────────────────────────────────────────────────
# Request schema  (all optional so the frontend can omit unknowns)
# ──────────────────────────────────────────────────────────────
class CandidateInput(BaseModel):
    city: str
    city_development_index: float
    gender: Optional[str] = None
    relevent_experience: str
    enrolled_university: Optional[str] = None
    education_level: Optional[str] = None
    major_discipline: Optional[str] = None
    experience: Optional[str] = None
    company_size: Optional[str] = None
    company_type: Optional[str] = None
    last_new_job: Optional[str] = None
    training_hours: int


# ──────────────────────────────────────────────────────────────
# Preprocessing helper
# ──────────────────────────────────────────────────────────────
def preprocess(data: CandidateInput) -> np.ndarray:
    """
    Replicates the exact preprocessing pipeline from the notebook:
      1. Build a raw DataFrame from user input.
      2. Fill missing values (mode / "Unknown") — same as df_clean step.
      3. One-hot encode categorical columns with the saved encoder.
      4. Concatenate encoded categoricals with numerical columns.
      5. Scale with the saved StandardScaler.
    """
    # 1. Raw dict → DataFrame (single row)
    raw = {
        "city": data.city,
        "city_development_index": data.city_development_index,
        "gender": data.gender,
        "relevent_experience": data.relevent_experience,
        "enrolled_university": data.enrolled_university,
        "education_level": data.education_level,
        "major_discipline": data.major_discipline,
        "experience": data.experience,
        "company_size": data.company_size,
        "company_type": data.company_type,
        "last_new_job": data.last_new_job,
        "training_hours": data.training_hours,
    }
    df = pd.DataFrame([raw])

    # 2. Fill missing values exactly as the notebook does
    for col, mode_val in MODE_FILL.items():
        df[col] = df[col].fillna(mode_val)

    for col in UNKNOWN_FILL:
        df[col] = df[col].fillna("Unknown")

    # 3. Encode categorical columns
    cat_encoded = encoder.transform(df[CATEGORICAL_COLUMNS])
    cat_df = pd.DataFrame(cat_encoded, index=df.index)

    # 4. Concatenate with numerical columns (same order as training)
    X = pd.concat([cat_df, df[NUMERICAL_COLUMNS]], axis=1)
    X.columns = X.columns.astype(str)

    # 5. Scale
    X_scaled = scaler.transform(X)

    return X_scaled


# ──────────────────────────────────────────────────────────────
# Endpoints
# ──────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "Job-Change Prediction API is running. Use POST /predict to get a prediction."}


@app.post("/predict")
def predict(candidate: CandidateInput):
    """
    Accepts candidate features and returns a prediction.

    - **0** → candidate is **NOT** likely to look for a new job.
    - **1** → candidate **IS** likely to look for a new job.
    """
    try:
        X_scaled = preprocess(candidate)
        prediction = model.predict(X_scaled)[0]
        label = "Looking for a job change" if prediction == 1.0 else "Not looking for a job change"
        return {
            "prediction": int(prediction),
            "label": label,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
