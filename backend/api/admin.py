from django.contrib import admin
from .models import Student, Subject, Class, Attendance,Teacher, Grade


# Register your models here.

admin.site.register(Grade)
admin.site.register(Student)
admin.site.register(Class)
admin.site.register(Subject)
admin.site.register(Attendance)
admin.site.register(Teacher)
