from django.contrib import admin
from .models import (
    ProjectAnalytics,
    UserEngagementMetrics,
    PlatformStatistics,
    SearchQuery,
    TrendingProject
)


@admin.register(ProjectAnalytics)
class ProjectAnalyticsAdmin(admin.ModelAdmin):
    """
    Project analytics admin configuration
    """
    list_display = ('project', 'date', 'views', 'unique_views', 'likes', 'comments', 'shares')
    list_filter = ('date',)
    search_fields = ('project__title',)
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'date'

    def has_add_permission(self, request):
        # Prevent manual creation of analytics records
        return False


@admin.register(UserEngagementMetrics)
class UserEngagementMetricsAdmin(admin.ModelAdmin):
    """
    User engagement metrics admin configuration
    """
    list_display = ('user', 'date', 'login_count', 'projects_viewed', 'projects_liked', 'session_duration')
    list_filter = ('date',)
    search_fields = ('user__email', 'user__username')
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'date'

    def has_add_permission(self, request):
        # Prevent manual creation of engagement records
        return False


@admin.register(PlatformStatistics)
class PlatformStatisticsAdmin(admin.ModelAdmin):
    """
    Platform statistics admin configuration
    """
    list_display = ('date', 'total_users', 'new_users', 'total_projects', 'new_projects', 'total_views')
    list_filter = ('date',)
    readonly_fields = ('created_at',)
    date_hierarchy = 'date'

    def has_add_permission(self, request):
        # Prevent manual creation of platform stats
        return False


@admin.register(SearchQuery)
class SearchQueryAdmin(admin.ModelAdmin):
    """
    Search query admin configuration
    """
    list_display = ('query', 'user', 'results_count', 'created_at')
    list_filter = ('created_at', 'results_count')
    search_fields = ('query', 'user__email')
    readonly_fields = ('created_at',)

    def has_add_permission(self, request):
        # Prevent manual creation of search records
        return False


@admin.register(TrendingProject)
class TrendingProjectAdmin(admin.ModelAdmin):
    """
    Trending project admin configuration
    """
    list_display = ('project', 'timeframe', 'rank', 'trend_score', 'period_start', 'period_end')
    list_filter = ('timeframe', 'period_start')
    search_fields = ('project__title',)
    readonly_fields = ('created_at',)

    def has_add_permission(self, request):
        # Prevent manual creation of trending records
        return False
