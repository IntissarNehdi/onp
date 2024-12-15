from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/login": {
        "origins": ["http://localhost:3000",],
        "methods": ["POST", "GET", "OPTIONS"]
    }
})
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    if username == 'admin' and password == 'admin':
        return jsonify({'success': True, 'message': "lhaj how hada"})
    else:
        return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)