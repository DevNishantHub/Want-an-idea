# WantAnIdea Django Backend

This is the Django backend for the WantAnIdea project idea sharing platform. It provides REST APIs for user management, project ideas, comments, messaging, and analytics.

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Load initial data:**
   ```bash
   python manage.py loaddata projects/fixtures/initial_categories.json
   python manage.py loaddata projects/fixtures/initial_tags.json
   python manage.py create_sample_data
   ```

6. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/`

## Project Structure

```
backend/
├── wantanidea/          # Main Django project settings
├── users/               # User management app
├── projects/            # Project ideas management app
├── comments/            # Comments and engagement app
├── messaging/           # User-to-user messaging app
├── analytics/           # Analytics and reporting app
├── requirements.txt     # Python dependencies
├── manage.py           # Django management script
└── DATABASE_SCHEMA.md  # Database schema documentation
```

## Database Schema

The database schema includes the following main models:

### Users App
- **User**: Custom user model with profile information
- **UserActivity**: Track user activities for analytics

### Projects App
- **Category**: Project categories
- **Tag**: Project tags
- **ProjectIdea**: Main project idea model
- **ProjectLike**: User likes for projects
- **ProjectView**: Project view tracking
- **ProjectStats**: Aggregated project statistics

### Comments App
- **Comment**: Comments on projects (supports nested comments)
- **CommentLike**: User likes for comments

### Messaging App
- **Message**: Messages between users about projects
- **MessageThread**: Group related messages

### Analytics App
- **ProjectAnalytics**: Daily analytics for projects
- **UserEngagementMetrics**: User behavior tracking
- **PlatformStatistics**: Platform-wide statistics
- **SearchQuery**: Search query tracking
- **TrendingProject**: Trending projects tracking

## Admin Interface

Access the Django admin interface at `http://localhost:8000/admin/` using your superuser credentials.

## Sample Data

The system includes:
- 8 predefined categories
- 15 common tags
- Sample users and projects (created by `create_sample_data` command)

Default admin credentials (created by sample data):
- Email: admin@wantanidea.com
- Password: admin123

## API Endpoints (Future Implementation)

The database schema is designed to support the following API endpoints as defined in `backend.md`:

- Authentication & User Management
- Project Ideas Management
- Comments & Engagement
- Messaging
- Categories & Tags
- Search & Filtering
- Admin & Moderation
- Analytics & Statistics

## Development

### Running Tests
```bash
python manage.py test
```

### Making Model Changes
```bash
python manage.py makemigrations
python manage.py migrate
```

### Creating New Apps
```bash
python manage.py startapp appname
```

## Configuration

Key settings in `wantanidea/settings.py`:
- Database configuration (SQLite for development)
- Django REST Framework settings
- CORS configuration for React frontend
- Media files configuration
- Custom user model configuration

## Next Steps

1. Implement REST API views and serializers
2. Add authentication and authorization
3. Implement file upload handling
4. Add search and filtering capabilities
5. Implement real-time features
6. Add comprehensive testing
7. Set up production deployment

## Contributing

1. Follow Django best practices
2. Write tests for new features
3. Update documentation when making changes
4. Use meaningful commit messages

## License

This project is part of the WantAnIdea platform.
