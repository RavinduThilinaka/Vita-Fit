from django.db import models

class DietPlan(models.Model):
    MEAL_CHOICES = [
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Dinner', 'Dinner'),
        ('Snack', 'Snack'),
    ]
    
    meal_type = models.CharField(max_length=20, choices=MEAL_CHOICES)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    calories = models.IntegerField()
    protein = models.FloatField(default=0)
    carbs = models.FloatField(default=0)
    fats = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.meal_type}: {self.name}"