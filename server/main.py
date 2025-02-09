from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv('mongodb_host'), os.getenv('mongodb_port'))

db = client.flask_database