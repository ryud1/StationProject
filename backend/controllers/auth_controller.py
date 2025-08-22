from models.user import User
from database import db
from flask_jwt_extended import create_access_token

class AuthController:
    @staticmethod
    def register(email, password):
        if User.query.filter_by(email=email).first():
            return {"message": "Email já cadastrado"}, 400

        user = User(email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return {"message": "Usuário criado com sucesso!"}, 201

    @staticmethod
    def login(email, password):
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return {"message": "Email ou senha incorretos"}, 401

        token = create_access_token(identity=user.id)
        return {"token": token}, 200
