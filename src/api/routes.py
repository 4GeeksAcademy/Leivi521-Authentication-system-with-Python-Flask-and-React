"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


api = Blueprint('api', __name__)




# Allow CORS requests to this API
CORS(api)


@api.route('/user/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None  or password is None:
        return jsonify({"msg": "please provide password and email"}), 400
    check_user = User.query.filter_by(email = email).first()
    if check_user: 
        return jsonify({"msg": "A user already exsits"}), 409
    user = User(email = email, password = password, is_active = True)
    db.session.add(user)
    db.session.commit()
    db.session.refresh(user)

    response_body = {
        "message": "Hello! your new account has been successfuly created"
    }

    return jsonify(response_body), 201



@api.route("/user/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None  or password is None:
        return jsonify({"msg": "please provide password and email"}), 400
    user = User.query.filter_by(email = email).first()
    if user is None: 
        return jsonify({"msg": "This account does not exsits"}), 404
    if user.password != password:
        return jsonify({"msg": "The password provide does not match out records"}), 401
    

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    
    email = get_jwt_identity()
    dictionary = {

        "message": "hello world" + email
    }
    return jsonify(dictionary)