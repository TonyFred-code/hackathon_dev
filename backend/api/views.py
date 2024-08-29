from django.shortcuts import render
from .models import  Student, Class, Subject
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from .serializers import StudentSerializer, ClassSerializer, SubjectSerializer
# , AttendanceSerializer,AdminSerializer, SubjectSerializer, ClassSerializer
# 
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
    pass
    # try:
    #     query = Student.objects.get(id=id)

    # except Student.DoesNotExist:
    #     return HttpResponse(status=404)

    
    # if request.method =='GET':
    #     serializer = StudentSerializer(query)
    #     return Response(serializer.data)
    
    # if request.method == 'PUT':
    #     serializer = StudentSerializer( query, data = request.data)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def subject_list(request):
    
    subjects = Subject.objects.all()

    if request.method == 'GET':
        serializer = SubjectSerializer(subjects, many=True)
        return Response({'subjects': serializer.data}, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
            serializer =SubjectSerializer( data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({'success': serializer.data}, status=status.HTTP_200_OK)
            
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def class_list(request):
    if request.method == 'GET':
        classes = Class.objects.all()
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def class_detail(request, pk):
#     try:
#         class_instance = Class.objects.get(pk=pk)
#     except Class.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = ClassSerializer(class_instance)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = ClassSerializer(class_instance, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         class_instance.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['GET', 'POST'])
# def admin(request):
#     if request.method == 'GET':
#         admin = Admin.objects.all()
#         serializer = AdminSerializer(admin, many=True)
#         return Response({'admin': serializer.data }, status=status.HTTP_200_OK)
    
#     elif request.method == 'POST':
#             serializer =AdminSerializer( data=request.data)

#             if serializer.is_valid():
#                 serializer.save()
#                 return Response({'success': serializer.data}, status=status.HTTP_200_OK)
                
#             return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'POST'])
# def attendance_list(request):
 
#     if request.method == 'GET':
#         attendance = Attendance.objects.all()
#         serializer = AttendanceSerializer(attendance, many=True)
#         return Response({'attendance': serializer.data }, status=status.HTTP_200_OK)
    
#     elif request.method == 'POST':
#         serializer =AttendanceSerializer( data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response({'success': serializer.data}, status=status.HTTP_200_OK)
            
#         return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


