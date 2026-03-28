from django.db import models

class Progress(models.Model):
    date = models.DateField()
    weight_kg = models.FloatField()
    height_cm = models.FloatField()
    bmi = models.FloatField(blank=True, null=True)
    calories_burned = models.IntegerField(default=0)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if self.height_cm > 0:
            height_m = self.height_cm / 100
            self.bmi = round(self.weight_kg / (height_m ** 2), 2)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Progress on {self.date}"