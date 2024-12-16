import json
from bson import json_util
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import user_collection,email_collection,song_collection
from .serializers import DataSerializer,DataSerializer2
@api_view(["POST"])
def save_data(request):
    serializer = DataSerializer(data=request.data)

    if serializer.is_valid():

        user_collection.insert_one(serializer.validated_data)
        
        return Response({"message": "User data saved successfully!"}, status=201)

    return Response(serializer.errors, status=400)

@api_view(["GET"])
def retrive_data(request):
    username = request.session.get("username")
    data=user_collection.find_one({"displayName":"Praveen Karuppusamy"},{"_id":0})
    if data:
       return Response(data)
    else:
        return Response({"displayName":"User"})

@api_view(["GET","POST"])
def user_email_reg(request):
    if request.method=="POST":
        
        serializer=DataSerializer2(data=request.data)
        if serializer.is_valid():
            try:
                 email_collection.insert_one(serializer.validated_data)
                 return Response({"message":"Data saved"},status=201)
            except Exception as e:
                return Response({"error": str(e)}, status=500)
            
    if request.method=="GET":
       return Response({"message":"data saved"})
   
@api_view  (['GET'])
def songs(request):
    
    data = song_collection.find({}, {"_id": 0})
    listdata = list(data)
    return JsonResponse(listdata,safe=False)