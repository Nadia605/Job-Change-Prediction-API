# ==============================================================================
# Step 1: Save ML Objects for FastAPI Backend
# ==============================================================================
# Instructions:
# 1. Run your notebook up to the final KNN model training cell.
# 2. Add and execute this cell in your notebook or Colab environment.
# 3. It will export the 3 required artifacts directly into the backend/ folder:
#    - backend/model.pkl
#    - backend/encoder.pkl
#    - backend/scaler.pkl
# ==============================================================================

import os
import joblib

# Ensure the backend directory exists
os.makedirs("backend", exist_ok=True)

# 1. Final trained KNN model (n_neighbors=23, weights='uniform')
joblib.dump(model, "backend/model.pkl")

# 2. Fitted OneHotEncoder for the 10 categorical features
joblib.dump(encoder, "backend/encoder.pkl")

# 3. Fitted StandardScaler for the encoded + numerical feature space
joblib.dump(scaler, "backend/scaler.pkl")

print("Saved ML objects successfully into backend/:")
print("✓ backend/model.pkl")
print("✓ backend/encoder.pkl")
print("✓ backend/scaler.pkl")
