from flask import Flask, request, make_response, jsonify
from models import ScoreCard, PastRound  # Import your models
from config import app, db, api 
# Add your model imports
from models import *
# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/scorecard', methods=['GET', 'POST'])
def scorecard():
    if request.method == 'GET':
        scorecards = ScoreCard.query.all()
        scorecards_dict = [scorecard.to_dict(rules=('-user',)) for scorecard in scorecards]
        response_body = jsonify(scorecards_dict)
        return make_response(response_body, 200)
    elif request.method == 'POST':
        request_body = request.get_json()
        new_scorecard = ScoreCard(
            date = request_body['date'],
            course = request_body['course'],
            par = request_body['par'],
            score = request_body['score'],
            fairway_hit = request_body['fairway_hit'],
            green_in_regulation = request_body['green_in_regulation'],
            putts = request_body['putts'],
            total_score = request_body['total_score'],
            user_id = request_body['user_id']
        )
        db.session.add(new_scorecard)
        db.session.commit()
        response_body = jsonify(new_scorecard.to_dict(rules=('-user',)))
        return make_response(response_body, 201)
    else:
        response_body = jsonify({"error": "Invalid request method"})
        return make_response(response_body, 400)

@app.route('/scorecard/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def scorecard_id(id):
    scorecard = ScoreCard.query.get(id)
    if scorecard:
        if request.method == 'GET':
            response_body = jsonify(scorecard.to_dict(rules=('-user',)))
            return make_response(response_body, 200)
        elif request.method == 'PATCH':
            request_body = request.get_json()
            scorecard.date = request_body['date']
            scorecard.course = request_body['course']
            scorecard.par = request_body['par']
            scorecard.score = request_body['score']
            scorecard.fairway_hit = request_body['fairway_hit']
            scorecard.green_in_regulation = request_body['green_in_regulation']
            scorecard.putts = request_body['putts']
            scorecard.total_score = request_body['total_score']
            db.session.commit()
            response_body = jsonify(scorecard.to_dict(rules=('-user',)))
            return make_response(response_body, 200)
        elif request.method == 'DELETE':
            db.session.delete(scorecard)
            db.session.commit()
            response_body = jsonify({"message": "Successfully deleted scorecard"})
            return make_response(response_body, 200)
        else:
            response_body = jsonify({"error": "Invalid request method"})
            return make_response(response_body, 400)
    else:
        response_body = jsonify({"error": "Scorecard not found"})
        return make_response(response_body, 404)
    

@app.route('/past_round', methods = ['GET'])
def past_round():
    past_rounds = PastRound.query.all()
    past_rounds_dict = [past_round.to_dict(rules = ('-user', )) for past_round in past_rounds]
    response = make_response(jsonify(past_rounds_dict), 200)
    return response

@app.route('/club', methods = ['GET'])
def club():
    clubs = Club.query.all()
    clubs_dict = [club.to_dict(rules = ('-club_distance_joins', )) for club in clubs]
    response = make_response(jsonify(clubs_dict), 200)
    return response
    


@app.route('/club_distance', methods = ['GET'])
def club_distance():
    club_distances = ClubDistance.query.all()
    club_distances_dict = [club_distance.to_dict(rules = ('-club_distance_joins', )) for club_distance in club_distances]
    response = make_response(jsonify(club_distances_dict), 200)
    return response





if __name__ == '__main__':
    app.run(port=5555, debug=True)
