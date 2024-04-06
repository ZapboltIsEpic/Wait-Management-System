# Generated by Django 5.0.3 on 2024-04-05 04:52

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assistance', '0002_alter_assistance_staffname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assistance',
            name='tableNumber',
        ),
        migrations.AddField(
            model_name='assistance',
            name='createdTime',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='assistance',
            name='table',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]