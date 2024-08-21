from django.shortcuts import render
from .models import Teacher, Student, Grade, Attendance
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import StudentSerializer,TeacherSerializer


@api_view(['GET', 'PUT'])
def student_list(request):
    instance = Student.objects.all()

    if request.method == 'GET':
        serializer = StudentSerializer(instance, many=True)
        return Response({'student': serializer.data}, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
            serializer =StudentSerializer(instance, data = request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({'success': serializer.data}, status=status.HTTP_200_OK)
            
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        

