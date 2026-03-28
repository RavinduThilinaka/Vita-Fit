from django.contrib import admin
from .models import DietPlan

@admin.register(DietPlan)
class DietPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'meal_type', 'calories', 'protein', 'carbs', 'fats')
    list_filter = ('meal_type',)
    search_fields = ('name', 'description')