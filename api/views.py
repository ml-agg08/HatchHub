from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from . serializers import UserSerializer,JoinProjectSerializer,NoteSerializer,ReplySerializer,ProfileSerializer,HasProfileSerializer,ApproveProjectSerializer,ViewProjectRequestSerializer,SkillSerializer,ListUserSkillSerializer
from . models import Note,Reply,Profile,JoinProject
# Create your views here.



class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]


class SingleNoteListView(generics.ListAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        id=self.kwargs['id']
        return Note.objects.filter(pk=id)


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return Note.objects.filter(author=user)
    
class ReplyListCreate(generics.ListCreateAPIView):
    serializer_class=ReplySerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        note_id=self.kwargs["note_id"]
        note=Note.objects.get(pk=note_id)
        return note.replies
    
    def perform_create(self, serializer):
        if serializer.is_valid:
            note_id=self.kwargs["note_id"]
            note=Note.objects.get(pk=note_id)
            serializer.save(author=self.request.user,owner=note)
        else:
            print(serializer.errors)

class CreateListProfile(generics.ListCreateAPIView):
    serializer_class=ProfileSerializer
    permission_classes=[IsAuthenticated]
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

    def get_queryset(self):
        return Profile.objects.filter(owner=self.request.user)
    

class ListNotesUserSkill(generics.ListAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(tag=self.request.user.profile.skill).exclude(author=self.request.user)
    
class ListNotes(generics.ListAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return Note.objects.all().exclude(author=self.request.user)
    
class ListNotesBySkill(generics.ListAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        skill=self.kwargs['skill']
        return Note.objects.filter(tag=skill).exclude(author=self.request.user)
        
class ListSkills(generics.ListAPIView):
    serializer_class=SkillSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return Note.objects.values('tag').distinct()

class JoinProjectListCreate(generics.ListCreateAPIView):
    serializer_class=JoinProjectSerializer
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        if(serializer.is_valid()):
            note_id=self.kwargs["note_id"]
            note=Note.objects.get(pk=note_id)
            print(self.request.user)
            serializer.save(owner=self.request.user,note=note)
        else:
            print(serializer.errors)

    def get_queryset(self):
        note_id=self.kwargs['note_id']
        note=Note.objects.get(pk=note_id)
        return JoinProject.objects.filter(note=note)
        
class HasProfileList(generics.ListAPIView):
    serializer_class=HasProfileSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        if not hasattr(user,'profile'):
            return User.objects.none()
        else:
            return User.objects.filter(id=user.id)
        
class ApprovalProjectUpdate(generics.UpdateAPIView):
    serializer_class=ApproveProjectSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return JoinProject.objects.all()
    
    def perform_update(self, serializer):
        approval_id=self.kwargs['pk']
        approval=JoinProject.objects.get(pk=approval_id)

        approval.approval_text=serializer.validated_data.get('approval_text',approval.approval_text)
        approval.status=serializer.validated_data.get('status',approval.status)
        approval.save()

class ViewProjectRequestList(generics.ListAPIView):
    serializer_class=ViewProjectRequestSerializer
    permission_classes=[IsAuthenticated]


    def get_queryset(self):
        return JoinProject.objects.filter(owner=self.request.user)
    
class ListUserSkill(generics.ListAPIView):
    serializer_class=ListUserSkillSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        profile=Profile.objects.get(owner=self.request.user)
        return [{'skill':profile.skill}]

