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

    # Relationship with ClubDistanceJoin
    club_distance_joins = relationship("ClubDistanceJoin", back_populates="user")

    # Serialize Rules
    serialize_rules = ('-scorecards.user', '-past_rounds.user', '-club_distance_joins.user',)

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
    
class Club(db.Model, SerializerMixin):
    __tablename__ = "clubs"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    # Foreign Key:

    # Relationship:
    club_distance_joins = relationship("ClubDistanceJoin", back_populates="club")

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
    club_distance_joins = relationship("ClubDistanceJoin", back_populates="club_distance")

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