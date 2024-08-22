from rest_framework import serializers
from .models import Student, Teacher, Attendance, Class, Subject, Grade

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'name']  

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['name']  

class GradeSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer()  # Nested SubjectSerializer to include subject details

    class Meta:
        model = Grade
        fields = ['subject', 'value']  








class StudentSerializer(serializers.ModelSerializer):
    class_id = ClassSerializer()  
    
    current_grades = GradeSerializer(many=True)  # Use GradeSerializer to include grades with subject details

    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'email', 'gender', 'date_of_birth', 'class_id', 'current_grades', 'parent_contact_info']  # Include fields for serialization

    def update(self, instance, validated_data):
        print('validated_data = ', validated_data)
        # Update class_id (Class model)
        class_data = validated_data.pop('class_id', None)
        if class_data:
            class_instance = instance.class_id
            print('class_instace = ', class_instance)
            print('class_instace name = ', class_instance.id)

            class_instance.name = class_data.get('name', class_instance.name)
            class_instance.save()

        # Update grades (Grade model)
        grades_data = validated_data.pop('grades', [])
        for grade_data in grades_data:
            grade_instance = instance.grades.get(subject__name=grade_data['subject']['name'])
            grade_instance.value = grade_data.get('value', grade_instance.value)
            grade_instance.save()

        # Update other Student fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.save()

        return instance



class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'  
