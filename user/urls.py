from django.urls import path
from . import views
urlpatterns = [
    path("add/",views.add_person,name="add"),
    path("show/",views.get_person,name="get"),
    path("api/data/",views.get_data,name="get_data"),
]
