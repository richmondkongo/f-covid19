# Generated by Django 2.2.9 on 2020-03-18 20:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('coronaApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Maladie',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('deleted', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('libelle', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TypeConsigne',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('deleted', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('libelle', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='media',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Consigne',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('deleted', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('libelle', models.CharField(blank=True, max_length=255, null=True)),
                ('explication', models.CharField(blank=True, max_length=255, null=True)),
                ('maladie', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='coronaApp.Maladie')),
                ('type_consigne', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='coronaApp.TypeConsigne')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='question',
            name='maladie',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='coronaApp.Maladie'),
        ),
    ]