# Generated by Django 4.2.11 on 2024-08-21 13:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0004_remove_subject_teacher_delete_student_delete_subject_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=300)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('sex', models.CharField(max_length=100)),
                ('subject', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('class_name', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='classess_in_subject', to='api.class')),
                ('teacher', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='subjects', to='api.teacher')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('date_of_birth', models.DateField()),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('gender', models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female')], max_length=50)),
                ('current_grade', models.JSONField(default=dict)),
                ('class_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students', to='api.class')),
            ],
        ),
        migrations.AddField(
            model_name='class',
            name='student',
            field=models.ManyToManyField(to='api.student'),
        ),
        migrations.AddField(
            model_name='class',
            name='subject',
            field=models.ManyToManyField(to='api.subject'),
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Late')], max_length=10)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attendances', to='api.student')),
            ],
        ),
    ]