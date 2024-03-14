from flask import Flask, request, make_response
from models import ScoreCard, PastRound  # Import your models
from config import app, db, api 
# Add your model imports
from models import *
# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server</h1>'
#ScoreCard Route (GET/POST/PATCH)
@app.route('/scorecard', methods=['GET', 'POST', 'PATCH'])
def scorecard():
    if request.method == 'GET':
        scorecards = ScoreCard.query.all()
        if not scorecards:
            return make_response({"error": "No scorecards found"}, 404)
        scorecards_dict = [scorecard.to_dict() for scorecard in scorecards]
        scorecards_dict = [scorecard.to_dict(rules=('-user', )) for scorecard in scorecards]
        response = make_response(scorecards_dict, 200)
    elif request.method == 'POST':
        data = request.get_json()
        new_scorecard_entry = ScoreCard(
            date=data.get('date', ''),
            course=data.get('course', ''),
            par=int(data.get('par', 0)),  
            score=int(data.get('score', 0)),  
            fairway_hit=data.get('fairway_hit', ''),
            green_in_regulation=data.get('green_in_regulation', ''),
            putts=int(data.get('putts', 0)),  
            total_score=int(data.get('total_score', 0)),  
        )
        db.session.add(new_scorecard_entry)
        db.session.commit()
        response = make_response(new_scorecard_entry.to_dict(), 201)
    elif request.method == 'PATCH':
        data = request.get_json()
        scorecard_id = data.get('id', 0)
        scorecard = ScoreCard.query.get(scorecard_id)
        if not scorecard:
            return make_response({"error": "Scorecard not found"}, 404)
        scorecard.date = data.get('date', scorecard.date)
        scorecard.course = data.get('course', scorecard.course)
        scorecard.par = int(data.get('par', scorecard.par))
        scorecard.score = int(data.get('score', scorecard.score))
        scorecard.fairway_hit = data.get('fairway_hit', scorecard.fairway_hit)
        scorecard.green_in_regulation = data.get('green_in_regulation', scorecard.green_in_regulation)
        scorecard.putts = int(data.get('putts', scorecard.putts))
        scorecard.total_score = int(data.get('total_score', scorecard.total_score))
        db.session.commit()
        response = make_response(scorecard.to_dict(), 200)
    else:
        response = make_response({"error": "Invalid request method"}, 400)
    return response
#ScoreCard Routes by ID (GET/POST/PATCH/DELETE)
# ScoreCard Route by ID (GET/POST/PATCH/DELETE)
@app.route('/scorecard/<int:id>', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def scorecard_by_id(id):
    scorecard = ScoreCard.query.get(id)
    if not scorecard and request.method != 'POST':
        return make_response({"error": "Scorecard not found"}, 404)
    
    if request.method == 'GET':
        if not scorecard:
            return make_response({"error": "Scorecard not found"}, 404)
        else:
            return make_response(scorecard.to_dict(rules = ('-user', )), 200)
    
    elif request.method == 'POST':
        data = request.get_json()
        new_scorecard_entry = ScoreCard(
            id=id,
            date=data.get('date', ''),
            course=data.get('course', ''),
            par=int(data.get('par', 0)),
            score=int(data.get('score', 0)),
            fairway_hit=data.get('fairway_hit', ''),
            green_in_regulation=data.get('green_in_regulation', ''),
            putts=int(data.get('putts', 0)),
            total_score=int(data.get('total_score', 0)),
        )
        db.session.merge(new_scorecard_entry)
        db.session.commit()
        return make_response(new_scorecard_entry.to_dict(), 201)
    
    elif request.method == 'PATCH':
        if not scorecard:
            return make_response({"error": "Scorecard not found"}, 404)
        else:
            data = request.get_json()
            scorecard.date = data.get('date', scorecard.date)
            scorecard.course = data.get('course', scorecard.course)
            scorecard.par = int(data.get('par', scorecard.par)) if data.get('par') is not None else scorecard.par
            scorecard.score = int(data.get('score', scorecard.score))
            scorecard.fairway_hit = data.get('fairway_hit', scorecard.fairway_hit)
            scorecard.green_in_regulation = data.get('green_in_regulation', scorecard.green_in_regulation)
            scorecard.putts = int(data.get('putts', scorecard.putts))
            scorecard.total_score = int(data.get('total_score', scorecard.total_score))
            db.session.commit()
            return make_response(scorecard.to_dict(), 200)
    
    elif request.method == 'DELETE':
        if not scorecard:
            return make_response({"error": "Scorecard not found"}, 404)
        else:
            db.session.delete(scorecard)
            db.session.commit()
            return make_response({"message": "Scorecard deleted successfully"}, 200)
#PastRound Routes
@app.route('/past_round', methods=['GET', 'POST', 'PATCH',])
def past_round():
    if request.method == 'GET':
        past_rounds = PastRound.query.all()
        if not past_rounds:
            return make_response({"error": "No past rounds found"}, 404)
        past_rounds_dict = [past_round.to_dict() for past_round in past_rounds]
        past_rounds_dict = [past_round.to_dict(rules=('-user', )) for past_round in past_rounds]
        response = make_response(past_rounds_dict, 200)
    elif request.method == 'POST':
        data = request.get_json()
        new_past_round_entry = PastRound(
            date=data.get('date', ''),
            course=data.get('course', ''),
            par=int(data.get('par', 0)),
            score=int(data.get('score', 0)),
            fairway_hit=data.get('fairway_hit', ''),
            green_in_regulation=data.get('green_in_regulation', ''),
            putts=int(data.get('putts', 0)),
            total_score=int(data.get('total_score', 0)),
        )
        db.session.add(new_past_round_entry)
        db.session.commit()
        response = make_response(new_past_round_entry.to_dict(), 201)
    elif request.method == 'PATCH':
        data = request.get_json()
        past_round_id = data.get('id', 0)
        past_round = PastRound.query.get(past_round_id)
        if not past_round:
            return make_response({"error": "Past round not found"}, 404)
        past_round.date = data.get('date', past_round.date)
        past_round.course = data.get('course', past_round.course)
        past_round.par = int(data.get('par', past_round.par))
        past_round.score = int(data.get('score', past_round.score))
        past_round.fairway_hit = data.get('fairway_hit', past_round.fairway_hit)
        past_round.green_in_regulation = data.get('green_in_regulation', past_round.green_in_regulation)
        past_round.putts = int(data.get('putts', past_round.putts))
        past_round.total_score = int(data.get('total_score', past_round.total_score))
        db.session.commit()
        response = make_response(past_round.to_dict(), 200)
    else:
        response = make_response({"error": "Invalid request method"}, 400)
    return response
#PastRound Route[id]
@app.route('/past_round/<int:id>', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def past_round_by_id(id):
    past_round = PastRound.query.filter(PastRound.id == id).first()
    response = None
    if request.method == 'GET':
        if not past_round:
            response = make_response({"error": "Past round not found"}, 404)
        else:
            response = make_response(past_round.to_dict(), 200)
            response = make_response(past_round.to_dict(rules=('-user', )), 200)
    elif request.method == 'POST':
        data = request.get_json()
        # Handle creation of a new past round entry with the specified ID
        new_past_round_entry = PastRound(
            id=id,
            date=data.get('date', ''),
            course=data.get('course', ''),
            par=int(data.get('par', 0)),
            score=int(data.get('score', 0)),
            fairway_hit=data.get('fairway_hit', ''),
            green_in_regulation=data.get('green_in_regulation', ''),
            putts=int(data.get('putts', 0)),
            total_score=int(data.get('total_score', 0)),
        )
        db.session.merge(new_past_round_entry)
        db.session.commit()
        response = make_response(new_past_round_entry.to_dict(), 201)
    elif request.method == 'PATCH':
        if not past_round:
            response = make_response({"error": "Past round not found"}, 404)
        else:
            data = request.get_json()
            past_round.date = data.get('date', past_round.date)
            past_round.course = data.get('course', past_round.course)
            past_round.par = int(data.get('par', past_round.par)) if data.get('par') is not None else past_round.par
            past_round.score = int(data.get('score', past_round.score))
            past_round.fairway_hit = data.get('fairway_hit', past_round.fairway_hit)
            past_round.green_in_regulation = data.get('green_in_regulation', past_round.green_in_regulation)
            past_round.putts = int(data.get('putts', past_round.putts))
            past_round.total_score = int(data.get('total_score', past_round.total_score))
            db.session.commit()
            response = make_response(past_round.to_dict(), 200)
    elif request.method == 'DELETE':
        if not past_round:
            response = make_response({"error": "Past round not found"}, 404)
        else:
            db.session.delete(past_round)
            db.session.commit()
            response = make_response({"message": "Past round deleted successfully"}, 200)
    return response




if __name__ == '__main__':
    app.run(port=5555, debug=True)