from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('notes/',views.NoteListCreate.as_view(),name="note-list"),
    path('notes/delete/<int:pk>/',views.NoteDelete.as_view(),name='delete-note'),
    path('notes/<int:note_id>/replies/',views.ReplyListCreate.as_view(),name='reply-list'),
    path('profile/',views.CreateListProfile.as_view(),name='profile'),
    path('notes/public/',views.ListNotes.as_view(),name="note-list-public"),
    path('notes/<int:note_id>/joinproject/',views.JoinProjectListCreate.as_view(),name="joinproject"),
    path('hasprofile/',views.HasProfileList.as_view(),name='hasprofile'),
    path('notes/<int:pk>/approvalproject/',views.ApprovalProjectUpdate.as_view(),name='approval-project'),
    path('viewrequests/<str:status>',views.ViewProjectRequestList.as_view(),name='viewrequests'),
    path('singlenoteview/<int:id>/',views.SingleNoteListView.as_view(),name="singlenoteview"),
    path('notes/publicskill/',views.ListNotesBySkill.as_view(),name='listnotesbyskill'),
    path('getuserskill/',views.ListUserSkill.as_view(),name='getuserskill'),
    path('getspecific/<int:user_id>',views.ListSpecificProfile.as_view(),name='getspecificprofile'),
    path('skills/',views.ListSkillsAll.as_view(),name='listskillsall'),
]
