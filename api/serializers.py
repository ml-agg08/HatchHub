from rest_framework import serializers
from django.contrib.auth.models import User
from . models import Note,Reply,Profile,JoinProject,Skill

class AllSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skill
        fields=['id','skillname']

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

    tag=AllSkillSerializer(many=True,read_only=True)
    skill_ids=serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),write_only=True,many=True,
    )

    class Meta:
        model=Note
        fields=['author','title','content','id','skill_ids','tag']
        extra_kwargs={'author':{'read_only':True}}

    def create(self, validated_data):
        skill_ids=validated_data.pop('skill_ids')
        note=Note.objects.create(**validated_data)
        note.tag.set(skill_ids)
        return note

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model=Reply
        fields=['content','id','author']
        extra_kwargs={'author':{'read_only':True}}

class ProfileSerializer(serializers.ModelSerializer):

    skill=AllSkillSerializer(many=True,read_only=True)
    skill_ids=serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),write_only=True,many=True
    )

    class Meta:
        model=Profile
        fields=['firstname','lastname','bio','college','skill','skill_ids','experience_projects']

    def create(self, validated_data):
        skill_ids=validated_data.pop('skill_ids')    
        profile=Profile.objects.create(**validated_data)
        profile.skill.set(skill_ids)
        return profile
        
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

class ListUserSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skill
        fields=['id']

