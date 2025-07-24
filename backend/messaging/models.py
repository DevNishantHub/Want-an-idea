from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Message(models.Model):
    """
    Messages between users about projects
    """
    MESSAGE_TYPES = [
        ('inquiry', 'Project Inquiry'),
        ('collaboration', 'Collaboration Request'),
        ('feedback', 'Feedback'),
        ('general', 'General Message'),
    ]

    # Project context
    project = models.ForeignKey(
        'projects.ProjectIdea',
        on_delete=models.CASCADE,
        related_name='messages'
    )

    # User relationships
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages',
        null=True,
        blank=True  # Allow anonymous messages
    )
    recipient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_messages'
    )

    # Message content
    subject = models.CharField(max_length=200, blank=True)
    content = models.TextField()
    message_type = models.CharField(max_length=20, choices=MESSAGE_TYPES, default='general')

    # Anonymous sender fields (for non-registered users)
    sender_name = models.CharField(max_length=100, blank=True)
    sender_email = models.EmailField(blank=True)

    # Message status
    is_read = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    is_spam = models.BooleanField(default=False)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'messages'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['recipient', 'is_read', '-created_at']),
            models.Index(fields=['project', '-created_at']),
            models.Index(fields=['sender', '-created_at']),
        ]

    def __str__(self):
        sender_name = self.sender.email if self.sender else self.sender_email
        return f"Message from {sender_name} to {self.recipient.email}"

    @property
    def sender_display_name(self):
        """Get the display name for the message sender"""
        if self.sender:
            return self.sender.get_full_name() or self.sender.email
        return self.sender_name or self.sender_email

    def mark_as_read(self):
        """Mark message as read"""
        if not self.is_read:
            self.is_read = True
            self.read_at = models.functions.Now()
            self.save(update_fields=['is_read', 'read_at'])


class MessageThread(models.Model):
    """
    Group related messages into threads
    """
    project = models.ForeignKey(
        'projects.ProjectIdea',
        on_delete=models.CASCADE,
        related_name='message_threads'
    )
    participants = models.ManyToManyField(User, related_name='message_threads')
    subject = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'message_threads'
        ordering = ['-updated_at']

    def __str__(self):
        return f"Thread: {self.subject}"
