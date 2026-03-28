from django.db import models

class Supplement(models.Model):
    CATEGORY_CHOICES = [
        ('Vitamin', 'Vitamin'),
        ('Mineral', 'Mineral'),
        ('Supplement', 'Supplement'),
    ]
    
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    dosage = models.CharField(max_length=100)
    benefits = models.TextField()
    side_effects = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name