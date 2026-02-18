from flask import Blueprint, jsonify
from config import db

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/overview", methods=["GET"])
def overview():
    user_count = db.users.count_documents({})
    pattern_count = db.patterns.count_documents({})
    return jsonify({
        "users": user_count,
        "patterns_detected": pattern_count
    })