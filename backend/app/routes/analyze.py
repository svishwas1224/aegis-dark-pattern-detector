from flask import Blueprint, request, jsonify
from bs4 import BeautifulSoup
import requests
from config import db

analyze_bp = Blueprint("analyze", __name__)

@analyze_bp.route("/page", methods=["POST"])
def analyze_page():
    data = request.json
    url = data.get("url")
    html = requests.get(url).text
    soup = BeautifulSoup(html, "html.parser")

    patterns = []
    for checkbox in soup.find_all("input", {"type": "checkbox"}):
        if checkbox.has_attr("checked"):
            patterns.append({
                "pattern": "Pre-checked checkbox",
                "severity": "Medium",
                "element": str(checkbox)
            })

    if patterns:
        db.patterns.insert_many(patterns)

    return jsonify({"url": url, "patterns": patterns})