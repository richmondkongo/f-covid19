# Generated by Django 2.2.9 on 2020-03-27 23:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coronaApp', '0010_auto_20200327_2320'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='type_reponse',
        ),
    ]