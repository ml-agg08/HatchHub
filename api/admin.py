from django.contrib import admin
from . models import Note,Reply,Profile
# Register your models here.

admin.site.register(Note)
admin.site.register(Reply)
admin.site.register(Profile)

