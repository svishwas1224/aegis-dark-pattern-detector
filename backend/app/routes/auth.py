from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from config import db
import datetime

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data["username"]
    password = generate_password_hash(data["password"])
    db.users.insert_one({"username": username, "password": password, "role": "client"})
    return jsonify({"message": "User registered successfully"})

@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Verify user from MongoDB (already working in your code)
    user = db.users.find_one({"username": username})
    if not user or not verify_password(password, user["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    # Create JWT payload
    token = jwt.encode({
        "username": user["username"],
        "role": user["role"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({"message": "Login successful", "token": token, "role": user["role"]})
