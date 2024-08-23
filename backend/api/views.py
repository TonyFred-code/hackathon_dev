from django.shortcuts import render
from .models import  Student, Grade, Attendance
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from .serializers import StudentSerializer


@api_view(['GET', 'POST'])
def student_list(request):
    instance = Student.objects.all()

    if request.method == 'GET':
        serializer = StudentSerializer(instance, many=True)
        return Response({'student': serializer.data}, status=status.HTTP_200_OK)

    elif request.method == 'POST':
            serializer =StudentSerializer( data = request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({'success': serializer.data}, status=status.HTTP_200_OK)
            
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET', 'PUT'])
def student_id(request, id):

    try:
        query = Student.objects.get(id=id)

    except Student.DoesNotExist:
        return HttpResponse(status=404)

    
    if request.method =='GET':
        serializer = StudentSerializer(query)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = StudentSerializer( query, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)