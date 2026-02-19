import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "model.pkl")

model = joblib.load(model_path)

def predict_text(text):
    prediction = model.predict([text])[0]

    # If model supports probability
    if hasattr(model, "predict_proba"):
        confidence = max(model.predict_proba([text])[0])
    else:
        confidence = None

    return {
        "prediction": str(prediction),
        "confidence": float(confidence) if confidence else None
    }
