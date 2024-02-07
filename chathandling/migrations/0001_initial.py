# Generated by Django 5.0.1 on 2024-02-06 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=2000)),
                ('sender', models.CharField(max_length=30)),
                ('date_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
