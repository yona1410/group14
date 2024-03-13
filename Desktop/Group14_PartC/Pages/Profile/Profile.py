from flask import render_template, Blueprint, request
from flask import redirect, jsonify, url_for, session
from mongodb import users_col,bookings_col,apartments_col
from datetime import datetime
#about blueprint definition
Profile = Blueprint(
    'Profile',
    __name__,
    static_folder='static',
    static_url_path='/Profile',
    template_folder='templates'

)



@Profile.route('/profile/<user_id>')
def index(user_id):
    if 'user_id' not in session:
        # If the user is not logged in, redirect to login page or show an error
        return redirect(url_for('HomePage.index'))
    myquery={"id":user_id}
    user=users_col.find_one(myquery)
    # If logged in, proceed to show profile
    query_params = {
        'user_id': user_id,
            }

    bookings = bookings_col.find(query_params)
    bookings=list(bookings)
    return render_template('Profile.html',user=user, bookings=bookings)


@Profile.route('/cancel_now/<booking_id>', methods=['POST'])
def cancel_now(booking_id):
    if request.method == 'POST':

        bookingdetail = bookings_col.find_one({'booking_id': booking_id})

        if bookingdetail:
            # Cancel the booking by deleting it from the database
            bookings_col.delete_one({'_id': bookingdetail['_id']})

            # Redirect to a success page or any other appropriate action
            return jsonify({'success': True})

        else:
            # Handle the case where the booking does not exist
            return jsonify({'success': False, 'error': 'Booking not found'}), 404

@Profile.route('/update_now/<booking_id>', methods=['POST'])
def update_now(booking_id):
    if request.method == 'POST':

        bookingdetail = bookings_col.find_one({'booking_id': booking_id})

        if bookingdetail:
            # update the booking record so the home owner will contact you
            bookings_col.update_one({'booking_id': bookingdetail['booking_id']}, {'$set': {'contact_me': 'Home Owner will contact you'}}, upsert=True)

            # Redirect to a success page or any other appropriate action
            return jsonify({'success': True})

        else:
            # Handle the case where the booking does not exist
            return jsonify({'success': False, 'error': 'Booking not found'}), 404