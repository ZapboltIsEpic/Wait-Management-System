# Generated by Django 4.2.11 on 2024-04-09 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Assistance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdTime', models.DateTimeField(auto_now_add=True)),
                ('table', models.IntegerField()),
                ('staffAcceptedTime', models.DateTimeField(null=True)),
                ('staffName', models.CharField(default='none', max_length=255)),
                ('tableStatus', models.BooleanField(default=False)),
            ],
        ),
    ]
