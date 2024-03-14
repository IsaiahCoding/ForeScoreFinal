#!/usr/bin/env python3
# Standard library imports
from datetime import datetime

# Local imports
from app import app
from models import db, User, ScoreCard, PastRound, Club, ClubDistance, ClubDistanceJoin

def seed_data():
    print('Seeding User...')
    # Create a user
    user1 = User(username='user1', email='user1@example.com', password_hash='password1')

    # Create 5 scorecards for user1
    scorecard1 = ScoreCard(date='2024-03-14', course='Golf Course 1', par=72, score=78, fairway_hit='Yes', green_in_regulation='Yes', putts=30, total_score=78, user=user1)
    scorecard2 = ScoreCard(date='2024-03-15', course='Golf Course 2', par=70, score=75, fairway_hit='Yes', green_in_regulation='Yes', putts=28, total_score=75, user=user1)
    scorecard3 = ScoreCard(date='2024-03-16', course='Golf Course 3', par=71, score=80, fairway_hit='Yes', green_in_regulation='Yes', putts=32, total_score=80, user=user1)
    scorecard4 = ScoreCard(date='2024-03-17', course='Golf Course 4', par=73, score=77, fairway_hit='Yes', green_in_regulation='Yes', putts=29, total_score=77, user=user1)
    scorecard5 = ScoreCard(date='2024-03-18', course='Golf Course 5', par=70, score=72, fairway_hit='Yes', green_in_regulation='Yes', putts=28, total_score=72, user=user1)

    # Create 5 past rounds for user1
    past_round1 = PastRound(date='2024-03-10', course='Old Golf Course A', par=72, score=80, fairway_hit='Yes', green_in_regulation='No', putts=32, total_score=80, user=user1)
    past_round2 = PastRound(date='2024-03-11', course='Old Golf Course B', par=70, score=77, fairway_hit='Yes', green_in_regulation='Yes', putts=29, total_score=77, user=user1)
    past_round3 = PastRound(date='2024-03-12', course='Old Golf Course C', par=71, score=81, fairway_hit='Yes', green_in_regulation='Yes', putts=33, total_score=81, user=user1)
    past_round4 = PastRound(date='2024-03-13', course='Old Golf Course D', par=73, score=78, fairway_hit='Yes', green_in_regulation='Yes', putts=30, total_score=78, user=user1)
    past_round5 = PastRound(date='2024-03-14', course='Old Golf Course E', par=70, score=75, fairway_hit='Yes', green_in_regulation='Yes', putts=28, total_score=75, user=user1)

    # Create 5 clubs
    club1 = Club(name='Driver')
    club2 = Club(name='Putter')
    club3 = Club(name='Iron')
    club4 = Club(name='Wedge')
    club5 = Club(name='Hybrid')

    # Create 5 club distances
    club_distance1 = ClubDistance(regular_distance=250, max_distance=300, min_distance=200)
    club_distance2 = ClubDistance(regular_distance=50, max_distance=100, min_distance=0)
    club_distance3 = ClubDistance(regular_distance=150, max_distance=200, min_distance=100)
    club_distance4 = ClubDistance(regular_distance=100, max_distance=150, min_distance=50)
    club_distance5 = ClubDistance(regular_distance=200, max_distance=250, min_distance=150)

    # Create 5 club distance joins for user1
    club_distance_join1 = ClubDistanceJoin(club=club1, club_distance=club_distance1, user=user1)
    club_distance_join2 = ClubDistanceJoin(club=club2, club_distance=club_distance2, user=user1)
    club_distance_join3 = ClubDistanceJoin(club=club3, club_distance=club_distance3, user=user1)
    club_distance_join4 = ClubDistanceJoin(club=club4, club_distance=club_distance4, user=user1)
    club_distance_join5 = ClubDistanceJoin(club=club5, club_distance=club_distance5, user=user1)

    # Add data to session
    db.session.add_all([
        user1,
        scorecard1, scorecard2, scorecard3, scorecard4, scorecard5,
        past_round1, past_round2, past_round3, past_round4, past_round5,
        club1, club2, club3, club4, club5,
        club_distance1, club_distance2, club_distance3, club_distance4, club_distance5,
        club_distance_join1, club_distance_join2, club_distance_join3, club_distance_join4, club_distance_join5
    ])

    # Commit changes
    db.session.commit()
    print("Seed completed successfully.")

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Call seed_data function
        seed_data()
