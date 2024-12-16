from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import person_collections
def add_person(request):
    data={
    "firstname":"praveenkaruppusamy","age":"19","place":"erode"
       }
    person_collections.insert_one(data)
    return HttpResponse("hi")
def get_person(request):
     person_datas=person_collections.find({"firstname":"praveen"},{"_id":0})
     s=list(person_datas)
     return HttpResponse(s)
 
@api_view(['GET'])
def get_data(request):
        data=person_collections.find({"firstname":"praveen"},{"_id":0})
        d=list(data)
        return JsonResponse(d)

     