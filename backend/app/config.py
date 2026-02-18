from urllib.parse import quote_plus
from pymongo import MongoClient

username = "caniwait2005_db_user"
password = quote_plus("Test12345")  # the password you just set
cluster = "cluster0.gg4a0pz.mongodb.net"      # copy exactly from Atlas

MONGO_URI = f"mongodb+srv://{username}:{password}@{cluster}/aegis_db?retryWrites=true&w=majority"

client = MongoClient(MONGO_URI)
db = client["aegis_db"]
