from flask import render_template, Blueprint, request
from flask import redirect, jsonify, url_for, session
from mongodb import users_col
import logging

#about blueprint definition

Registration=Blueprint(
    'Registration',
    __name__,
    static_folder='static',
    static_url_path='/Registration',
    template_folder='templates'

)

#Routes
@Registration.route('/Registration', methods=['GET','POST'])
def index():  
    return render_template('RegistrationPage.html')

def insert_user(data):
    users_col.insert_one(data)

def get_user_by_parameter(parameter,value):
    return users_col.find_one({parameter: value})

@Registration.route('/register', methods=['GET','POST'])
def submit():
    data = request.json
    # Check if the provided ID already exists
    existing_user = get_user_by_parameter('id',data.get('id'))
    if existing_user:
        return jsonify({'success': False, 'message': 'ID already exists'})

    # Check if the provided email already exists
    existing_email = get_user_by_parameter('email',data.get('email'))
    if existing_email:
        return jsonify({'success': False, 'message': 'Email already exists'})
    # Assume user registration process here...
    # After successfully registering the user:
    session['user_id'] = data.get('id')  # Use a unique identifier for the user
    #response_data = {'success': True, 'redirect': url_for('Profile.index', user_id=session['user_id'],user=data)}
    #logging.debug('Response data: %s', response_data)
    insert_user(data)
    return jsonify({'success': True, 'redirect': url_for('Profile.index', user_id=session['user_id'])})





