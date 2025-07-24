from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class ProjectAnalytics(models.Model):
    """
    Daily analytics data for projects
    """
    project = models.ForeignKey(
        'projects.ProjectIdea',
        on_delete=models.CASCADE,
        related_name='analytics'
    )
    date = models.DateField()

    # Daily metrics
    views = models.PositiveIntegerField(default=0)
    unique_views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    comments = models.PositiveIntegerField(default=0)
    shares = models.PositiveIntegerField(default=0)
    messages = models.PositiveIntegerField(default=0)

    # Traffic sources
    direct_traffic = models.PositiveIntegerField(default=0)
    search_traffic = models.PositiveIntegerField(default=0)
    social_traffic = models.PositiveIntegerField(default=0)
    referral_traffic = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'project_analytics'
        unique_together = ['project', 'date']
        ordering = ['-date']

    def __str__(self):
        return f"Analytics for {self.project.title} on {self.date}"


class UserEngagementMetrics(models.Model):
    """
    User engagement metrics and behavior tracking
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='engagement_metrics')
    date = models.DateField()

    # Activity metrics
    login_count = models.PositiveIntegerField(default=0)
    projects_viewed = models.PositiveIntegerField(default=0)
    projects_liked = models.PositiveIntegerField(default=0)
    comments_posted = models.PositiveIntegerField(default=0)
    messages_sent = models.PositiveIntegerField(default=0)
    search_queries = models.PositiveIntegerField(default=0)

    # Time metrics (in minutes)
    session_duration = models.PositiveIntegerField(default=0)
    page_views = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'user_engagement_metrics'
        unique_together = ['user', 'date']
        ordering = ['-date']

    def __str__(self):
        return f"Engagement for {self.user.email} on {self.date}"


class PlatformStatistics(models.Model):
    """
    Platform-wide statistics for public display
    """
    date = models.DateField()

    # Core metrics
    total_users = models.PositiveIntegerField(default=0)
    new_users = models.PositiveIntegerField(default=0)
    active_users = models.PositiveIntegerField(default=0)

    total_projects = models.PositiveIntegerField(default=0)
    published_projects = models.PositiveIntegerField(default=0)
    new_projects = models.PositiveIntegerField(default=0)

    total_comments = models.PositiveIntegerField(default=0)
    new_comments = models.PositiveIntegerField(default=0)

    total_likes = models.PositiveIntegerField(default=0)
    total_views = models.PositiveIntegerField(default=0)

    # Category distribution (JSON field)
    category_stats = models.JSONField(default=dict, blank=True)

    # Popular tags (JSON field)
    trending_tags = models.JSONField(default=list, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'platform_statistics'
        unique_together = ['date']
        ordering = ['-date']

    def __str__(self):
        return f"Platform stats for {self.date}"


class SearchQuery(models.Model):
    """
    Track search queries for analytics and improvement
    """
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='search_queries'
    )
    query = models.CharField(max_length=500)
    results_count = models.PositiveIntegerField(default=0)

    # Search context
    category_filter = models.CharField(max_length=100, blank=True)
    difficulty_filter = models.CharField(max_length=50, blank=True)
    tags_filter = models.JSONField(default=list, blank=True)

    # User interaction
    clicked_results = models.JSONField(default=list, blank=True)  # List of clicked project IDs
    session_id = models.CharField(max_length=100, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'search_queries'
        indexes = [
            models.Index(fields=['query', '-created_at']),
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['-created_at']),
        ]

    def __str__(self):
        return f"Search: '{self.query}' by {self.user.email if self.user else 'Anonymous'}"


class TrendingProject(models.Model):
    """
    Track trending projects for different time periods
    """
    TIMEFRAME_CHOICES = [
        ('day', 'Daily'),
        ('week', 'Weekly'),
        ('month', 'Monthly'),
        ('year', 'Yearly'),
    ]

    project = models.ForeignKey(
        'projects.ProjectIdea',
        on_delete=models.CASCADE,
        related_name='trending_records'
    )
    timeframe = models.CharField(max_length=10, choices=TIMEFRAME_CHOICES)
    period_start = models.DateTimeField()
    period_end = models.DateTimeField()

    # Trending metrics
    trend_score = models.FloatField()  # Calculated score based on various factors
    views_growth = models.FloatField(default=0.0)
    likes_growth = models.FloatField(default=0.0)
    comments_growth = models.FloatField(default=0.0)

    rank = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'trending_projects'
        unique_together = ['project', 'timeframe', 'period_start']
        ordering = ['timeframe', 'rank']

    def __str__(self):
        return f"Trending #{self.rank}: {self.project.title} ({self.timeframe})"
