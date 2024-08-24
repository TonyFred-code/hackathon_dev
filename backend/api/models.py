from django.db import models



# class Teacher(models.Model):
#     full_name = models.CharField(max_length=300)
#     email = models.EmailField(unique=True)
#     sex = models.CharField(max_length=100)
#     subject = models.CharField(max_length=300)

#     def __str__(self):
#         return f"{self.full_name} {self.email}"

class Class(models.Model):
    name = models.CharField(max_length=200)
    # students = models.ManyToManyField('Student', blank=True, related_name='classes')  # Changed related_name
    # subjects = models.ManyToManyField('Subject', blank=True, related_name='classes')  # Changed related_name

    def __str__(self):
        return f"{self.name}"
    
# class Admin(models.Model):
#     name = models.CharField(max_length=200)
#     is_class_teacher = models.BooleanField(default=False)
#     assigned_class = models.OneToOneField('Class', on_delete=models.SET_NULL, null=True, blank=True)
#     subjects = models.ManyToManyField("Subject",null=True, blank=True,  related_name='teachers')

#     def __str__(self):
#         return self.name

# class Subject(models.Model):
#     name = models.CharField(max_length=100)
#     # teacher = models.ForeignKey('Admin', on_delete=models.SET_NULL, blank=True, null=True, related_name='subject_teacher')
#     class_name = models.ForeignKey('Class', on_delete=models.CASCADE, null=True, blank=True, related_name='student_subject')  # Changed related_name


#     # class Meta:
#     #     constraints = [
#     #         models.UniqueConstraint(fields=['name', 'teacher'], name='unique_subject_teacher')
#     #     ]

        
#     def __str__(self):
#         return self.name


class Student(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    parent_contact_info= models.EmailField(null=True)
    class_id = models.ForeignKey('Class', on_delete=models.CASCADE, null=True, blank=True,
                                 related_name='students')
#     # subjects = models.ManyToManyField('Subject', through='Grade')
#     # attendance = models.OneToOneField("Attendance",null=True, blank=True, related_name='student_attendance', on_delete=models.SET_NULL)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

     
    # @property
    # def current_grades(self):
    #     return self.grades.all().values('subject__name', 'grade')


# class Grade(models.Model):
#     student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name='current_grades')  # Added related_name
#     subject = models.ForeignKey('Subject', on_delete=models.CASCADE)
#     value = models.PositiveIntegerField()

#     def __str__(self):
#         return f"{self.student} - {self.subject}: {self.value}"

# class Attendance(models.Model):
#     STATUS_CHOICES = [
#         ('P', 'Present'),
#         ('A', 'Absent'),
#         ('L', 'Late'),
#     ]
#     student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name='attendances', null=True)
#     date = models.DateField()
#     status = models.CharField(max_length=10)

#     def __str__(self):
#         return f"{self.student.first_name} - {self.date}"
