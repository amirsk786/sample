from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import User, db
import traceback

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        current_app.logger.info(
            f"Login attempt for email: {data.get('email', 'No email provided')}")

        if not data or not data.get('email') or not data.get('password'):
            current_app.logger.warning(
                "Login attempt with missing credentials")
            return jsonify({'message': 'Missing email or password'}), 400

        user = User.query.filter_by(email=data['email']).first()

        if not user:
            current_app.logger.warning(
                f"Login attempt for non-existent user: {data['email']}")
            return jsonify({'message': 'Invalid email or password'}), 401

        if not check_password_hash(user.password, data['password']):
            current_app.logger.warning(
                f"Invalid password for user: {data['email']}")
            return jsonify({'message': 'Invalid email or password'}), 401

        token = create_access_token(identity=user.id)
        current_app.logger.info(f"Successful login for user: {data['email']}")

        return jsonify({
            'token': token,
            'user': {
                'id': user.id,
                'email': user.email
            }
        })

    except Exception as e:
        current_app.logger.error(
            f"Login error: {str(e)}\n{traceback.format_exc()}")
        return jsonify({'message': 'Server error occurred'}), 500


@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Missing required fields'}), 400

        if User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Email already registered'}), 409

        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            email=data['email'],
            password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=new_user.id)
        return jsonify({
            'message': 'Registration successful',
            'token': token,
            'user': {
                'id': new_user.id,
                'email': new_user.email
            }
        }), 201

    except Exception as e:
        print('Registration error:', e)  # For debugging
        db.session.rollback()
        return jsonify({'message': 'Server error occurred'}), 500
