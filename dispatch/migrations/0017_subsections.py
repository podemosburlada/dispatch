# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-08-10 20:30

import dispatch.modules.content.mixins
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dispatch', '0016_breaking_news'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subsection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('slug', models.SlugField(unique=True)),
                ('description', models.TextField(null=True)),
                ('is_active', models.BooleanField(default=False)),
                ('authors', models.ManyToManyField(related_name='subsection_authors', to='dispatch.Author')),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dispatch.Section')),
            ],
            bases=(models.Model, dispatch.modules.content.mixins.AuthorMixin),
        ),
        migrations.AddField(
            model_name='article',
            name='subsection',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='article_subsection', to='dispatch.Subsection'),
        ),
    ]
