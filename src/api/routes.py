"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Sport_center, Court, Court_schedule, Contact
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
    return jsonify({"message": "User created"}), 201

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

@api.route("/user", methods=["GET"])
def get_users():
    all_users = User.query.all()      
    serialized_users = [user.serialize() for user in all_users]
    return jsonify(serialized_users), 200
    ## SI tenemos tiempo, verificar existencia del TOKEN

@api.route("/user/<int:id>", methods=["PUT"])
def put_user(id):
    if id is None: 
        return jsonify({
            "message": "id is required"
        }), 400
    user = User.query.get(id)
    if user is None:
       return jsonify({
                "message": "User not found"
            }), 404
    # return jsonify(center.serialize()), 200
    new_data = request.json
    user.user_type = new_data.get("user_type", None)
    db.session.commit()   
    return jsonify({
            "message": "User updated successfully"
        }), 200

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
        "token" : create_access_token(identity=user_data.id),
        "user_type" : user_data.user_type,
        "user_id" : user_data.id
    }), 201

## SPORT_CENTER ENDPOINTS

@api.route("/sport_center", methods=["POST"])
##@jwt_required()
def create_sport_center():
    body = request.json
    name = body.get("name", None)
    address = body.get("address", None)
    phone_number = body.get("phone_number", None)
    user_id = body.get("user_id", None)
    ##user_identity = get_jwt_identity()
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

@api.route("/sport_center", methods=["GET"])
def get_centers():
    all_centers = Sport_center.query.all()      
    serialized_centers = [center.serialize() for center in all_centers]
    return jsonify(serialized_centers), 200
    ## SI tenemos tiempo, verificar existencia del TOKEN


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

@api.route("/sport_center/<int:id>", methods=["PUT"])
def put_center(id):
    if id is None: 
        return jsonify({
            "message": "id is required"
        }), 400
    center = Sport_center.query.get(id)
    if center is None:
       return jsonify({
                "message": "Sport center not found"
            }), 404
    # return jsonify(center.serialize()), 200
    new_data = request.json
    center.name = new_data.get('name', center.name)
    center.address = new_data.get('address', center.address)
    center.phone_number = new_data.get('phone_number', center.phone_number)
    center.user_id = new_data.get('user_id', center.user_id)
    center.url_img = new_data.get('url_img', center.url_img)
    db.session.commit()   
    return jsonify({
            "message": "Sport center updated successfully"
        }), 200
 
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

## COURT ENDPOINTS

@api.route("/court", methods=["POST"])
##@jwt_required()
def create_court():
    body = request.json
    name = body.get("name", None)
    sport = body.get("sport", None)
    sport_center_id = body.get("sport_center_id", None)
    if name is None or sport is None or sport_center_id is None:
        return jsonify({
            "message": "Something is missing"
        }), 400
    court_exist = Court.query.filter_by(name=name).one_or_none()
    if court_exist is not None:
        return jsonify({
            "message": "Court already exists"
        }), 400
    court = Court(
        name = name,
        sport = sport,
        sport_center_id = sport_center_id
        )
    try:
        db.session.add(court)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": error.args
        }), 500
    return jsonify({}), 201

@api.route("/court/", methods=["GET"])
def get_courts():
    all_courts = Court.query.all()      
    serialized_court = [court.serialize() for court in all_courts]
    return jsonify(serialized_court), 200
    ## SI tenemos tiempo, verificar existencia del TOKEN

@api.route("/court/<int:id>", methods=["GET"])
def get_court(id):
    if id is None: 
        return jsonify({
            "message": "id is required"
        }), 400
    court = Court.query.get(id)
    if court is None:
        return jsonify(""), 404
    return jsonify(court.serialize()), 200

@api.route("/court/<int:id>", methods=["PUT"])
def put_court(id):
    if id is None: 
        return jsonify({
            "message": "id is required"
        }), 400
    court = Court.query.get(id)
    if court is None:
        return jsonify({
                "message": "Sport center not found"
            })
    # return jsonify(center.serialize()), 200
    new_data = request.json
    court.name = new_data.get('name', court.name)
    court.sport = new_data.get('sport', court.sport)
    court.sport_center_id = new_data.get('sport_center_id', court.sport_center_id)
    db.session.commit()   
    return jsonify({
            "message": "Sport center updated successfully"
        }), 200

@api.route("/court/<int:id>", methods=["DELETE"])
def delete_court(id):
    court = Court.query.get(id)
    if court is None:
        return jsonify({
            "message": "center does not exist"
        }), 400
    court = Court.query.filter_by(id = Court.id).first()
    try:
        db.session.delete(court)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": error.args
        }), 500
    return jsonify({}), 201

## COURT_SCHEDULE ENDPOINTS

@api.route("/court_schedule", methods=["POST"])
##@jwt_required()
def create_schedule():
    body = request.json
    court_id = body.get("court_id", None)
    start_date = body.get("start_date", None)
    end_date = body.get("end_date", None)
    status = body.get("status", None)
    user_id = body.get("user_id", None)
    if court_id is None or start_date is None or end_date is None or status is None:
        return jsonify({
            "message": "Something is missing"
        }), 400
    schedule = Court_schedule(
        court_id = court_id,
        start_date = start_date,
        end_date = end_date,
        status = status,
        user_id = user_id
        )
    try:
        db.session.add(schedule)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": error.args
        }), 500
    return jsonify({}), 201

@api.route("/court_schedule/", methods=["GET"])
def get_schedules():
    all_schedules = Court_schedule.query.all()      
    serialized_schedule = [schedule.serialize() for schedule in all_schedules]
    return jsonify(serialized_schedule), 200
    ## SI tenemos tiempo, verificar existencia del TOKEN

@api.route("/court_schedule/<int:id>", methods=["GET"])
def get_schedule(id):
    if id is None: 
        return jsonify({
            "message": "id is required"
        }), 400
    court = Court_schedule.query.get(id)
    if court is None:
        return jsonify(""), 404
    return jsonify(court.serialize()), 200

@api.route("/court_schedule/<int:id>", methods=["PUT"])
def put_schedule(id):
    if id is None: 
        return jsonify({
            "message": "id is required"
        }), 400
    schedule = Court_schedule.query.get(id)
    if schedule is None:
        return jsonify({
                "message": "Schedule not found"
            })
    # return jsonify(center.serialize()), 200
    new_data = request.json
    schedule.court_id = new_data.get('court_id', schedule.court_id)
    schedule.start_date = new_data.get('start_date', schedule.start_date)
    schedule.end_date = new_data.get('end_date', schedule.end_date)
    db.session.commit()   
    return jsonify({
            "message": "Schedule updated successfully"
        }), 200

@api.route("/court_schedule/<int:id>", methods=["DELETE"])
def delete_schedule(id):
    schedule = Court_schedule.query.get(id)
    if schedule is None:
        return jsonify({
            "message": "schedule does not exist"
        }), 400
    try:
        db.session.delete(schedule)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": error.args
        }), 500
    return jsonify({}), 201

##CONTACT ENDPOINTS

@api.route("/contact", methods=["POST"])
##@jwt_required()
def create_contact():
    body = request.json
    name = body.get("name", None)
    email = body.get("email", None)
    subject = body.get("subject", None)
    message = body.get("message", None)
    if name is None or email is None or subject is None or message is None:
        return jsonify({
            "message": "Something is missing"
        }), 400
    contact = Contact(
        name = name,
        email = email,
        subject = subject,
        message = message
        )
    try:
        db.session.add(contact)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "internal error",
            "error": error.args
        }), 500
    return jsonify({}), 201