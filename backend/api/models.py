from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class Patient(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    STATUS_CHOICES = [
        ('NC', 'Not Consulted'),
        ('C', 'Consulting'),
        ('CO', 'Consulted'),
    ]


    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    age = models.PositiveIntegerField()

    status = models.CharField(
        max_length=2,
        choices=STATUS_CHOICES,
        default='NC',
    )

    def __str__(self):
        return f"{self.firstname} {self.lastname}"
    


class User(AbstractUser):
    ROLE_CHOICES = [
        ('AD', 'Admin'),
        ('DR', 'Doctor'),
        ('AS', 'Assistant'),
    ]
    role = models.CharField(max_length=2, choices=ROLE_CHOICES)
    groups = models.ManyToManyField(Group, related_name="api_user_set")
    user_permissions = models.ManyToManyField(Permission, related_name="api_user_set")
