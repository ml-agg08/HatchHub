# Generated by Django 5.1.7 on 2025-04-04 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_joinproject_profile_joinproject_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='joinproject',
            name='approval_text',
            field=models.TextField(max_length=300, null=True),
        ),
        migrations.AddField(
            model_name='joinproject',
            name='status',
            field=models.CharField(default='Pending', max_length=10, null=True),
        ),
    ]
