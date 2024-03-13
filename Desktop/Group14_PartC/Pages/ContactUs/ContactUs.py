from flask import render_template
from flask import Blueprint

#about blueprint definition
ContactUs = Blueprint(
    'ContactUs',
    __name__,
    static_folder='static',
    static_url_path='/ContactUs',
    template_folder='templates'

)

#Routes
@ContactUs.route('/ContactUs')
def index():
    return render_template('ContactUs.html')