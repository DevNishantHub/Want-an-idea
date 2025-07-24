from django.db import models
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()


class Category(models.Model):
    """
    Project categories for classification
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)  # CSS icon class
    color = models.CharField(max_length=7, default='#007bff')  # Hex color code
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'categories'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Tag(models.Model):
    """
    Tags for project classification and search
    """
    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=7, default='#6c757d')  # Hex color code
    usage_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'tags'
        ordering = ['-usage_count', 'name']

    def __str__(self):
        return self.name


class ProjectIdea(models.Model):
    """
    Main project idea model
    """
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('under_review', 'Under Review'),
        ('published', 'Published'),
        ('rejected', 'Rejected'),
        ('archived', 'Archived'),
    ]

    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('expert', 'Expert'),
    ]

    TIME_ESTIMATE_CHOICES = [
        ('1-7_days', '1-7 days'),
        ('1-2_weeks', '1-2 weeks'),
        ('1_month', '1 month'),
        ('2-3_months', '2-3 months'),
        ('6_months', '6+ months'),
        ('ongoing', 'Ongoing'),
    ]

    # Basic project information
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='projects')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    estimated_time = models.CharField(max_length=20, choices=TIME_ESTIMATE_CHOICES)

    # Technical details
    required_skills = models.JSONField(default=list, blank=True)  # List of required skills
    tech_stack = models.JSONField(default=list, blank=True)  # List of technologies
    resources = models.JSONField(default=list, blank=True)  # List of helpful resources

    # Project metadata
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    is_featured = models.BooleanField(default=False)
    is_open_for_inspiration = models.BooleanField(default=True)

    # User relationships
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authored_projects')
    tags = models.ManyToManyField(Tag, through='ProjectTag', related_name='projects')

    # Moderation fields
    moderator_notes = models.TextField(blank=True)
    reviewed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='reviewed_projects'
    )
    reviewed_at = models.DateTimeField(null=True, blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'project_ideas'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', '-created_at']),
            models.Index(fields=['category', 'status']),
            models.Index(fields=['difficulty', 'status']),
            models.Index(fields=['is_featured', 'status']),
        ]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('project-detail', kwargs={'pk': self.pk})


class ProjectTag(models.Model):
    """
    Many-to-many relationship between projects and tags
    """
    project = models.ForeignKey(ProjectIdea, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'project_tags'
        unique_together = ['project', 'tag']


class ProjectLike(models.Model):
    """
    User likes for projects
    """
    project = models.ForeignKey(ProjectIdea, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_projects')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'project_likes'
        unique_together = ['project', 'user']

    def __str__(self):
        return f"{self.user.email} likes {self.project.title}"


class ProjectView(models.Model):
    """
    Track project views for analytics
    """
    project = models.ForeignKey(ProjectIdea, on_delete=models.CASCADE, related_name='views')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    session_id = models.CharField(max_length=100, blank=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    referrer = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'project_views'
        indexes = [
            models.Index(fields=['project', '-created_at']),
            models.Index(fields=['ip_address', 'session_id']),
        ]

    def __str__(self):
        return f"View of {self.project.title} at {self.created_at}"


class ProjectStats(models.Model):
    """
    Aggregated statistics for projects
    """
    project = models.OneToOneField(ProjectIdea, on_delete=models.CASCADE, related_name='stats')
    view_count = models.PositiveIntegerField(default=0)
    like_count = models.PositiveIntegerField(default=0)
    comment_count = models.PositiveIntegerField(default=0)
    share_count = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'project_stats'

    def __str__(self):
        return f"Stats for {self.project.title}"
