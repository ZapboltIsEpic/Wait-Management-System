# Generated by Django 5.0.3 on 2024-04-05 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_rename_table_number_billrequest_table_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='wait_staff_assigned',
            field=models.CharField(default='none', max_length=255),
        ),
    ]