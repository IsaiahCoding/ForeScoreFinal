from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship, validates
from config import db, bcrypt
from datetime import datetime

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True)
    _password_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    # Relationship with ScoreCards
    scorecards = relationship("ScoreCard", back_populates="user", cascade="all, delete")

    # Relationship with PastRounds
    past_rounds = relationship("PastRound", back_populates="user", cascade="all, delete")

    # Relationship with ClubDistanceJoin
    club_distance_joins = relationship("ClubDistanceJoin", back_populates="user")

    # Serialize Rules
    serialize_rules = ('-scorecards.user', '-past_rounds.user', '-club_distance_joins.user', '-_password_hash')
    #Validate rules:
    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validate_username(self, key, value):
        if not value or not 3 <= len(value) <=20:
            raise ValueError('Username must be between 3 and 20 characters')
        return value
    
    
    
    








class ScoreCard(db.Model, SerializerMixin):
    __tablename__ = "scorecards"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(8), nullable=False)
    course = db.Column(db.String, nullable=False)
    par = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer, nullable=False)
    fairway_hit = db.Column(db.String, nullable=False)
    green_in_regulation = db.Column(db.String, nullable=False)
    putts = db.Column(db.Integer, nullable=False)
    total_score = db.Column(db.Integer, nullable=False)

    # Foreign Key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationship with User
    user = relationship("User", back_populates="scorecards")

    # Serialize Rules
    serialize_rules = ('-user.scorecards',)

class PastRound(db.Model, SerializerMixin):
    __tablename__ = "past_rounds"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(8), nullable=False)
    course = db.Column(db.String, nullable=False)
    par = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer, nullable=False)
    fairway_hit = db.Column(db.String, nullable=False)
    green_in_regulation = db.Column(db.String, nullable=False)
    putts = db.Column(db.Integer, nullable=False)
    total_score = db.Column(db.Integer, nullable=False)
    average_score = db.Column(db.Integer, nullable=False, default=0)


    # Foreign Key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationship with User
    user = relationship("User", back_populates="past_rounds")

    # Serialize Rules
    serialize_rules = ('-user.past_rounds',)
    
class Club(db.Model, SerializerMixin):
    __tablename__ = "clubs"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    # Foreign Key:

    # Relationship:
    club_distance_joins = relationship("ClubDistanceJoin", back_populates="club", cascade='all, delete-orphan')

    # Serialize Rules:
    serialize_rules = ('-club.club_distance_joins',)


class ClubDistance(db.Model, SerializerMixin):
    __tablename__ = "club_distances"
    id = db.Column(db.Integer, primary_key=True)
    regular_distance = db.Column(db.Integer, nullable=False)
    max_distance = db.Column(db.Integer, nullable=False)
    min_distance = db.Column(db.Integer, nullable=False)

    # Foreign Key:

    # Relationship:
    club_distance_joins = relationship("ClubDistanceJoin", back_populates="club_distance", cascade='all, delete-orphan')

    # Serialize Rules:
    serialize_rules = ('-club.club_distance_joins',)


class ClubDistanceJoin(db.Model, SerializerMixin):
    __tablename__ = "club_distance_joins"
    id = db.Column(db.Integer, primary_key=True)
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)
    club_distance_id = db.Column(db.Integer, db.ForeignKey('club_distances.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationship:
    club = relationship("Club", back_populates="club_distance_joins")
    club_distance = relationship("ClubDistance", back_populates="club_distance_joins")
    user = relationship("User", back_populates="club_distance_joins")

    # Serialize Rules:
    serialize_rules = ('-club.club_distance_joins', '-club_distance.club_distance_joins', '-user.club_distance_joins',)