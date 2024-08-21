from rest_framework import serializers
from .models import Student, Teacher, Attendance, Class, Subject, Grade

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'name']  # Added 'id' to uniquely identify the class

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['name']  # Added 'id' for unique identification

class GradeSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer()  # Nested SubjectSerializer to include subject details

    class Meta:
        model = Grade
        fields = ['subject', 'value']  # Show subject and grade

class StudentSerializer(serializers.ModelSerializer):
    class_id = ClassSerializer()  
    
    grades = GradeSerializer(many=True)  # Use GradeSerializer to include grades with subject details

    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'email', 'gender', 'date_of_birth', 'class_id', 'grades']  # Include fields for serialization

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'  # Serialize all fields for Teacher
