# Generated by Django 2.2.9 on 2020-03-20 20:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coronaApp', '0005_auto_20200320_1540'),
    ]

    operations = [
        migrations.RenameField(
            model_name='analyse',
            old_name='Classification',
            new_name='classification',
        ),
    ]
