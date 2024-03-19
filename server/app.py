from flask import Flask, request, make_response, jsonify, session
from flask_restful import Resource
from datetime import datetime
 # Import your models
from config import app, db, api 
# Add your model imports
from models import *
# Views go here!

#Secret Key:
#app.secret_key = 'super secret key here!'
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
    

@app.route('/past_round', methods=['GET', 'POST'])
def past_round():
    if request.method == 'GET':
        past_rounds = PastRound.query.all()
        past_rounds_dict = [past_round.to_dict(rules=('-user',)) for past_round in past_rounds]
        response = make_response(jsonify(past_rounds_dict), 200)
    elif request.method == 'POST':
        request_body = request.get_json()
        new_past_round = PastRound(
            date=request_body['date'],
            course=request_body['course'],
            par=request_body['par'],
            score=request_body['score'],
            fairway_hit=request_body['fairway_hit'],
            green_in_regulation=request_body['green_in_regulation'],
            putts=request_body['putts'],
            total_score=request_body['total_score'],
            user_id=request_body['user_id']
        )
        db.session.add(new_past_round)
        db.session.commit()
        response = make_response(jsonify(new_past_round.to_dict(rules=('-user',))), 201)
    else:
        response = make_response(
            jsonify({"error": "Invalid request method"}),
            400
        )
    return response

@app.route('/past_round/<int:id>', methods = ['GET', 'PATCH', 'POST', 'DELETE'])
def past_round_id(id):
    past_round = PastRound.query.get(id)
    if past_round:
        if request.method == 'GET':
            response_body = jsonify(past_round.to_dict(rules = ('-user', )))
            return make_response(response_body, 200)
        elif request.method == 'PATCH':
            request_body = request.get_json()
            past_round.date = request_body['date']
            past_round.course = request_body['course']
            past_round.par = request_body['par']
            past_round.score = request_body['score']
            past_round.fairway_hit = request_body['fairway_hit']
            past_round.green_in_regulation = request_body['green_in_regulation']
            past_round.putts = request_body['putts']
            past_round.total_score = request_body['total_score']
            db.session.commit()
            response_body = jsonify(past_round.to_dict(rules = ('-user', )))
            return make_response(response_body, 200)
        elif request.method == 'DELETE':
            db.session.delete(past_round)
            db.session.commit()
            response_body = jsonify({"message": "Successfully deleted past round"})
            return make_response(response_body, 200)
        else:
            response_body = jsonify({"error": "Invalid request method"})
            return make_response(response_body, 400)
    else:
        response_body = jsonify({"error": "Past round not found"})
        return make_response(response_body, 404)

@app.route('/club', methods=['GET', 'POST'])
def club():
    if request.method == 'GET':
        clubs = Club.query.all()
        clubs_dict = [club.to_dict(rules=('-club_distance_joins.user',)) for club in clubs]
        response_body = jsonify(clubs_dict)
        return make_response(response_body, 200)
    elif request.method == 'POST':
        request_body = request.get_json()
        
        # Parse club details from the request body
        name = request_body.get('name')
        club_distance_joins_data = request_body.get('club_distance_joins', [])
        
        # Create the new Club object
        new_club = Club(name=name)
        
        # Create ClubDistanceJoin objects and associate them with the new Club
        for club_distance_join_data in club_distance_joins_data:
            # Assuming club_distance_join_data is a dictionary containing necessary data
            club_distance_join = ClubDistanceJoin(**club_distance_join_data, club=new_club)
            new_club.club_distance_joins.append(club_distance_join)
        
        # Add the new Club and ClubDistanceJoin objects to the session and commit
        db.session.add(new_club)
        db.session.commit()
        
        # Return the response with the newly created Club data
        response_body = jsonify(new_club.to_dict(rules=('-club_distance_joins',)))
        return make_response(response_body, 201)




@app.route('/club/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def club_id(id):
    club = Club.query.get(id)
    if club:
        if request.method == 'GET':
            response_body = jsonify(club.to_dict(rules=('-club_distance_joins.user',)))
            return make_response(response_body, 200)
        elif request.method == 'PATCH':
            request_body = request.get_json()
            club.name = request_body['name']
            db.session.commit()
            response_body = jsonify(club.to_dict(rules=('-club_distance_joins',)))
            return make_response(response_body, 200)
        elif request.method == 'DELETE':
            db.session.delete(club)
            db.session.commit()
            response_body = jsonify({"message": "Successfully deleted club"})
            return make_response(response_body, 200)
        else:
            response_body = jsonify({"error": "Invalid request method"})
            return make_response(response_body, 400)
    else:
        response_body = jsonify({"error": "Club not found"})
        return make_response(response_body, 404)

    


@app.route('/club_distance', methods=['GET', 'POST'])
def club_distance():
    if request.method == 'GET':
        club_distances = ClubDistance.query.all()
        club_distances_dict = [club_distance.to_dict(rules=('-club_distance_joins.user',)) for club_distance in club_distances]
        response = make_response(jsonify(club_distances_dict), 200)
    elif request.method == 'POST':
        request_body = request.get_json()
        new_club_distance = ClubDistance(
            regular_distance=request_body['regular_distance'],
            max_distance=request_body['max_distance'],
            min_distance=request_body['min_distance']
        )
        db.session.add(new_club_distance)
        db.session.commit()
        response = make_response(jsonify(new_club_distance.to_dict(rules=('-club_distance_joins',))), 201)
    else:
        response = make_response(
            jsonify({"error": "Invalid request method"}),
            400
        )

    return response


@app.route('/club_distance/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def club_distance_id(id):
    club_distance = ClubDistance.query.get(id)
    if club_distance:
        if request.method == 'GET':
            response_body = jsonify(club_distance.to_dict(rules=('-club_distance_joins.user', '-club_distance_joins.club_distance')))
            return make_response(response_body, 200)
        elif request.method == 'PATCH':
            request_body = request.get_json()
            club_distance.regular_distance = request_body['regular_distance']
            club_distance.max_distance = request_body['max_distance']
            club_distance.min_distance = request_body['min_distance']
            db.session.commit()
            response_body = jsonify(club_distance.to_dict(rules=('-club_distance_joins',)))
            return make_response(response_body, 200)
        elif request.method == 'DELETE':
            db.session.delete(club_distance)
            db.session.commit()
            response_body = jsonify({"message": "Successfully deleted club distance"})
            return make_response(response_body, 200)
        else:
            response_body = jsonify({"error": "Invalid request method"})
            return make_response(response_body, 400)
    else:
        response_body = jsonify({"error": "Club distance not found"})
        return make_response(response_body, 404)


class Users(Resource):
    
    def get(self):
        return make_response([user.to_dict(rules = ('-club_distance_joins', '-past_rounds', '-scorecards')) for user in User.query.all()], 200)        
        
api.add_resource(Users, '/users', endpoint='users')

class UsersById(Resource):

    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        return make_response(user.to_dict(), 200)
    
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            response_message = {'error': 'User not found'}
            status = 404
        else:
            request_json = request.get_json()
            try:
                for k, v in request_json.items():
                    setattr(user, k, v)
                if 'password' in request_json.keys():
                    user.password_hash = request_json['password']
                db.session.commit()
                response_message = user.to_dict()
                status = 202
            except Exception as e:
                response_message = {'error': str(e)}
                status = 422
        return make_response(response_message, status)
    
    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            response_message = {'error': 'User not found'}
            status = 404
        else:
            session['user_id'] = None
            db.session.delete(user)
            db.session.commit()
            response_message = {}
            status = 204
        return make_response(response_message, status)

api.add_resource(UsersById, '/users/<int:id>')

class CheckSession(Resource):
    
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if not user:
            return make_response({'error': "Unauthorized: you must be logged in to make that request"}, 401)
        else:
            return make_response(user.to_dict(), 200)

api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Signup(Resource):
    
    def post(self):
        json = request.get_json()
        try:
            user = User(
                username=json['username'],
            )
            user.password_hash = json['password']
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return make_response(user.to_dict(), 201)

        except Exception as e:
            return make_response({'errors': str(e)}, 422)
    
api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):

    def post(self):
        username = request.get_json()['username']

        user = User.query.filter(User.username == username).first()
        password = request.get_json()['password']

        if not user:
            response_body = {'error': 'User not found'}
            status = 404
        else:
            if user.authenticate(password):
                session['user_id'] = user.id
                response_body = user.to_dict()
                status = 200
            else:
                response_body = {'error': 'Invalid username or password'}
                status = 401
        return make_response(response_body, status)

api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    
    def delete(self):
        session['user_id'] = None
        return {}, 204
    
api.add_resource(Logout, '/logout', endpoint='logout')

    
        
    








if __name__ == '__main__':
    app.run(port=5555, debug=True)
