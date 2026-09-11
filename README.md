# FastAPI Backend for HR Analytics Job-Change Prediction

This backend serves the final trained K-Nearest Neighbors (KNN) model directly from `ITI_Project_copy.ipynb` without altering any preprocessing order, scaling, or algorithm hyperparameters.

---

## 1. Folder Structure

```
ITI_Project_copy/
│
├── ITI_Project_copy.ipynb       # Copy of the notebook with the export cell added
│
└── backend/
    ├── main.py                  # Complete FastAPI application with exact preprocessing pipeline
    ├── requirements.txt         # Dependencies needed to run the backend
    ├── export_model.py          # Standalone script/snippet to export model, encoder & scaler
    ├── README.md                # Quickstart and testing instructions
    ├── model.pkl                # Final trained KNN model (n_neighbors=23)
    ├── encoder.pkl              # Fitted OneHotEncoder for the 10 categorical columns
    └── scaler.pkl               # Fitted StandardScaler for all encoded + numerical columns
```

---

## 2. Step 1: Exporting the ML Artifacts from the Notebook

The last cell of [ITI_Project_copy.ipynb](file:///c:/Users/nadia/Downloads/ITI_Project_copy/ITI_Project_copy.ipynb) contains the export code:

```python
import os
import joblib

os.makedirs('backend', exist_ok=True)

# Save the trained ML objects
joblib.dump(model, 'backend/model.pkl')
joblib.dump(encoder, 'backend/encoder.pkl')
joblib.dump(scaler, 'backend/scaler.pkl')

print('Saved ML objects successfully:')
print('- backend/model.pkl')
print('- backend/encoder.pkl')
print('- backend/scaler.pkl')
```

When you run this cell in your notebook or Colab environment, it saves `model.pkl`, `encoder.pkl`, and `scaler.pkl` directly inside `backend/`.

---

## 3. How to Run the FastAPI Backend Locally

### Prerequisites
Make sure you have Python installed, then navigate into the `backend/` folder:

```bash
cd backend
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Start the Server
```bash
uvicorn main:app --reload --port 8000
```

- API Base URL: `http://127.0.0.1:8000`
- Interactive API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`

---

## 4. API Specification

### Endpoint: `POST /predict`

#### Request Headers
```
Content-Type: application/json
```

#### Example Request Body
```json
{
  "city": "city_103",
  "city_development_index": 0.920,
  "gender": "Male",
  "relevent_experience": "Has relevent experience",
  "enrolled_university": "no_enrollment",
  "education_level": "Graduate",
  "major_discipline": "STEM",
  "experience": ">20",
  "company_size": "50-99",
  "company_type": "Pvt Ltd",
  "last_new_job": "1",
  "training_hours": 36
}
```

#### Example Response Body
```json
{
  "prediction": 0,
  "label": "Not looking for a job change"
}
```

*(If `prediction == 1`, the label returned will be `"Looking for a job change"`).*
