from rest_framework import serializers
from django.contrib.auth.models import User
from . models import Note,Reply,Profile,JoinProject
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","password"]
        extra_kwargs={"password":{"write_only":True}}
    def create(self,validated_data):
        user=User.objects.create_user(**validated_data)
        return user
    
class SkillSerializer(serializers.Serializer):
    tag=serializers.CharField()

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields=['author','title','content','id','tag']
        extra_kwargs={'author':{'read_only':True}}

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model=Reply
        fields=['content','id','author']
        extra_kwargs={'author':{'read_only':True}}

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profile
        fields=['firstname','lastname','bio','college','skill','experience_projects']
        
class JoinProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=JoinProject
        fields=['owner','text','id','status']
        extra_kwargs={'owner':{'read_only':True},'status':{'read_only':True}}

class HasProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id']

class ApproveProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=JoinProject
        fields=['status','approval_text']

class ViewProjectRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=JoinProject
        fields=['id','note','text','approval_text','status']

class ListUserSkillSerializer(serializers.Serializer):
    skill=serializers.CharField()