from flask import render_template, Blueprint, request
from flask import redirect, jsonify, url_for

#about blueprint definition
SearchPage = Blueprint(
    'SearchPage',
    __name__,
    static_folder='static',
    static_url_path='/SearchPage',
    template_folder='templates'

)

#Routes
@SearchPage.route('/SearchPage')
def index():
    return render_template('SearchPage.html')

#Routes
@SearchPage.route('/search', methods=['GET', 'POST'])
def search():
        # Handle login action
    if request.method == 'POST':
        data = request.json
        place = data.get('place')
        kosher = data.get('Kosher')
        animal= data.get('animal')
        elevator= data.get('Elevator')
        parking= data.get('Parking')
        guests= data.get('Guests')


        startdate= str(data.get('startdate')).replace("/","-")
        enddate= str(data.get('enddate')).replace("/","-")
        print(kosher)
        print(animal)
        print(elevator)
        #query to provide results
        return redirect(url_for('SearchResults.search_results',place=place,kosher=kosher,animal=animal
                        ,elevator=elevator,parking=parking,guests=guests,startdate=startdate,enddate=enddate))

        #   else:
            # If using AJAX, you may want to return a JSON response

         #      return jsonify({'success': False})
