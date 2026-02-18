from functools import wraps
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
import jwt
import datetime
from flask_cors import CORS
from ml_detector import predict_text

app = Flask(__name__)
CORS(app)

# ---------------- SECRET KEY ----------------
SECRET_KEY = "a3f9c2d8b7e4f1a9c0d3e2f7b8a9d4e1f2c3b4a5d6e7f8a9b0c1d2e3f4a5b6c7"

# ---------------- DATABASE CONNECTION ----------------
client = MongoClient("mongodb+srv://caniwait2005_db_user:Test12345@cluster0.gg4a0pz.mongodb.net/?appName=Cluster0")
db = client["projectdb"]
users_collection = db["users"]
analysis_collection = db["analysis"]

# ---------------- AUTH ROUTES ----------------

@app.route("/auth/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    raw_password = data.get("password")
    role = data.get("role", "client")

    if not username or not raw_password:
        return jsonify({"message": "Username and password required"}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(raw_password)

    users_collection.insert_one({
        "username": username,
        "password": hashed_password,
        "role": role
    })

    return jsonify({"message": "User registered successfully"})


@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({"username": username})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode({
        "username": user["username"],
        "role": user["role"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm="HS256")

    if isinstance(token, bytes):
        token = token.decode("utf-8")

    return jsonify({
        "message": "Login successful",
        "token": token,
        "role": user["role"]
    })

# ---------------- TOKEN DECORATOR ----------------

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]

        if not token:
            return jsonify({"message": "Token is missing"}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = data
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Token is invalid"}), 401

        return f(current_user, *args, **kwargs)

    return decorated

# ---------------- ADMIN ROUTE ----------------

@app.route("/admin/overview", methods=["GET"])
@token_required
def admin_overview(current_user):
    if current_user["role"] != "admin":
        return jsonify({"message": "Access denied"}), 403

    return jsonify({
        "message": "Welcome Admin!",
        "data": "Sensitive overview data"
    })

# ---------------- CLIENT DASHBOARD ----------------

@app.route("/client/dashboard", methods=["GET"])
@token_required
def client_dashboard(current_user):
    if current_user["role"] != "client":
        return jsonify({"message": "Access denied"}), 403

    user = users_collection.find_one(
        {"username": current_user["username"]},
        {"_id": 0, "password": 0}
    )

    return jsonify({
        "message": "Welcome Client!",
        "profile": user
    })

# ---------------- ML ANALYSIS ROUTE ----------------

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text")

    if not text:
        return jsonify({"message": "Text is required"}), 400

    result = predict_text(text)

    # Save to MongoDB
    analysis_collection.insert_one({
        "text": text,
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "timestamp": datetime.datetime.utcnow()
    })

    return jsonify(result)

# ---------------- RUN APP ----------------

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0", port=5000)
