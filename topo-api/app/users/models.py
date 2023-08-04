from django.contrib.auth.models import AbstractUser, Group
from django.db import models


class User(AbstractUser):
    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
            user_group = Group.objects.get(name="user")
            self.groups.add(user_group)
