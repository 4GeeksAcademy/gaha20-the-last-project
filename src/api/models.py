from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    salt = db.Column(db.String(120), unique=True, nullable=False)
    user_type = db.Column(db.String(20), unique=False, nullable=False)
    sport_center = db.relationship('Sport_center', back_populates='user')

    def __repr__(self):
        return f'<User {self.user_name}>'

    def serialize(self):
        sport_center = [center.serialize() for center in self.sport_center]
        return {
            "id": self.id,
            "user_name": self.user_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "user_type": self.user_type,
            "sport_center": sport_center
            # do not serialize the password, its a security breach
        }

class Sport_center(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(800), unique=False, nullable=False)
    phone_number = db.Column(db.String(24), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='sport_center')
    court = db.relationship('Court', back_populates='sport_center')

    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "phone_number": self.phone_number,
            "user_id": self.user_id
        }


class Court(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    sport = db.Column(db.String(120), unique=False, nullable=False)
    sport_center_id = db.Column(db.Integer, db.ForeignKey('sport_center.id'))
    sport_center = db.relationship('Sport_center', back_populates='court')

    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "sport": self.sport,
            "sport_center_id": self.sport_center_id
        }


# class Court_schedule(db.Model):








