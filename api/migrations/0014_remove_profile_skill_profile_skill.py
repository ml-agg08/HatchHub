# Generated by Django 5.2 on 2025-04-12 04:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_rename_skill_skill_skillname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='skill',
        ),
        migrations.AddField(
            model_name='profile',
            name='skill',
            field=models.ManyToManyField(to='api.skill'),
        ),
    ]
