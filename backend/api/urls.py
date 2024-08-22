from django.urls import path

from . import views

urlpatterns = [
    path('student/student_list', views.student_list, name= 'student list'),
    path('student/student_detail/<int:id>', views.student_id, name= 'student detial')
]
