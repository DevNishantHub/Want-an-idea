# WantAnIdea Django Backend - Database Schema Documentation

## Overview
This Django backend implements the database schema requirements for the WantAnIdea project idea sharing platform. The database is designed to support user management, project ideas, comments, messaging, and analytics.

## Database Models

### 1. User Management (`users` app)

#### User Model
- **Table**: `users`
- **Extends**: Django's AbstractUser
- **Key Features**:
  - Email-based authentication (unique email field)
  - Profile information (bio, website, social links)
  - Skills as JSON field
  - User preferences as JSON field
  - User statistics as JSON field
  - Account verification status
  - Profile picture upload support

#### UserActivity Model
- **Table**: `user_activities`
- **Purpose**: Track user activities for analytics
- **Key Fields**: user, activity_type, description, ip_address, metadata, created_at

### 2. Project Ideas Management (`projects` app)

#### Category Model
- **Table**: `categories`
- **Purpose**: Organize projects into categories
- **Key Fields**: name, description, icon, color, is_active

#### Tag Model
- **Table**: `tags`
- **Purpose**: Tagging system for projects
- **Key Fields**: name, color, usage_count

#### ProjectIdea Model
- **Table**: `project_ideas`
- **Purpose**: Main project idea storage
- **Key Features**:
  - Status workflow (draft, under_review, published, rejected, archived)
  - Difficulty levels (beginner, intermediate, advanced, expert)
  - Time estimates
  - Required skills and tech stack as JSON fields
  - Resources as JSON field
  - Moderation fields
  - Many-to-many relationship with tags

#### ProjectTag Model (Through Table)
- **Table**: `project_tags`
- **Purpose**: Many-to-many relationship between projects and tags

#### ProjectLike Model
- **Table**: `project_likes`
- **Purpose**: User likes for projects
- **Constraint**: Unique together (project, user)

#### ProjectView Model
- **Table**: `project_views`
- **Purpose**: Track project views for analytics
- **Key Fields**: project, user, session_id, ip_address, user_agent, referrer

#### ProjectStats Model
- **Table**: `project_stats`
- **Purpose**: Aggregated statistics for projects
- **Key Fields**: view_count, like_count, comment_count, share_count

### 3. Comments & Engagement (`comments` app)

#### Comment Model
- **Table**: `comments`
- **Purpose**: Comments on project ideas
- **Key Features**:
  - Nested comments (self-referencing parent field)
  - Moderation flags
  - Soft delete functionality
  - Edit tracking

#### CommentLike Model
- **Table**: `comment_likes`
- **Purpose**: User likes for comments
- **Constraint**: Unique together (comment, user)

### 4. Messaging (`messaging` app)

#### Message Model
- **Table**: `messages`
- **Purpose**: Messages between users about projects
- **Key Features**:
  - Support for anonymous senders
  - Message types (inquiry, collaboration, feedback, general)
  - Read status tracking
  - Spam filtering
  - Archive functionality

#### MessageThread Model
- **Table**: `message_threads`
- **Purpose**: Group related messages into threads
- **Key Features**: Many-to-many relationship with participants

### 5. Analytics & Reporting (`analytics` app)

#### ProjectAnalytics Model
- **Table**: `project_analytics`
- **Purpose**: Daily analytics data for projects
- **Key Fields**: Daily metrics, traffic sources

#### UserEngagementMetrics Model
- **Table**: `user_engagement_metrics`
- **Purpose**: User engagement metrics and behavior tracking
- **Key Fields**: Activity metrics, session data

#### PlatformStatistics Model
- **Table**: `platform_statistics`
- **Purpose**: Platform-wide statistics for public display
- **Key Fields**: Core metrics, category distribution, trending tags

#### SearchQuery Model
- **Table**: `search_queries`
- **Purpose**: Track search queries for analytics
- **Key Fields**: query, filters, user interaction data

#### TrendingProject Model
- **Table**: `trending_projects`
- **Purpose**: Track trending projects for different time periods
- **Key Fields**: timeframe, trend_score, growth metrics, rank

## Key Relationships

1. **User → ProjectIdea**: One-to-many (author relationship)
2. **User → Comment**: One-to-many (author relationship)
3. **User → Message**: One-to-many (sender/recipient relationships)
4. **ProjectIdea → Category**: Many-to-one
5. **ProjectIdea → Tag**: Many-to-many (through ProjectTag)
6. **ProjectIdea → Comment**: One-to-many
7. **Comment → Comment**: Self-referencing (parent-child for nested comments)

## Indexes and Constraints

- Unique constraints on email (User), project-user combinations (ProjectLike, CommentLike)
- Database indexes on frequently queried fields (status, created_at, category, etc.)
- Foreign key constraints with appropriate cascade rules

## Initial Data

The system includes fixtures for:
- 8 predefined categories (Technology, Health & Wellness, Education, etc.)
- 15 common tags (React, Python, JavaScript, Machine Learning, etc.)
- Sample users and projects for development

## Admin Interface

All models are registered in Django admin with:
- Custom list displays
- Filtering and search capabilities
- Inline editing for related models
- Bulk actions for common operations
- Read-only fields for auto-generated data

## Usage

1. Install dependencies: `pip install -r requirements.txt`
2. Run migrations: `python manage.py migrate`
3. Load fixtures: `python manage.py loaddata projects/fixtures/initial_categories.json projects/fixtures/initial_tags.json`
4. Create sample data: `python manage.py create_sample_data`
5. Create superuser: `python manage.py createsuperuser`
6. Run development server: `python manage.py runserver`

## Next Steps

This schema implementation provides the foundation for:
- REST API development with Django REST Framework
- Authentication and authorization
- File upload handling
- Search and filtering capabilities
- Analytics and reporting features

The schema follows Django best practices and is ready for API development and frontend integration.
