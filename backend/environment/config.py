import os

user = 'root'
pwd = '1234'
host = 'localhost'
db = 'mydb'

db_URI = os.getenv(
    'DATABASE_URL', 'mysql://{0}:{1}@{2}/{3}'.format(user, pwd, host, db))
