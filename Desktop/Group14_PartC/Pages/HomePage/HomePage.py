from flask import render_template, Blueprint, request
from flask import redirect, jsonify, url_for, session, abort
from mongodb import users_col
#about blueprint definition
HomePage = Blueprint(
    'HomePage',
    __name__,
    static_folder='static',
    static_url_path='/HomePage',
    template_folder='templates'

)

@HomePage.route('/', methods=['GET'])
def index():
    return render_template('HomePage.html')

#Routes
@HomePage.route('/submit', methods=['GET', 'POST'])
def submit():
        # Handle login action
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')
        myquery = {"id": username}
        user = users_col.find_one(myquery)
        if user is not None:
            if password == user['password']:
                session['user_id'] = username
                print(session['user_id'])
                return redirect(url_for('Profile.index', user_id=session['user_id']))
            return jsonify({'error': 'Incorrect username or password'}), 401
        return jsonify({'error': 'Incorrect username or password'}), 401
    return redirect(url_for('HomePage.index'))







