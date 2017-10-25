# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-12 19:56
from __future__ import unicode_literals

import django.db.models.deletion
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        ('orchestra', '0032_payrate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasktimer',
            name='assignment',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE,
                                    related_name='timers', to='orchestra.TaskAssignment'),
        ),
        migrations.AlterField(
            model_name='tasktimer',
            name='worker',
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, related_name='timer', to='orchestra.Worker'),
        ),
    ]
