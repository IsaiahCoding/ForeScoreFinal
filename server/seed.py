#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Club, ClubDistance, ClubDistanceJoin, Scorecard, HoleStat

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Seed Users
        for _ in range(10):
            user = User(
                name=fake.name(),
                username=fake.user_name(),
                email=fake.email(),
                average_score=randint(50, 100)
            )
            db.session.add(user)

        # Seed Clubs
        for _ in range(5):
            club = Club(
                name=fake.company(),
                brand=fake.company_suffix()
            )
            db.session.add(club)

        # Seed Club Distances
        for _ in range(5):
            distance = ClubDistance(
                regular_distance=randint(150, 300),
                max_distance=randint(300, 500),
                min_distance=randint(50, 200)
            )
            db.session.add(distance)

        # Seed Club Distance Joins
        users = User.query.all()
        clubs = Club.query.all()
        distances = ClubDistance.query.all()
        for user in users:
            for club in clubs:
                for distance in distances:
                    join = ClubDistanceJoin(
                        user=user,
                        club=club,
                        club_distance=distance
                    )
                    db.session.add(join)

        # Seed Scorecards and Hole Stats (assuming each user has at least one scorecard)
        for user in users:
            for _ in range(randint(1, 5)):  # Each user has 1-5 scorecards
                scorecard = Scorecard(
                    date=fake.date_this_year(),
                    course_name=fake.word(),
                    total_course_par=randint(50, 100),
                    total_user_score=randint(40, 120),
                    current_round=fake.boolean(),
                    user=user
                )
                db.session.add(scorecard)

                for _ in range(18):  # Assuming 18-hole courses
                    hole_stat = HoleStat(
                        hole_number=_ + 1,
                        par=randint(3, 5),
                        user_score=randint(3, 8),
                        fairway_hit=fake.boolean(),
                        green_in_reg=fake.boolean(),
                        putts=randint(1, 4),
                        scorecard=scorecard
                    )
                    db.session.add(hole_stat)

        # Commit changes to the database
        db.session.commit()

        print("Seed complete!")
