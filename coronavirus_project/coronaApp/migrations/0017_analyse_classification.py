# Generated by Django 2.2.9 on 2020-04-01 19:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('coronaApp', '0016_profile_classe'),
    ]

    operations = [
        migrations.AddField(
            model_name='analyse',
            name='classification',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='coronaApp.Classification'),
        ),
    ]
