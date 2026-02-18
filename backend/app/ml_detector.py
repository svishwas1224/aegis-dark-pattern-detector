import joblib

model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

def predict_text(text):
    vector = vectorizer.transform([text])
    prediction = model.predict(vector)[0]
    confidence = model.predict_proba(vector)[0][1]

    return {
        "prediction": "Dark Pattern" if prediction == 1 else "Safe",
        "confidence": round(confidence * 100, 2)
    }
