from django.contrib import admin
from .models import Comment, CommentLike


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    """
    Comment admin configuration
    """
    list_display = ('project', 'author', 'content_preview', 'is_reply', 'is_flagged', 'created_at')
    list_filter = ('is_edited', 'is_deleted', 'moderator_deleted', 'is_flagged', 'created_at')
    search_fields = ('content', 'author__email', 'project__title')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Comment Details', {
            'fields': ('project', 'author', 'parent', 'content')
        }),
        ('Status', {
            'fields': ('is_edited', 'is_deleted', 'moderator_deleted')
        }),
        ('Moderation', {
            'fields': ('is_flagged', 'flag_reason'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def content_preview(self, obj):
        """Show a preview of the comment content"""
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content Preview'

    def is_reply(self, obj):
        """Show if this comment is a reply"""
        return obj.parent is not None
    is_reply.boolean = True
    is_reply.short_description = 'Is Reply'


@admin.register(CommentLike)
class CommentLikeAdmin(admin.ModelAdmin):
    """
    Comment like admin configuration
    """
    list_display = ('comment', 'user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('comment__content', 'user__email')
    readonly_fields = ('created_at',)
