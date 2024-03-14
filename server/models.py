from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship
from config import db
from datetime import datetime

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    # Relationship with ScoreCards
    scorecards = relationship("ScoreCard", back_populates="user")

    # Relationship with PastRounds
    past_rounds = relationship("PastRound", back_populates="user")

    # Serialize Rules
    serialize_rules = ('-scorecards.user', '-past_rounds.user',)

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

    # Foreign Key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationship with User
    user = relationship("User", back_populates="past_rounds")

    # Serialize Rules
    serialize_rules = ('-user.past_rounds',)
