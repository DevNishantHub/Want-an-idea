from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserActivity


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Custom User admin configuration
    """
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_verified', 'is_staff', 'join_date')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'is_verified', 'join_date')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('-join_date',)

    # Add custom fields to the user editing form
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Profile Information', {
            'fields': ('profile_picture', 'bio', 'website', 'linkedin', 'github', 'skills', 'contact_preference')
        }),
        ('Platform Data', {
            'fields': ('preferences', 'stats', 'is_verified', 'last_login_ip')
        }),
    )

    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Profile Information', {
            'fields': ('email', 'profile_picture', 'bio')
        }),
    )


@admin.register(UserActivity)
class UserActivityAdmin(admin.ModelAdmin):
    """
    User activity admin configuration
    """
    list_display = ('user', 'activity_type', 'created_at', 'ip_address')
    list_filter = ('activity_type', 'created_at')
    search_fields = ('user__email', 'user__username', 'description')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    def has_add_permission(self, request):
        # Prevent manual creation of activity records
        return False
