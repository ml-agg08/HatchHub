from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Note(models.Model):
    title=models.CharField(max_length=50)
    content=models.TextField(max_length=300)
    tag=models.CharField(max_length=30,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name="notes")

    def __str__(self):
        return self.title
    
class Reply(models.Model):
    content=models.CharField(max_length=300)
    owner=models.ForeignKey(Note,on_delete=models.CASCADE,related_name="replies")
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name="global_replies")

    def __str__(self):
        return self.content
    
class Profile(models.Model):
    firstname=models.CharField(max_length=50)
    lastname=models.CharField(max_length=50)
    bio=models.TextField(max_length=60)
    college=models.CharField(max_length=50)
    skill=models.CharField(max_length=20)   #update later
    experience_projects=models.TextField(max_length=300)  #update later
    owner=models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")

class JoinProject(models.Model):
    note=models.ForeignKey(Note,on_delete=models.CASCADE)
    owner=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    text=models.TextField(max_length=300,null=True,blank=True)
    status=models.CharField(max_length=10,default='pending',null=True)
    approval_text=models.TextField(max_length=300,null=True)