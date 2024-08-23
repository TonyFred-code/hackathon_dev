from rest_framework import serializers
from .models import Student, Attendance, Class, Subject, Grade, Admin

# Admin Serializer
class AdminSerializer(serializers.ModelSerializer):
    assigned_class = serializers.StringRelatedField()
    class Meta:
        model = Admin
        fields = ['name', 'is_class_teacher', 'assigned_class']


# Subject Serializer
class SubjectSerializer(serializers.ModelSerializer):
    teacher = AdminSerializer()
    class_name = serializers.StringRelatedField()  # Display class name as string

    class Meta:
        model = Subject
        fields = ['name', 'teacher', 'class_name']

    def create(self, validated_data):
        teacher_data = validated_data.pop('teacher')
        class_name_data = validated_data.pop('class_name')

        # Look up the teacher by the provided name
        try:
            teacher = Admin.objects.get(name=teacher_data['name'])
        except Admin.DoesNotExist:
            raise serializers.ValidationError({"teacher": "Teacher does not exist."})

        # Look up the class by the provided name
        try:
            class_name = Class.objects.get(name=class_name_data)
        except Class.DoesNotExist:
            raise serializers.ValidationError({"class_name": "Class does not exist."})

        # Create the Subject with the validated data
        subject = Subject.objects.create(teacher=teacher, class_name=class_name, **validated_data)
        return subject

# Grade Serializer
class GradeSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer()  # Nested SubjectSerializer to include subject details

    class Meta:
        model = Grade
        fields = ['subject', 'value']

class AttendanceSerializer(serializers.ModelSerializer):
    student  = serializers.StringRelatedField()
    class Meta:
        model = Attendance
        fields = ['student', 'date', 'status']


# Student Serializer
class StudentSerializer(serializers.ModelSerializer):
    class_id = serializers.StringRelatedField()  # Display class name as string
    current_grades = GradeSerializer(many=True)  # Use GradeSerializer to include grades with subject details
    attendance = AttendanceSerializer()
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'email','attendance', 'gender', 'date_of_birth', 'class_id', 'current_grades', 'parent_contact_info']

    def update(self, instance, validated_data):
        # Update class_id (Class model)
        class_data = validated_data.pop('class_id', None)
        if class_data:
            class_instance = Class.objects.get(name=class_data)
            instance.class_id = class_instance

        # Update grades (Grade model)
        grades_data = validated_data.pop('current_grades', [])
        for grade_data in grades_data:
            subject_name = grade_data['subject']['name']
            subject_instance = Subject.objects.get(name=subject_name)
            grade_instance = instance.current_grades.get(subject=subject_instance)
            grade_instance.value = grade_data.get('value', grade_instance.value)
            grade_instance.save()

        # Update other Student fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
    




# Class Serializer with Nested Serializers
class ClassSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True, source='student_class')
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = Class
        fields = ['id', 'name', 'students', 'subjects']

    def create(self, validated_data):
        students_data = self.initial_data.get('students', [])
        subjects_data = self.initial_data.get('subjects', [])

        class_instance = Class.objects.create(**validated_data)

        # Handle nested student creation
        for student_data in students_data:
            student_data['class_id'] = class_instance
            Student.objects.create(**student_data)

        # Handle nested subject creation
        for subject_data in subjects_data:
            subject_data['class_name'] = class_instance
            Subject.objects.create(**subject_data)

        return class_instance

    def update(self, instance, validated_data):
        # Update basic fields
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        # For the `students` and `subjects`, manage them separately.
        students_data = self.initial_data.get('students', [])
        subjects_data = self.initial_data.get('subjects', [])

        # Handle updating students
        for student_data in students_data:
            student_instance = Student.objects.get(id=student_data['id'])
            student_instance.class_id = instance
            student_instance.save()

        # Handle updating subjects
        for subject_data in subjects_data:
            subject_instance = Subject.objects.get(id=subject_data['id'])
            subject_instance.class_name = instance
            subject_instance.save()

        return instance
