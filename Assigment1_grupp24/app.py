import json
import os
from flask import Flask, render_template, jsonify
app = Flask(__name__)   
@app.route('/')
def index():
    return render_template('index.html')  

@app.route('/get_data/<filename>')
def get_data(filename):
    file_path = os.path.join(app.static_folder, filename)
    try:
        with open(file_path, 'r', encoding="utf-8") as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404

if __name__ == '__main__':    
    app.run(debug=True)   