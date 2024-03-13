from flask import render_template, Blueprint, request
from flask import redirect, jsonify, url_for,session
from mongodb import apartments_col,bookings_col
from datetime import datetime
import os
import random
import string

import re
#about blueprint definition
SearchResults=Blueprint(
    'SearchResults',
    __name__,
    static_folder='static',
    static_url_path='/SearchResults',
    template_folder='templates'

)

def get_random_picture():
    pictures_dir = os.path.join(os.path.dirname(__file__), 'static', 'pic_apartments')
    pictures = os.listdir(pictures_dir)
    if pictures:
        random_picture = random.choice(pictures)
        # Use forward slashes to construct the URL
        return os.path.join('pic_apartments', random_picture).replace('\\', '/')
    return None

def generate_uid():
    """Generate a unique 6-character alphanumeric ID."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

def find_booked_apartments(bookings_col, relevant_apartment_ids, startdate, enddate):
    booked_apartments = bookings_col.find({
        'apartment_id': {'$in': relevant_apartment_ids},
        '$or': [
            {'$and': [
                {'start_date': {'$lte': startdate}},
                {'end_date': {'$gte': startdate}}
            ]},  # Booking starts before and ends after the queried range
            {'$and': [
                {'start_date': {'$gte': startdate, '$lte': enddate}},
                {'end_date': {'$gte': startdate, '$lte': enddate}}
            ]},  # Booking starts and ends within the queried range
            {'$and': [
                {'start_date': {'$lte': startdate}},
                {'end_date': {'$gte': startdate, '$lte': enddate}}
            ]},  # Booking starts before and ends within the queried range
            {'$and': [
                {'start_date': {'$gte': startdate, '$lt': enddate}},
                {'end_date': {'$gt': startdate}}
            ]}  # Booking starts within the queried range and ends after
        ]
    })
    return booked_apartments

#Routes
@SearchResults.route('/SearchResults/<place>/<kosher>/<animal>/<elevator>/<parking>/<guests>/<startdate>/<enddate>')
def search_results(place, kosher, animal, elevator, parking, guests, startdate, enddate):
    # For example, you can access these parameters using the function arguments
    # Construct the query parameters

    parking_int = int(parking)
    guests_int = int(guests)

    query_params = {
        'city': place,
        'kosher': True if kosher == 'on' else False,
        'parking': {'$gte': parking_int},
        'Guests': {'$gte': guests_int},
        '$or': []
    }

    # Build the $or clause dynamically based on conditions
    if animal == 'on':
        query_params['$or'].append({'animal': True})

    if elevator == 'on':
        query_params['$or'].append({'elevator': True})

    # If no conditions are met, just remove the $or clause from the query_params
    if not query_params['$or']:
        del query_params['$or']

    relevant = apartments_col.find(query_params)
    startdate = datetime.strptime(startdate, "%d-%m-%Y")
    enddate = datetime.strptime(enddate, "%d-%m-%Y")

    relevant_apartment_ids = [apartment['id'] for apartment in relevant]

    booked_apartments = find_booked_apartments(bookings_col, relevant_apartment_ids, startdate, enddate)

    booked_apartment_ids = [booking['apartment_id'] for booking in booked_apartments]
    not_booked_apartment_ids = [apartment_id for apartment_id in relevant_apartment_ids if
                                apartment_id not in booked_apartment_ids]


    apartments = list(apartments_col.find({'id': {'$in': not_booked_apartment_ids}}))
    # Modify apartments list to include a random picture for each apartment
    for apartment in apartments:
        apartment['random_picture'] = get_random_picture()

    return render_template('SearchResults.html', query_params=query_params,apartments=apartments,startdate=startdate,enddate=enddate)

@SearchResults.route('/book_now/<apartment_id>/<start_date>/<end_date>', methods=['GET', 'POST'])
def book_now(apartment_id, start_date, end_date):
    if request.method == 'POST':
        # Retrieve form data
        startdate = datetime.strptime(start_date, "%Y-%m-%d 00:00:00")
        enddate = datetime.strptime(end_date, "%Y-%m-%d 00:00:00")
        # Find apartment address and city:
        apartment_details = apartments_col.find_one({'id': int(apartment_id)}, {'address': 1, 'city': 1, '_id': 0})

        # Iterate over the cursor to extract apartment details
        full_address = apartment_details['address'] + ', ' + apartment_details['city']
        # Create a new booking entry in the MongoDB bookings table
        new_booking = {
            'booking_id': generate_uid(),
            'user_id': session.get('user_id'),  # Assuming user ID is stored in the session
            'apartment_id': int(apartment_id),
            'start_date': startdate,
            'end_date': enddate,
            'Full_address': full_address
                    # Add other relevant fields as needed
        }
        bookings_col.insert_one(new_booking)
        print(session.get('user_id'))
        # Redirect to a success page or any other appropriate action
        return jsonify({'success': True, 'user_id': session.get('user_id')})

    # If it's a GET request, you can redirect to an error page or handle as needed
    return redirect(url_for('SearchResults.error'))