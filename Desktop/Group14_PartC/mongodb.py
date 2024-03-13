
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://reznyo:Yonatan1410@cluster0.aqqs5hc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

mydb = client["mydatabase"]
users_col = mydb['users']
apartments_col = mydb['apartments']
bookings_col = mydb['bookings']


