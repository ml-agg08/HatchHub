# Generated by Django 5.1.7 on 2025-04-02 12:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_note_tag'),
    ]

    operations = [
        migrations.CreateModel(
            name='JoinProject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True, max_length=300, null=True)),
                ('Profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.profile')),
                ('note', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.note')),
            ],
        ),
    ]
