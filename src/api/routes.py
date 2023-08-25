"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Sport_center
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import bcrypt

api = Blueprint('api', __name__)

## USER ENDPOINTS

@api.route("/user", methods=["POST"])
def create_user():
    body = request.json
    user_name = body.get("user_name", None)
    first_name = body.get("first_name", None)
    last_name = body.get("last_name", None)
    email = body.get("email", None)
    password = request.json.get("password", None)
    user_type = body.get("user_type", None)
    if user_name is None or first_name is None or last_name is None or email is None or password is None:
        return jsonify({
            "message": "Something is missing"
        }), 400
    salt = str(bcrypt.gensalt(14))
    password_hash = generate_password_hash(password + salt)
    user_exist = User.query.filter_by(user_name=user_name).one_or_none()
    email_exist = User.query.filter_by(email=email).one_or_none()
    if user_exist is not None or email_exist is not None:
        return jsonify({
            "message": "User already exists"
        }), 400
    user = User(
        user_name = user_name,
        first_name = first_name,
        last_name = last_name,
        email = email, 
        password = password_hash,
        salt = salt,
        user_type = user_type
        )
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": error.args
        }), 500
    return jsonify({}), 201

@api.route("/user/<int:id>", methods=["GET"])
def get_user(id):
    if id is None: 
        return jsonify({
            "message": "id is required"
        }), 400
    user = User.query.get(id)
    if user is None:
         return jsonify(""), 404
    return jsonify(user.serialize()), 200

@api.route("/user/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({
            "message": "user does not exist"
        }), 400
    user = user.query.filter_by(id = user.id).first()
    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": error.args
        }), 500
    return jsonify({}), 201

## LOGIN ENDPOINTS

@api.route("/login", methods=["POST"])
def login():
    body = request.json
    email = body.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        return jsonify({
            "message": "Something is missing"
        }), 400
    user_data = User.query.filter_by(email=email).one_or_none()
    if user_data is None:
        return jsonify({
            "message": "User does not exist"
        }), 400
    password_hashed = check_password_hash(pwhash=user_data.password, password=password + user_data.salt)
    print("esto es el pass: ", password)
    print("esto es el hash: ",user_data.password)
    if password_hashed is False:
        return jsonify({
            "message": "Invalid credetials"
        }), 400
    return jsonify({
        "token" : create_access_token(identity=email),
        "user_type" : user_data.user_type
    }), 201

## SPORT_CENTER ENDPOINTS

@api.route("/sport_center", methods=["POST"])
def create_sport_center():
    body = request.json
    name = body.get("name", None)
    address = body.get("address", None)
    phone_number = body.get("phone_number", None)
    user_id = body.get("user_id", None)
    url_img = body.get("url_img", None)
    if name is None or address is None or phone_number is None or user_id is None or url_img is None:
        return jsonify({
            "message": "Something is missing"
        }), 400
    center_exist = Sport_center.query.filter_by(name=name).one_or_none()
    if center_exist is not None:
        return jsonify({
            "message": "Sport Center already exists"
        }), 400
    sport_center = Sport_center(
        name = name,
        address = address,
        phone_number = phone_number,
        user_id = user_id,
        url_img = url_img
        )
    try:
        db.session.add(sport_center)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": error.args
        }), 500
    return jsonify({}), 201

@api.route("/sport_center/<int:id>", methods=["GET"])
def get_center(id):
    if id is None: 
        return jsonify({
            "message": "id is required"
        }), 400
    center = Sport_center.query.get(id)
    if center is None:
         return jsonify(""), 404
    return jsonify(center.serialize()), 200

@api.route("/sport_center/<int:id>", methods=["DELETE"])
def delete_sport_center(id):
    center = Sport_center.query.get(id)
    if center is None:
        return jsonify({
            "message": "center does not exist"
        }), 400
    center = Sport_center.query.filter_by(id = Sport_center.id).first()
    try:
        db.session.delete(center)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": error.args
        }), 500
    return jsonify({}), 201



