import os

user = 'root'
pwd = 'root'
host = 'localhost'
db = 'mydb'

db_URI = os.getenv(
    'DATABASE_URL', 'mysql://{0}:{1}@{2}/{3}'.format(user, pwd, host, db))
