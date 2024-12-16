from django.urls import path
from . import views
urlpatterns = [
    path("api/data/user",views.save_data,name="get"),
    path("api/data/user/retrive",views.retrive_data,name="retrive"),
    path("api/data/user/email",views.user_email_reg,name="email"),
    path("songs",views.songs,name="songs"),
]
