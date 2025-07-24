from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Comment(models.Model):
    """
    Comments on project ideas
    """
    project = models.ForeignKey(
        'projects.ProjectIdea',
        on_delete=models.CASCADE,
        related_name='comments'
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies'
    )

    content = models.TextField()
    is_edited = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    moderator_deleted = models.BooleanField(default=False)

    # Moderation fields
    is_flagged = models.BooleanField(default=False)
    flag_reason = models.CharField(max_length=100, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'comments'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['project', '-created_at']),
            models.Index(fields=['author', '-created_at']),
            models.Index(fields=['parent']),
        ]

    def __str__(self):
        return f"Comment by {self.author.email} on {self.project.title}"

    @property
    def is_reply(self):
        return self.parent is not None

    def get_replies(self):
        """Get all replies to this comment"""
        return self.replies.filter(is_deleted=False, moderator_deleted=False)


class CommentLike(models.Model):
    """
    User likes for comments
    """
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_comments')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'comment_likes'
        unique_together = ['comment', 'user']

    def __str__(self):
        return f"{self.user.email} likes comment {self.comment.id}"
