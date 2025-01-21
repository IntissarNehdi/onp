from django.db import models

# Create your models here.


class ElectionOffice(models.Model):
    """
    Represents the election office authorized to make changes on the nomination lists.   
    """
    tu_id = models.CharField(max_length=10, primary_key=True) 
