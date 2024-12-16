from rest_framework import serializers
class DataSerializer(serializers.Serializer):
    displayName=serializers.CharField(max_length=100)
    email=serializers.EmailField()
class DataSerializer2(serializers.Serializer):
    name=serializers.CharField(max_length=100)
    email=serializers.EmailField()
    password=serializers.CharField(max_length=20)