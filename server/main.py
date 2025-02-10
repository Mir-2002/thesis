from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_cors import CORS
import os
import ast

load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv("MONGO_URI"))

db = client.thesis

def parse_python_file(file_content):
    tree = ast.parse(file_content)
    parsed_data = []

    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.ClassDef)):
            docstring = ast.get_docstring(node)
            parsed_data.append({
                "type" : "function" if isinstance(node, ast.FunctionDef) else "class",
                "name" : node.name,
                "docstring" : docstring if docstring else ""
            })

    return parsed_data

@app.route("/api/files", methods=['POST'])
def upload_single_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    try:
        file_content = file.read().decode("utf-8")
        parsed_data = parse_python_file(file_content)
        db.parsed_files.insert_one({
            "filename": file.filename,
            "parsed_data": parsed_data
        })
        return jsonify({"message" : "File processed and metadata stored succesfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/users", methods=['POST'])
def add_user():
    data = request.json
    if not data or 'username' not in data or 'email' not in data:
        return jsonify({"error": "Invalid data"}), 400
    
    username = data['username']
    email = data['email']

    try:
        db.users.insert_one({
            "username" : username,
            "email" : email
        })
        return jsonify({"message": "User added succesfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/users/<id>", methods=['GET'])
def get_user(id):
    try:
        user = db.users.find_one({"_id": id})
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify(user), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/check_db_connection", methods=['GET'])
def check_db_connection():
    try:
        # Perform a simple operation to check the connection
        client.admin.command('ping')
        return jsonify({"message": "Connected to MongoDB"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True)
    