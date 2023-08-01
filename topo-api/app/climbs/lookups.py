from django.db import models


class LowerCase(models.Transform):
    lookup_name = "lowercase"
    function = "LOWER"
    bilateral = True
