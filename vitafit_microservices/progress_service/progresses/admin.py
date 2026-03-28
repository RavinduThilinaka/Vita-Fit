from django.contrib import admin
from .models import Progress

@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    list_display = ('date', 'weight_kg', 'height_cm', 'bmi', 'calories_burned')
    list_filter = ('date',)
    search_fields = ('notes',)