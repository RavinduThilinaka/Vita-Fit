from django.db import models

class Notification(models.Model):
    NOTIFICATION_TYPE = [
        ('Workout', 'Workout Reminder'),
        ('Diet', 'Diet Reminder'),
        ('Tip', 'Daily Tip'),
        ('General', 'General'),
    ]
    
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPE)
    scheduled_time = models.DateTimeField()
    is_sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title