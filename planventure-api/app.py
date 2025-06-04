from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()


def create_app():
    app = Flask(__name__)

    # Update CORS configuration
    CORS(app, resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173"
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True,
            "max_age": 120  # Cache preflight requests for 2 minutes
        }
    })

    # Register routes
    @app.route('/')
    def home():
        return jsonify({"message": "Welcome to PlanVenture API"})

    # Add health check endpoint
    @app.route('/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.now().isoformat()
        })

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
