# Generated by Django 4.2.11 on 2024-03-11 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='table',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_number', models.IntegerField(blank=True)),
                ('table_in_use', models.BooleanField(blank=True)),
                ('seats_max', models.IntegerField(blank=True)),
                ('seats_in_use', models.IntegerField(blank=True)),
                ('is_near_window', models.BooleanField(blank=True)),
                ('is_quiet_area', models.BooleanField(blank=True)),
            ],
        ),
    ]
