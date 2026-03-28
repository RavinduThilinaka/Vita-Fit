from django.contrib import admin
from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'notification_type', 'scheduled_time', 'is_sent')
    list_filter = ('notification_type', 'is_sent')
    search_fields = ('title', 'message')