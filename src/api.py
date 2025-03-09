import os
import sqlite3
import jwt
from datetime import datetime, timezone, timedelta
from functools import wraps
import base64

from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS


##################
#   App config   #
##################
app = Flask(__name__)
CORS(app)

# [!] We would not normally store key there, but its a sample project and database is not important
# we can regenerate key using:
# SECRET_KEY = os.urandom(24)
SECRET_KEY = b'\x86\xd9\xb5\xff\xdaO?\xd2B\xc7\xf6\xe4\x85v~\xd1\xeea\x17\xe8_kB:'

# TODO: change to basedir   
#basedir = os.path.abspath(os.path.dirname(__file__))
#DATABASE = os.path.join(basedir, 'src', 'data', 'database.db')
DATABASE = "C:\\Users\\michi\\Desktop\\pc-builder-app\\src\\data\\database.db"


##################
#    db query    #
##################
def query_db(query, args=(), one=False, commit=False):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute(query, args)
    if commit:
        conn.commit()
    rv = cur.fetchall()
    cur.close()

    conn.close()
    return (rv[0] if rv else None) if one else rv

##################
#   JWT Config   #
##################
def encode_auth_token(username):
    try:
        payload = {
            'exp': datetime.now(timezone.utc) + timedelta(days=1, seconds=0),
            'iat': datetime.now(timezone.utc),
            'sub': username
        }

        return jwt.encode(
            payload,
            SECRET_KEY,
            algorithm='HS256'
        )

    except Exception as e:
        raise Exception("[EXCEPTION WITH TOKEN]: ", e)


def authorized(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers.get('Authorization')
            parts = auth_header.split()
            if len(parts) == 2 and parts[0].lower() == 'bearer':
                token = parts[1]

        if not token:
            return jsonify({'error': 'Unauthorized'}), 401

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            username = payload['sub']
            
            # Pobierz dane użytkownika z bazy
            user = query_db('SELECT username, role FROM User WHERE username = ?', 
                          [username], one=True)
            if not user:
                return jsonify({'error': 'User not found'}), 401

            return f(user['username'], *args, **kwargs)
            
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

    return decorated

##################
#    endpoints   #
##################

# GET all categories
@app.route('/categories', methods=['GET'])
#@authorized
def get_categories(
    #current_user
    ):
    categories = query_db('SELECT * FROM Category')
    return jsonify([dict(ix) for ix in categories]), 200


# GET all components
@app.route('/components', methods=['GET'])
def get_components():
    components = query_db(
        'SELECT component_id, name, cat_name FROM Component INNER JOIN Category on Component.cat_id = Category.cat_id;')
    return jsonify([dict(ix) for ix in components]), 200


# GET specific component by id
@app.route('/component/<int:id>', methods=['GET'])
def get_component(id):
    component = query_db(
        'SELECT *, cat_name FROM Component INNER JOIN Category ON Component.cat_id = Category.cat_id WHERE component_id = ?;',
        [id], one=True)
    if component:
        return jsonify(dict(component)), 200
    else:
        return jsonify({'error': 'Nie znaleziono komponentu.'}), 404


# POST, authentication
@app.route('/login', methods=['POST'])
def login():
    user = request.json
    username = user.get('username')
    password = user.get('password')

    user_data = query_db('SELECT role FROM User WHERE username=? AND password=? LIMIT 1;',
                         (username, password), one=True)
    
    if user_data:
        auth_token = encode_auth_token(username)

        return jsonify(
            {
                "status": "success", 
                "role": user_data['role'], 
                "username": username,
                "token": auth_token
                }
        ), 200
    else:
        return jsonify({"status": "failure", "message": "Nieprawidłowa nazwa użytkownika lub hasło"}), 401


# POST, registering a user
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    name = data['name']
    surname = data['surname']
    email = data['email']
    password = data['password']

    existing_user = query_db('SELECT * FROM User WHERE username=?', (username,), one=True)
    if existing_user:
        return jsonify({'message': 'Nazwa użytkownika jest już zajęta.'}), 409

    query_db('INSERT INTO User (username, name, surname, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
                (username, name, surname, email, password, 'User'), commit=True)
    return jsonify({'message': 'Użytkownik zarejestrowany pomyślnie.'}), 201



# POST, adding a component
@app.route('/add', methods=['POST'])
@authorized
def add(current_user):
    if current_user['role'] != 'Admin':
        return jsonify({'error': 'Nie masz uprawnień do dodawania komponentów.'}), 403

    data = request.json
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    cat_id = data.get('cat_id')

    try:
        query_db('INSERT INTO Component (name, description, price, cat_id) VALUES (?, ?, ?, ?)',
                    (name, description, price, cat_id), commit=True)
        return jsonify({'message': 'Komponent został pomyślnie dodany.'}), 201
    except Exception as e:
        return jsonify({'error': 'Nie można dodać komponentu do bazy danych.'}), 500


# DELETE, removing a component
@app.route('/remove', methods=['DELETE'])
@authorized
def remove(current_user):
    if current_user['role'] != 'Admin':
        return jsonify({'error': 'Nie masz uprawnień do usuwania komponentów.'}), 403

    data = request.json
    component_id = data.get('component_id')

    component_exists = query_db('SELECT 1 FROM Component WHERE component_id = ?', [component_id], one=True)
    if not component_exists:
        return jsonify({'error': 'Komponent o podanym ID nie istnieje.'}), 404
    try:
        query_db('DELETE FROM Component WHERE component_id = ?', [component_id], commit=True)
        return jsonify({'message': 'Komponent został pomyślnie usunięty.'}), 200
    except Exception as e:
        return jsonify({'error': 'Nie można usunąć komponentu z bazy danych.'}), 500


# GET, getting user build
@app.route('/build/<username>', methods=['GET'])
@authorized
def get_user_builds(current_user, username):

    if current_user != username:
        return jsonify({'error': 'Nie masz uprawnień do wyświetlania zestawów tego użytkownika'}), 403

    try:
        # All user builds
        builds_query = '''
        SELECT b.build_id, b.Name as build_name, b.date, b.username, b.status, 
               bi.quantity, c.component_id, c.name as component_name, 
               c.description, c.price
        FROM Build b
        LEFT JOIN BuildInfo bi ON b.build_id = bi.build_id
        LEFT JOIN Component c ON bi.component_id = c.component_id
        WHERE b.username = ?
        ORDER BY b.build_id
        '''
        builds = query_db(builds_query, [username])

        # Grouping by build_id
        grouped_builds = {}
        for build in builds:
            build_id = build['build_id']
            # Initiating new build
            if build_id not in grouped_builds:
                grouped_builds[build_id] = {
                    'build_id': build_id,
                    'build_name': build['build_name'],
                    'date': build['date'],
                    'username': build['username'],
                    'status': build['status'],
                    'components': []
                }
            # Checking, if build has components
            if build['component_id']:
                grouped_builds[build_id]['components'].append({
                    'component_id': build['component_id'],
                    'component_name': build['component_name'],
                    'quantity': build['quantity'],
                    'description': build['description'],
                    'price': build['price']
                })

        # returning builds
        return jsonify(list(grouped_builds.values())), 200
    except Exception as e:
        print(f"Error in get_user_builds: {str(e)}")
        return jsonify({'error': str(e)}), 500


# POST, editing component
@app.route('/edit', methods=['POST'])
@authorized
def edit_component(current_user):
    if current_user['role'] != 'Admin':
        return jsonify({'error': 'Nie masz uprawnień do edycji komponentów.'}), 403

    data = request.json
    component_id = data.get('component_id')
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    cat_id = data.get('cat_id')

    component_exists = query_db('SELECT 1 FROM Component WHERE component_id = ?', (component_id,), one=True)
    if not component_exists:
        return jsonify({'error': 'Komponent o podanym ID nie istnieje.'}), 404
    try:
        query_db('UPDATE Component SET name=?, description=?, price=?, cat_id=? WHERE component_id=?',
                 (name, description, price, cat_id, component_id), commit=True)
        return jsonify({'message': 'Komponent został pomyślnie zaktualizowany.'}), 200
    except Exception as e:
        return jsonify({'error': 'Nie można zaktualizować komponentu.'}), 500

# POST, adding build to a user
@app.route('/build/add', methods=['POST'])
@authorized
def add_build(current_user):
    if current_user['role'] != 'User':
        return jsonify({'error': 'Nie masz uprawnień do dodawania zestawów.'}), 403

    data = request.json
    build_name = data.get('name')
    username = data.get('username')
    current_date = datetime.now().strftime('%Y-%m-%d')

    try:
        query_db('INSERT INTO Build (Name, date, username, status) VALUES (?, ?, ?, ?)',
                 [build_name, current_date, username, 'Nowy'], commit=True)
        return jsonify({'message': 'Zestaw został dodany.'}), 201
    except Exception as e:
        return jsonify({'error': 'Błąd podczas dodawania zestawu: ' + str(e)}), 500

# DELETE, removing a build
@app.route('/build/<int:build_id>', methods=['DELETE'])
@authorized
def remove_build(current_user, build_id):
    if current_user['role'] != 'User':
        return jsonify({'error': 'Nie masz uprawnień do usuwania zestawów.'}), 403

    try:
        query_db('DELETE FROM BuildInfo WHERE build_id=?', [build_id])
        query_db('DELETE FROM Build WHERE build_id=?', [build_id], commit=True)

        return jsonify({'message': 'Zestaw został usunięty.'}), 200

    except Exception as e:
        return jsonify({'message': 'Nie można usunąć builda z bazy.'}), 500

# POST, updating build name 
@app.route('/build/update', methods=['POST'])
@authorized
def update_build(current_user):
    if current_user['role'] != 'User':
        return jsonify({'error': 'Nie masz uprawnień do aktualizowania zestawów.'}), 403

    data = request.json
    build_id = data.get('buildId')
    name = data.get('name')
    
    try:
        query_db('UPDATE Build SET Name=? WHERE build_id=?',
                 [name, build_id], commit=True)
        return jsonify({'message': 'Nazwa zestawu została zaktualizowana.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# POST, adding component to build
@app.route('/build/component/add', methods=['POST'])
@authorized
def add_component_to_build(current_user):
    if current_user['role'] != 'User':
        return jsonify({'error': 'Nie masz uprawnień do dodawania komponentów do zestawów.'}), 403

    data = request.json
    build_id = data.get('buildId')
    component_id = data.get('componentId')
    quantity = data.get('quantity', 1)
    
    try:
        build_exists = query_db('SELECT 1 FROM Build WHERE build_id = ?', 
                              [build_id], one=True)
        if not build_exists:
            return jsonify({'error': 'Zestaw nie istnieje'}), 404

        component = query_db('SELECT name, price FROM Component WHERE component_id = ?', 
                           [component_id], one=True)
        if not component:
            return jsonify({'error': 'Komponent nie istnieje'}), 404
            
        existing = query_db('SELECT quantity FROM BuildInfo WHERE build_id=? AND component_id=?',
                          [build_id, component_id], one=True)
        
        if existing:
            new_quantity = existing['quantity'] + quantity
            query_db('UPDATE BuildInfo SET quantity=? WHERE build_id=? AND component_id=?',
                    [new_quantity, build_id, component_id], commit=True)
        else:
            query_db('''INSERT INTO BuildInfo 
                       (name, component_id, build_id, quantity, price) 
                       VALUES (?, ?, ?, ?, ?)''',
                    [component['name'], component_id, build_id, quantity, component['price']], 
                    commit=True)
            
        return jsonify({'message': 'Komponent został dodany do zestawu.'}), 200
    except Exception as e:
        print(f"Błąd podczas dodawania komponentu do zestawu: {str(e)}")
        return jsonify({'error': str(e)}), 500

# DELETE, removing component from build
@app.route('/build/component/remove', methods=['DELETE'])
@authorized
def remove_component_from_build(current_user):
    if current_user['role'] != 'User':
        return jsonify({'error': 'Nie masz uprawnień do usuwania komponentów z zestawów.'}), 403

    data = request.json
    build_id = data.get('buildId')
    component_id = data.get('componentId')
    
    try:
        query_db('DELETE FROM BuildInfo WHERE build_id=? AND component_id=?',
                 [build_id, component_id], commit=True)
        return jsonify({'message': 'Komponent został usunięty z zestawu.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
