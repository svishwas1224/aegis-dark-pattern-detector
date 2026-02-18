import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib

data = {
    "text": [
        "Hurry only 1 left in stock",
        "Limited time offer",
        "Auto renewal applies",
        "Secure payment gateway",
        "Free cancellation anytime"
    ],
    "label": [1, 1, 1, 0, 0]
}

df = pd.DataFrame(data)

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["text"])

model = LogisticRegression()
model.fit(X, df["label"])

joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("Model trained and saved successfully!")
