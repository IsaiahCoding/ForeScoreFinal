#!/usr/bin/env python3
# Standard library imports
from datetime import datetime

# Local imports
from app import app
from models import db, User, ScoreCard, PastRound

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        
        # Clear existing data
        db.drop_all()
        db.create_all()

        print('Seeding User...')
        user = User(
            username='sample_user',
            email='user@example.com',
            password_hash='hashed_password',
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(user)
        db.session.commit()

        print('Seeding ScoreCard...')
        # Example scorecards data
        scorecards_data = [
    {"date": '2022-03-01', "course": 'Sample Course 1', "par": 72, "score": 70, "fairway_hit": 'Yes', "green_in_regulation": 'Yes', "putts": 28, "total_score": 98},
    {"date": '2022-03-02', "course": 'Sample Course 2', "par": 72, "score": 75, "fairway_hit": 'Yes', "green_in_regulation": 'Yes', "putts": 30, "total_score": 105},
    {"date": '2022-03-03', "course": 'Sample Course 3', "par": 72, "score": 80, "fairway_hit": 'Yes', "green_in_regulation": 'No', "putts": 32, "total_score": 112},
    {"date": '2022-03-04', "course": 'Sample Course 4', "par": 72, "score": 68, "fairway_hit": 'Yes', "green_in_regulation": 'Yes', "putts": 27, "total_score": 95},
    {"date": '2022-03-05', "course": 'Sample Course 5', "par": 72, "score": 74, "fairway_hit": 'Yes', "green_in_regulation": 'Yes', "putts": 29, "total_score": 103}
]

        for scorecard_data in scorecards_data:
            scorecard = ScoreCard(user=user, **scorecard_data)
            db.session.add(scorecard)

        db.session.commit()

        print('Seeding PastRound...')
        # Example past rounds data
        past_rounds_data = [
    {"date": '2022-01-01', "course": 'Pinecrest Meadows Golf Club', "par": 72, "score": 70, "fairway_hit": 'Yes', "green_in_regulation": 'Yes', "putts": 28, "total_score": 70},
    {"date": '2022-01-15', "course": 'Sunset Pines Golf Resort', "par": 71, "score": 75, "fairway_hit": 'No', "green_in_regulation": 'Yes', "putts": 30, "total_score": 75},
    {"date": '2022-02-01', "course": 'Azure Valley Country Club', "par": 70, "score": 68, "fairway_hit": 'Yes', "green_in_regulation": 'Yes', "putts": 27, "total_score": 68},
    {"date": '2022-02-15', "course": 'Rolling Hills Golf Links', "par": 73, "score": 72, "fairway_hit": 'Yes', "green_in_regulation": 'No', "putts": 31, "total_score": 72},
    {"date": '2022-03-01', "course": 'Golden Lakes Golf Retreat', "par": 72, "score": 69, "fairway_hit": 'Yes', "green_in_regulation": 'Yes', "putts": 29, "total_score": 69}
]

        for past_round_data in past_rounds_data:
            past_round = PastRound(user=user, **past_round_data)
            db.session.add(past_round)

        db.session.commit()

        print("Seeding Complete!")
        print("Exiting seed...")