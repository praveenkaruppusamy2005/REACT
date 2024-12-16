from django.db import models
from .db_connection import db
# Create your models here.
user_collection=db['user_detail']
email_collection=db['user_details_email']
song_collection=db["songs"]