# Generated by Django 2.2.9 on 2020-03-31 19:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('coronaApp', '0015_auto_20200331_0242'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='classe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='coronaApp.Classification'),
        ),
    ]
