from django.contrib import admin
from .models import Message, MessageThread


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    """
    Message admin configuration
    """
    list_display = ('project', 'sender_display', 'recipient', 'message_type', 'is_read', 'is_spam', 'created_at')
    list_filter = ('message_type', 'is_read', 'is_archived', 'is_spam', 'created_at')
    search_fields = ('subject', 'content', 'sender__email', 'recipient__email', 'sender_email')
    readonly_fields = ('created_at', 'read_at')

    fieldsets = (
        ('Message Details', {
            'fields': ('project', 'subject', 'content', 'message_type')
        }),
        ('Sender Information', {
            'fields': ('sender', 'sender_name', 'sender_email')
        }),
        ('Recipient & Status', {
            'fields': ('recipient', 'is_read', 'is_archived', 'is_spam')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'read_at'),
            'classes': ('collapse',)
        }),
    )

    def sender_display(self, obj):
        """Display sender information"""
        if obj.sender:
            return obj.sender.email
        return f"{obj.sender_name} ({obj.sender_email})"
    sender_display.short_description = 'Sender'

    def mark_as_spam(self, request, queryset):
        """Bulk action to mark messages as spam"""
        queryset.update(is_spam=True)
        self.message_user(request, f"{queryset.count()} messages marked as spam.")
    mark_as_spam.short_description = "Mark selected messages as spam"

    def mark_as_read(self, request, queryset):
        """Bulk action to mark messages as read"""
        from django.utils import timezone
        queryset.update(is_read=True, read_at=timezone.now())
        self.message_user(request, f"{queryset.count()} messages marked as read.")
    mark_as_read.short_description = "Mark selected messages as read"

    actions = [mark_as_spam, mark_as_read]


@admin.register(MessageThread)
class MessageThreadAdmin(admin.ModelAdmin):
    """
    Message thread admin configuration
    """
    list_display = ('subject', 'project', 'participant_count', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('subject', 'project__title')
    readonly_fields = ('created_at', 'updated_at')
    filter_horizontal = ('participants',)

    def participant_count(self, obj):
        """Show number of participants in thread"""
        return obj.participants.count()
    participant_count.short_description = 'Participants'
