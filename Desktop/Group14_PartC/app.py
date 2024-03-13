import pymongo
from flask import Flask, redirect, url_for
from flask import render_template
from flask import request, session
from flask import jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://reznyo:Yonatan1410@cluster0.aqqs5hc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))


mydb = client["mydatabase"]

dblist = client.list_database_names()
if "mydatabase" in dblist:
    print("The database exists.")

app = Flask(__name__)
app.secret_key = '125'

#Pages
#HomePage
from Pages.HomePage.HomePage import HomePage
app.register_blueprint(HomePage)

#Profile
from Pages.Profile.Profile import Profile
app.register_blueprint(Profile)

#Registration
from Pages.Registration.Registration import Registration
app.register_blueprint(Registration)

#SearchPage
from Pages.SearchPage.SearchPage import SearchPage
app.register_blueprint(SearchPage)

#SearchResults
from Pages.SearchResults.SearchResults import SearchResults
app.register_blueprint(SearchResults)

from Pages.ContactUs.ContactUs import ContactUs
app.register_blueprint(ContactUs)

if __name__ == '__main__':
    app.run()
