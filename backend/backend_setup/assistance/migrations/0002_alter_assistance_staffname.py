# Generated by Django 5.0.3 on 2024-04-01 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assistance', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assistance',
            name='staffName',
            field=models.CharField(default='', max_length=255),
        ),
    ]
