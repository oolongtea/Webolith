# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('num_right', models.IntegerField(default=0)),
                ('num_wrong', models.IntegerField(default=0)),
                ('streak', models.IntegerField(default=0)),
                ('last_correct', models.DateTimeField(null=True)),
                ('last_quizzed', models.DateTimeField(null=True)),
                ('tag', models.CharField(max_length=140)),
                ('difficulty', models.IntegerField(default=0)),
                ('next_scheduled', models.DateTimeField(null=True)),
                ('box', models.IntegerField(default=0)),
                ('alphagram', models.ForeignKey(to='base.Alphagram')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='card',
            unique_together=set([('user', 'alphagram')]),
        ),
    ]
