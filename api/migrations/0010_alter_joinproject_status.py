# Generated by Django 5.2 on 2025-04-08 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_joinproject_approval_text_joinproject_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='joinproject',
            name='status',
            field=models.CharField(default='pending', max_length=10, null=True),
        ),
    ]
