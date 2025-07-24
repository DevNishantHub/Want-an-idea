from django.contrib import admin
from .models import Category, Tag, ProjectIdea, ProjectTag, ProjectLike, ProjectView, ProjectStats


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Category admin configuration
    """
    list_display = ('name', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'name': ('name',)}


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    """
    Tag admin configuration
    """
    list_display = ('name', 'usage_count', 'color', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name',)
    readonly_fields = ('usage_count',)
    ordering = ('-usage_count', 'name')


class ProjectTagInline(admin.TabularInline):
    """
    Inline admin for project tags
    """
    model = ProjectTag
    extra = 1


@admin.register(ProjectIdea)
class ProjectIdeaAdmin(admin.ModelAdmin):
    """
    Project idea admin configuration
    """
    list_display = ('title', 'author', 'category', 'status', 'difficulty', 'is_featured', 'created_at')
    list_filter = ('status', 'difficulty', 'category', 'is_featured', 'is_open_for_inspiration', 'created_at')
    search_fields = ('title', 'description', 'author__email', 'author__username')
    readonly_fields = ('created_at', 'updated_at', 'published_at')
    inlines = [ProjectTagInline]

    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'author', 'category')
        }),
        ('Technical Details', {
            'fields': ('difficulty', 'estimated_time', 'required_skills', 'tech_stack', 'resources')
        }),
        ('Status & Settings', {
            'fields': ('status', 'is_featured', 'is_open_for_inspiration')
        }),
        ('Moderation', {
            'fields': ('moderator_notes', 'reviewed_by', 'reviewed_at'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'published_at'),
            'classes': ('collapse',)
        }),
    )

    def save_model(self, request, obj, form, change):
        """
        Auto-assign reviewer and review timestamp for status changes
        """
        if change and 'status' in form.changed_data:
            if obj.status in ['published', 'rejected']:
                obj.reviewed_by = request.user
                from django.utils import timezone
                obj.reviewed_at = timezone.now()
                if obj.status == 'published' and not obj.published_at:
                    obj.published_at = timezone.now()
        super().save_model(request, obj, form, change)


@admin.register(ProjectLike)
class ProjectLikeAdmin(admin.ModelAdmin):
    """
    Project like admin configuration
    """
    list_display = ('project', 'user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('project__title', 'user__email')
    readonly_fields = ('created_at',)


@admin.register(ProjectView)
class ProjectViewAdmin(admin.ModelAdmin):
    """
    Project view admin configuration
    """
    list_display = ('project', 'user', 'ip_address', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('project__title', 'user__email', 'ip_address')
    readonly_fields = ('created_at',)

    def has_add_permission(self, request):
        # Prevent manual creation of view records
        return False


@admin.register(ProjectStats)
class ProjectStatsAdmin(admin.ModelAdmin):
    """
    Project stats admin configuration
    """
    list_display = ('project', 'view_count', 'like_count', 'comment_count', 'share_count', 'last_updated')
    readonly_fields = ('last_updated',)
    search_fields = ('project__title',)

    def has_add_permission(self, request):
        # Prevent manual creation of stats records
        return False
