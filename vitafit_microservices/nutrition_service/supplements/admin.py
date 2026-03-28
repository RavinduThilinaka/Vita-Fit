from django.contrib import admin
from .models import Supplement

@admin.register(Supplement)
class SupplementAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'dosage')
    list_filter = ('category',)
    search_fields = ('name', 'benefits')