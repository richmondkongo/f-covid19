# Generated by Django 2.2.9 on 2020-04-08 10:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('coronaApp', '0019_auto_20200404_1252'),
    ]

    operations = [
        migrations.AddField(
            model_name='analyse',
            name='medecin',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='medecin', to=settings.AUTH_USER_MODEL),
        ),
    ]
