from django.contrib.auth.models import AbstractUser
from django.db import models
import json


class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser
    """
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    website = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    skills = models.JSONField(default=list, blank=True)  # List of skills
    contact_preference = models.CharField(
        max_length=20,
        choices=[
            ('email', 'Email'),
            ('platform', 'Platform Messages'),
            ('both', 'Both'),
            ('none', 'None')
        ],
        default='platform'
    )

    # User preferences as JSON field
    preferences = models.JSONField(default=dict, blank=True)

    # User statistics as JSON field
    stats = models.JSONField(default=dict, blank=True)

    # Account status fields
    is_verified = models.BooleanField(default=False)
    join_date = models.DateTimeField(auto_now_add=True)
    last_login_ip = models.GenericIPAddressField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.email

    def get_default_preferences(self):
        """Return default user preferences"""
        return {
            'emailNotifications': True,
            'ideaRecommendations': True,
            'weeklyDigest': True,
            'profileVisibility': 'public'
        }

    def get_default_stats(self):
        """Return default user stats"""
        return {
            'ideasSubmitted': 0,
            'profileViews': 0,
            'inspirationCount': 0,
            'totalShares': 0
        }

    def save(self, *args, **kwargs):
        # Set default preferences and stats for new users
        if not self.preferences:
            self.preferences = self.get_default_preferences()
        if not self.stats:
            self.stats = self.get_default_stats()
        super().save(*args, **kwargs)


class UserActivity(models.Model):
    """
    Track user activities for analytics
    """
    ACTIVITY_TYPES = [
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('project_created', 'Project Created'),
        ('project_liked', 'Project Liked'),
        ('comment_posted', 'Comment Posted'),
        ('profile_updated', 'Profile Updated'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=50, choices=ACTIVITY_TYPES)
    description = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)  # Additional activity data
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user_activities'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.activity_type} at {self.created_at}"
