# Generated by Django 2.2.9 on 2020-03-27 23:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coronaApp', '0009_symptome'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reponseadittionnelle',
            old_name='libelle',
            new_name='valeur',
        ),
        migrations.RemoveField(
            model_name='choix',
            name='reponse',
        ),
    ]
