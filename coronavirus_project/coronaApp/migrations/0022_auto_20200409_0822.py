# Generated by Django 2.2.9 on 2020-04-09 07:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('coronaApp', '0021_analyse_validation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='analyse',
            name='medecin',
            field=models.ForeignKey(default='0', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='medecin', to=settings.AUTH_USER_MODEL),
        ),
    ]
