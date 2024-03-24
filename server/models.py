#Remote library imports
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from email_validator import validate_email, EmailNotValidError

#Local imports
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    average_score = db.Column(db.Integer)
    # Relationships:
    scorecards = db.relationship('Scorecard', back_populates='user')
    club_distances = db.relationship('ClubDistanceJoin', back_populates='user')
    
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
    
    # @validates('email')
    # def validate_email(self, key, value):
    #     try:
    #         validate_email(value)
    #     except EmailNotValidError as e:
    #         raise ValueError(str(e))
    #     return(value)
    
    serialize_rules = ('-password_hash', '-scorecards.user', '-club_distances.user')
        
    
    
    

class Club(db.Model, SerializerMixin):
    __tablename__ = 'clubs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    brand = db.Column(db.String)
    # Relationships:
    club_distances = db.relationship('ClubDistanceJoin', back_populates='club')
    
    serialize_rules = ('-club_distances.club',)

class ClubDistance(db.Model, SerializerMixin):
    __tablename__ = 'club_distances'
    id = db.Column(db.Integer, primary_key=True)
    regular_distance = db.Column(db.Integer)
    max_distance = db.Column(db.Integer)
    min_distance = db.Column(db.Integer)
    # Relationships:
    club_distances = db.relationship('ClubDistanceJoin', back_populates='club_distance')
    
    serialize_rules = ('-club_distances.club_distance','-club_distances.club', '-club_distances.user.scorecards', '-club_distances.user')


class ClubDistanceJoin(db.Model, SerializerMixin):
    __tablename__ = 'club_distance_join'
    id = db.Column(db.Integer, primary_key=True)
    # Foreign Keys:
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'))
    club_distance_id = db.Column(db.Integer, db.ForeignKey('club_distances.id'))
    # Relationships:
    user = db.relationship('User', back_populates='club_distances')
    club = db.relationship('Club', back_populates='club_distances')
    club_distance = db.relationship('ClubDistance', back_populates='club_distances')
    
    serialize_rules = ('-user.club_distances', '-club.club_distances', '-club_distance.club_distances')

class Scorecard(db.Model, SerializerMixin):
    __tablename__ = 'scorecards'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    course_name = db.Column(db.String)
    total_course_par = db.Column(db.Integer)
    total_user_score = db.Column(db.Integer)
    current_round = db.Column(db.Boolean)
    # Foreign Key:
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # Relationships:
    user = db.relationship('User', back_populates='scorecards')
    hole_stats = db.relationship('HoleStat', back_populates='scorecard')
    
    serialize_rules = ('-user.scorecards', '-hole_stats.scorecard')

class HoleStat(db.Model, SerializerMixin):
    __tablename__ = 'hole_stats'
    id = db.Column(db.Integer, primary_key=True)
    hole_number = db.Column(db.Integer)
    par = db.Column(db.Integer)
    user_score = db.Column(db.Integer)
    fairway_hit = db.Column(db.Boolean)
    green_in_reg = db.Column(db.Boolean)
    putts = db.Column(db.Integer)
    # Foreign Key:
    scorecard_id = db.Column(db.Integer, db.ForeignKey('scorecards.id'))
    # Relationships:
    scorecard = db.relationship('Scorecard', back_populates='hole_stats')
    
    serialize_rules = ('-scorecard.hole_stats',)
