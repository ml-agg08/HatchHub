# Generated by Django 5.2 on 2025-04-12 02:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_skill'),
    ]

    operations = [
        migrations.RenameField(
            model_name='skill',
            old_name='skill',
            new_name='skillname',
        ),
    ]
