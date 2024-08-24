from django.urls import path

from . import views

urlpatterns = [
    path('student_list', views.student_list, name= 'student list'),
    path('student_detail/<int:id>', views.student_id, name= 'student detial'),
    # path('subject_list', views.subject_list, name= 'student detial'),
    # path('classes/', views.class_list, name='class-list'),
    # path('classes/<int:pk>/', views.class_detail, name='class-detail'),
    # path('attendance/', views.attendance_list, name='attendance'),
    # path('Admin/', views.admin, name='admin' )
    
]
