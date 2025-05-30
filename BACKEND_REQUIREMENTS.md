# WantAnIdea Backend Requirements

## Overview
This document outlines all the backend requirements for the WantAnIdea project idea sharing platform. The backend should be built using Spring Boot and provide REST APIs for all frontend functionality.

## Database Schema Requirements

### 1. User Management
#### User Entity
```sql
users {
    id: Long (Primary Key, Auto-generated)
    email: String (Unique, Not Null)
    password: String (Encrypted, Not Null)
    name: String (Not Null) -- Combined full name from frontend
    firstName: String (Optional) -- For advanced signup options
    lastName: String (Optional) -- For advanced signup options
    profilePicture: String (URL/Path, Optional)
    role: Enum (USER, ADMIN, MODERATOR)
    isActive: Boolean (Default: true)
    isVerified: Boolean (Default: false) -- Matches frontend emailVerified
    joinDate: Timestamp -- Matches frontend joinDate format
    createdAt: Timestamp
    updatedAt: Timestamp
    lastLoginAt: Timestamp
    bio: Text (Optional)
    website: String (Optional)
    linkedin: String (Optional)
    github: String (Optional)
    skills: Text (JSON Array of skills)
    contactPreference: Enum (EMAIL, PLATFORM_MESSAGES, NONE)
    
    -- User Preferences (JSON structure to match frontend)
    preferences: Text (JSON) -- {emailNotifications, ideaRecommendations, weeklyDigest, profileVisibility}
    
    -- User Statistics (JSON structure to match frontend)
    stats: Text (JSON) -- {ideasSubmitted, profileViews, inspirationCount, totalShares}
}
```

### 2. Project Ideas Management
#### ProjectIdea Entity
```sql
project_ideas {
    id: Long (Primary Key, Auto-generated)
    title: String (Not Null, Max 255 chars)
    description: Text (Not Null, Min 50 chars)
    category: Enum (TECHNOLOGY, HEALTH, EDUCATION, ENVIRONMENT, ENTERTAINMENT, COMMUNITY, BUSINESS, LIFESTYLE)
    difficulty: Enum (BEGINNER, INTERMEDIATE, ADVANCED)
    estimatedTime: String (1-2 hours, 3-5 hours, 1-2 days, 1 week, 2-4 weeks, 1-2 months, 3-6 months, 6+ months)
    status: Enum (DRAFT, UNDER_REVIEW, PUBLISHED, REJECTED, ARCHIVED)
    submitterId: Long (Foreign Key to users.id)
    submittedAt: Timestamp
    publishedAt: Timestamp (Optional)
    lastUpdatedAt: Timestamp
    viewCount: Long (Default: 0)
    likeCount: Long (Default: 0)    commentCount: Long (Default: 0)
    requiredSkills: Text (Comma-separated skills)
    techStack: Text (JSON Array of technologies)
    resources: Text (Links, articles, references)
    projectTimeline: Text (JSON Array of phases)
    isOpenForInspiration: Boolean (Default: true)
    rejectionReason: Text (Optional)
    featuredAt: Timestamp (Optional, for featured projects)
    moderatorNotes: Text (Optional, admin/moderator use)
}
```

#### ProjectTags Entity (Many-to-Many relationship)
```sql
project_tags {
    id: Long (Primary Key, Auto-generated)
    projectId: Long (Foreign Key to project_ideas.id)
    tagId: Long (Foreign Key to tags.id)
}

tags {
    id: Long (Primary Key, Auto-generated)
    name: String (Unique, Not Null)
    color: String (Hex color code)
    createdAt: Timestamp
    usageCount: Long (Default: 0)
}
```

### 3. Engagement & Social Features
#### ProjectLikes Entity
```sql
project_likes {
    id: Long (Primary Key, Auto-generated)
    projectId: Long (Foreign Key to project_ideas.id)
    userId: Long (Foreign Key to users.id)
    likedAt: Timestamp
    UNIQUE(projectId, userId)
}
```

#### ProjectViews Entity
```sql
project_views {
    id: Long (Primary Key, Auto-generated)
    projectId: Long (Foreign Key to project_ideas.id)
    userId: Long (Foreign Key to users.id, Optional for anonymous views)
    ipAddress: String (For anonymous tracking)
    viewedAt: Timestamp
    sessionId: String (For tracking unique sessions)
}
```

#### Comments Entity
```sql
comments {
    id: Long (Primary Key, Auto-generated)
    projectId: Long (Foreign Key to project_ideas.id)
    userId: Long (Foreign Key to users.id)
    parentCommentId: Long (Foreign Key to comments.id, Optional for replies)
    content: Text (Not Null)
    isEdited: Boolean (Default: false)
    editedAt: Timestamp (Optional)
    createdAt: Timestamp
    likeCount: Long (Default: 0)
    isDeleted: Boolean (Default: false)
    moderatorDeleted: Boolean (Default: false)
}
```

### 4. Messaging
#### Messages Entity
```sql
messages {
    id: Long (Primary Key, Auto-generated)
    projectId: Long (Foreign Key to project_ideas.id)
    senderId: Long (Foreign Key to users.id)
    senderName: String (For non-registered users)
    senderEmail: String (For non-registered users)
    recipientId: Long (Foreign Key to users.id, project owner)
    subject: String (Optional)
    content: Text (Not Null)    messageType: Enum (GENERAL_INQUIRY, FEEDBACK)
    isRead: Boolean (Default: false)
    readAt: Timestamp (Optional)
    sentAt: Timestamp
    isArchived: Boolean (Default: false)
    isSpam: Boolean (Default: false)
}
```

### 5. Categories & Classification
#### Categories Entity
```sql
categories {
    id: Long (Primary Key, Auto-generated)
    name: String (Unique, Not Null)
    description: Text
    icon: String (Icon name or Unicode)
    color: String (Hex color code)
    isActive: Boolean (Default: true)
    projectCount: Long (Default: 0)
    createdAt: Timestamp
}
```

### 6. Analytics & Reporting
#### UserActivity Entity
```sql
user_activities {
    id: Long (Primary Key, Auto-generated)
    userId: Long (Foreign Key to users.id)
    activityType: Enum (LOGIN, LOGOUT, PROJECT_SUBMIT, PROJECT_VIEW, PROJECT_LIKE, COMMENT_POST, MESSAGE_SEND)
    targetId: Long (Optional, ID of the target entity)
    targetType: String (Optional, type of target entity)
    metadata: Text (JSON, additional activity data)
    ipAddress: String
    userAgent: String
    createdAt: Timestamp
}
```

#### ProjectStats Entity
```sql
project_stats {
    id: Long (Primary Key, Auto-generated)
    projectId: Long (Foreign Key to project_ideas.id)
    date: Date    viewCount: Long (Default: 0)
    likeCount: Long (Default: 0)
    commentCount: Long (Default: 0)
    shareCount: Long (Default: 0)
}
```

## API Endpoints

### 1. Authentication & User Management

#### Auth Controller
```
POST /api/auth/register
- Request Body: { email, password, confirmPassword, name?, firstName?, lastName?, fullName? }
- Response: { user: { id, email, name, profilePicture?, joinDate, isVerified, preferences, stats }, token, refreshToken }
- Notes: Frontend supports both simple (name/fullName) and advanced (firstName/lastName) signup flows

POST /api/auth/login
- Request Body: { email, password }
- Response: { user: { id, email, name, profilePicture?, joinDate, isVerified, preferences, stats }, token, refreshToken }
- Notes: Response format matches frontend AuthContext user structure

POST /api/auth/logout
- Headers: Authorization Bearer token
- Response: 204 No Content

POST /api/auth/refresh
- Request Body: { refreshToken }
- Response: { token, refreshToken }

POST /api/auth/forgot-password
- Request Body: { email }
- Response: 200 OK

POST /api/auth/reset-password
- Request Body: { token, newPassword }
- Response: 200 OK

POST /api/auth/verify-email
- Request Body: { verificationToken }
- Response: 200 OK

POST /api/auth/resend-verification
- Request Body: { email }
- Response: 200 OK

POST /api/auth/social/google
- Request Body: { googleToken }
- Response: { user: { id, email, name, profilePicture?, joinDate, isVerified, preferences, stats }, token, refreshToken }
- Notes: Creates user with default preferences and stats if new account

POST /api/auth/social/github
- Request Body: { githubCode }
- Response: { user: { id, email, name, profilePicture?, joinDate, isVerified, preferences, stats }, token, refreshToken }
- Notes: Creates user with default preferences and stats if new account

POST /api/auth/social/linkedin
- Request Body: { linkedinCode }
- Response: { user: { id, email, name, profilePicture?, joinDate, isVerified, preferences, stats }, token, refreshToken }
- Notes: Creates user with default preferences and stats if new account
```

#### User Controller
```
GET /api/users/profile
- Headers: Authorization Bearer token
- Response: Complete user profile data matching frontend AuthContext structure
- Format: { id, email, name, profilePicture?, joinDate, isVerified, preferences, stats, bio?, website?, linkedin?, github?, skills?, contactPreference? }

PUT /api/users/profile
- Headers: Authorization Bearer token
- Request Body: { name?, firstName?, lastName?, bio?, website?, linkedin?, github?, skills?, contactPreference? }
- Response: Updated user data in same format as GET /api/users/profile
- Notes: Frontend shows direct account management page at /account route

PUT /api/users/preferences
- Headers: Authorization Bearer token
- Request Body: { emailNotifications?, ideaRecommendations?, weeklyDigest?, profileVisibility? }
- Response: Updated user preferences
- Notes: Frontend preferences: emailNotifications, ideaRecommendations, weeklyDigest, profileVisibility

POST /api/users/upload-avatar
- Headers: Authorization Bearer token
- Request Body: Multipart file
- Response: { profilePictureUrl }

GET /api/users/{userId}/public-profile
- Response: Public user profile data (respects profileVisibility preference)

GET /api/users/me/stats
- Headers: Authorization Bearer token
- Response: { ideasSubmitted, profileViews, inspirationCount, totalShares }
- Notes: Stats structure matches frontend user.stats object

PUT /api/users/me/stats
- Headers: Authorization Bearer token
- Request Body: { ideasSubmitted?, profileViews?, inspirationCount?, totalShares? }
- Response: Updated stats
- Notes: Used for incrementing stats when user performs actions

GET /api/users/me/account
- Headers: Authorization Bearer token
- Response: Complete account information for /account page
- Format: Includes profile, preferences, stats, recent activity, and account settings
```

#### Default User Data Structures (Frontend Implementation Alignment)

**Default User Preferences Structure:**
```json
{
  "emailNotifications": true,
  "ideaRecommendations": true, 
  "weeklyDigest": true,
  "profileVisibility": "public"
}
```

**Default User Stats Structure:**
```json
{
  "ideasSubmitted": 0,
  "profileViews": 0,
  "inspirationCount": 0,
  "totalShares": 0
}
```

**Authentication Response Format (matches frontend AuthContext):**
```json
{
  "user": {
    "id": 12345,
    "email": "user@example.com",
    "name": "John Doe",
    "profilePicture": "https://example.com/avatar.jpg", // Optional
    "joinDate": "2025-05-27T10:30:00.000Z",
    "isVerified": false,
    "preferences": {
      "emailNotifications": true,
      "ideaRecommendations": true,
      "weeklyDigest": true,
      "profileVisibility": "public"
    },
    "stats": {
      "ideasSubmitted": 0,
      "profileViews": 0,
      "inspirationCount": 0,
      "totalShares": 0
    }
  },
  "token": "jwt-token-here",
  "refreshToken": "refresh-token-here"
}
```

**Frontend Navigation Notes:**
- Authentication redirects to `/account` page (not a dropdown menu)
- Direct account page navigation from navbar user profile button
- No dropdown menu in navbar - users click profile button to go to account page
```

### 2. Project Ideas Management

#### Projects Controller
```
GET /api/projects
- Query Params: ?page=0&size=20&category=TECHNOLOGY&difficulty=BEGINNER&search=garden&sortBy=newest
- Response: Page<ProjectIdea>

GET /api/projects/{id}
- Response: ProjectIdea with full details

POST /api/projects
- Headers: Authorization Bearer token
- Request Body: { title, description, category, difficulty, estimatedTime, requiredSkills, tags, techStack, resources, isOpenForInspiration, contactPreference }
- Response: Created ProjectIdea

PUT /api/projects/{id}
- Headers: Authorization Bearer token
- Request Body: Project update data
- Response: Updated ProjectIdea
- Access Control: Only project owner can edit their own projects
- Business Rules: See "Project Edit Functionality" section below

DELETE /api/projects/{id}
- Headers: Authorization Bearer token
- Response: 204 No Content

GET /api/projects/{id}/stats
- Response: { views, likes, comments, shares }

POST /api/projects/{id}/like
- Headers: Authorization Bearer token
- Response: { liked: true/false, totalLikes }

POST /api/projects/{id}/view
- Headers: Optional Authorization Bearer token
- Request Body: { sessionId, ipAddress }
- Response: 200 OK

GET /api/projects/featured
- Response: List of featured projects

GET /api/projects/trending
- Query Params: ?timeframe=WEEK&limit=10
- Response: List of trending projects

GET /api/projects/similar/{id}
- Response: List of similar projects
```

### Project Edit Functionality Requirements

#### Business Rules for Project Editing

**1. Access Control**
- Users can only edit projects they submitted
- Admins/Moderators can edit any project for moderation purposes
- Project ID must exist and be accessible to the requesting user
- Authentication required for all edit operations

**2. Status-Based Edit Permissions**
```
DRAFT: Full editing allowed
- All fields can be modified
- No restrictions on content changes
- Can save as draft or submit for review

UNDER_REVIEW: Limited editing allowed
- Can edit all content fields (title, description, etc.)
- Cannot change status (admin/moderator only)
- Editing resets review timer but keeps UNDER_REVIEW status
- Moderator notification sent when edited during review

PUBLISHED: Controlled editing allowed
- Can edit: description, resources, timeline, inspiration settings
- Cannot edit: title, category, difficulty (requires re-review)
- Major changes may require re-review (admin configurable)
- Edit history tracked for transparency

REJECTED: Full editing allowed
- All fields can be modified to address rejection reasons
- Editing and resubmitting changes status to UNDER_REVIEW
- Previous rejection reason preserved in history
- Resubmission counter incremented

ARCHIVED: No editing allowed
- Projects marked as archived cannot be edited
- Must be unarchived first (admin action)
```

**3. Field-Level Edit Validation**
```
Title: 
- Required, 5-255 characters
- Cannot be empty or contain only whitespace
- Profanity filter applied

Description:
- Required, minimum 50 characters
- Maximum 5000 characters
- HTML sanitization applied
- Link validation for external references

Category & Difficulty:
- Must be valid enum values
- Cannot be changed for PUBLISHED projects without admin approval

Tags:
- Maximum 10 tags per project
- Each tag 2-30 characters
- Automatic tag creation if doesn't exist

Skills & Tech Stack:
- Comma-separated or JSON array format
- Validation against predefined skill list
- Maximum 20 skills/technologies

Inspiration Settings:
- isOpenForInspiration: boolean (allows others to build upon the idea)
```

**4. Edit Impact on Engagement Data**
```
Views: Preserved (historical data)
Likes: Preserved (users who liked keep their likes)
Comments: Preserved (comments stay linked to project)
Messages: Preserved (messages stay linked to project)
Analytics: Edit timestamp recorded, historical data maintained
```

**5. Review Process for Edited Projects**
```
Minor Edits (No re-review required):
- Description updates
- Resource links
- Timeline adjustments
- Inspiration settings

Major Edits (Re-review required):
- Title changes
- Category changes
- Difficulty changes
- Significant description overhaul (admin configurable threshold)

Auto-Detection Rules:
- Character change threshold: >50% of original content
- Category/difficulty changes always trigger review
- Title changes always trigger review
- Admin can configure sensitivity settings
```

**6. Edit History & Audit Trail**
```
project_edit_history {
    id: Long (Primary Key)
    projectId: Long (Foreign Key)
    userId: Long (Editor ID)
    editedAt: Timestamp
    changeType: Enum (MINOR_EDIT, MAJOR_EDIT, STATUS_CHANGE)
    fieldsChanged: JSON (List of modified fields)
    oldValues: JSON (Previous field values)
    newValues: JSON (New field values)
    editReason: String (Optional, user-provided reason)
    triggerReview: Boolean (Whether edit triggered re-review)
}
```

#### API Endpoints for Edit Functionality

```
GET /api/projects/{id}/edit
- Headers: Authorization Bearer token
- Response: ProjectIdea with edit permissions and constraints
- Access Control: Project owner only
- Additional Fields: { canEdit: boolean, editConstraints: {}, lastEdited: timestamp }

PUT /api/projects/{id}
- Headers: Authorization Bearer token
- Request Body: Full or partial project update
- Response: { success: boolean, project: ProjectIdea, warnings: [], needsReview: boolean }
- Validation: Field-level validation based on current status
- Side Effects: May change status, send notifications, create audit record

GET /api/projects/{id}/edit-history
- Headers: Authorization Bearer token
- Query Params: ?page=0&size=20
- Response: Page<EditHistory>
- Access Control: Project owner or admin only

POST /api/projects/{id}/resubmit
- Headers: Authorization Bearer token
- Response: { success: boolean, newStatus: string }
- Business Logic: Changes REJECTED or DRAFT to UNDER_REVIEW
- Validation: Ensures required fields are complete
```

#### Error Handling for Edit Operations

```
400 Bad Request:
- Invalid field values
- Business rule violations
- Status transition not allowed

403 Forbidden:
- User doesn't own the project
- Edit operation not allowed for current status
- Missing required permissions

404 Not Found:
- Project doesn't exist
- Project is archived/deleted

409 Conflict:
- Project was modified by another process
- Concurrent edit detected
- Status changed during edit

422 Unprocessable Entity:
- Validation errors
- Field constraints violated
- Content moderation flags

Example Error Response:
{
  "error": "EDIT_NOT_ALLOWED",
  "message": "Cannot edit published projects title without admin approval",
  "details": {
    "field": "title",
    "currentStatus": "PUBLISHED",
    "requiredRole": "ADMIN",
    "suggestion": "Contact administrator for title changes"
  }
}
```

#### Notification System for Edits

```
User Notifications:
- Edit saved successfully
- Edit triggered re-review process
- Edit rejected due to business rules
- Project approved after edit-triggered review

Admin/Moderator Notifications:
- Project edited during review period
- Major edit requiring re-review
- Multiple edits in short timeframe (potential spam)

Email Templates:
- edit_confirmation.html
- edit_review_required.html
- edit_approved.html
- edit_rejected.html
```

### 3. Comments & Engagement

#### Comments Controller
```
GET /api/projects/{projectId}/comments
- Query Params: ?page=0&size=20&sortBy=newest
- Response: Page<Comment>

POST /api/projects/{projectId}/comments
- Headers: Authorization Bearer token
- Request Body: { content, parentCommentId? }
- Response: Created Comment

PUT /api/comments/{id}
- Headers: Authorization Bearer token
- Request Body: { content }
- Response: Updated Comment

DELETE /api/comments/{id}
- Headers: Authorization Bearer token
- Response: 204 No Content

POST /api/comments/{id}/like
- Headers: Authorization Bearer token
- Response: { liked: true/false, totalLikes }
```

### 4. Messaging

#### Messages Controller
```
POST /api/projects/{projectId}/contact
- Request Body: { senderName?, senderEmail?, content, messageType }
- Headers: Optional Authorization Bearer token
- Response: Created Message

GET /api/users/me/messages
- Headers: Authorization Bearer token
- Query Params: ?isRead=false&page=0&size=20
- Response: Page<Message>

PUT /api/messages/{id}/read
- Headers: Authorization Bearer token
- Response: 200 OK

DELETE /api/messages/{id}
- Headers: Authorization Bearer token
- Response: 204 No Content

POST /api/messages/{id}/archive
- Headers: Authorization Bearer token
- Response: 200 OK

POST /api/messages/{id}/spam
- Headers: Authorization Bearer token
- Response: 200 OK
```

### 5. Categories & Tags

#### Categories Controller
```
GET /api/categories
- Response: List<Category>

GET /api/categories/{id}/projects
- Query Params: ?page=0&size=20
- Response: Page<ProjectIdea>

GET /api/categories/stats
- Response: List<CategoryStats>
```

#### Tags Controller
```
GET /api/tags
- Query Params: ?search=&limit=20
- Response: List<Tag>

GET /api/tags/popular
- Query Params: ?limit=50
- Response: List<Tag> sorted by usage

POST /api/tags
- Headers: Authorization Bearer token (Admin only)
- Request Body: { name, color }
- Response: Created Tag
```

### 6. Search & Filtering

#### Search Controller
```
GET /api/search/projects
- Query Params: ?q=garden&category=TECHNOLOGY&difficulty=BEGINNER&tags=IoT,sensors&page=0&size=20&sortBy=relevance
- Response: Page<ProjectIdea>

GET /api/search/users
- Query Params: ?q=developer&skills=React,Java&page=0&size=20
- Response: Page<User>

GET /api/search/suggestions
- Query Params: ?q=gar
- Response: List<SearchSuggestion>

GET /api/search/filters
- Response: { categories, difficulties, popularTags, skillsList }
```

### 7. Admin & Moderation

#### Admin Controller
```
GET /api/admin/projects/pending
- Headers: Authorization Bearer token (Admin/Moderator)
- Query Params: ?page=0&size=20
- Response: Page<ProjectIdea>

PUT /api/admin/projects/{id}/moderate
- Headers: Authorization Bearer token (Admin/Moderator)
- Request Body: { action: APPROVE/REJECT/FEATURE, reason?, moderatorNotes? }
- Response: Updated ProjectIdea

GET /api/admin/users
- Headers: Authorization Bearer token (Admin)
- Query Params: ?page=0&size=20&isActive=true
- Response: Page<User>

PUT /api/admin/users/{id}/status
- Headers: Authorization Bearer token (Admin)
- Request Body: { isActive, reason? }
- Response: Updated User

GET /api/admin/stats/dashboard
- Headers: Authorization Bearer token (Admin)
- Response: { totalUsers, totalProjects, pendingReviews, todayStats }

GET /api/admin/reports/abuse
- Headers: Authorization Bearer token (Admin/Moderator)
- Response: List<AbuseReport>
```

### 8. Analytics & Statistics

#### Analytics Controller
```
GET /api/analytics/projects/{id}
- Headers: Authorization Bearer token (Project owner/Admin)
- Query Params: ?startDate=2025-01-01&endDate=2025-12-31&granularity=DAY
- Response: Analytics data

GET /api/analytics/user/engagement
- Headers: Authorization Bearer token
- Response: User engagement metrics

GET /api/analytics/platform/stats
- Response: Public platform statistics

GET /api/analytics/trending
- Query Params: ?timeframe=WEEK&category=TECHNOLOGY
- Response: Trending data
```

## Security Requirements

### 1. Authentication & Authorization
- JWT-based authentication with refresh tokens
- Password encryption using BCrypt
- Role-based access control (USER, ADMIN, MODERATOR)
- Social OAuth integration (Google, GitHub, LinkedIn)
- Session management and timeout handling
- Account lockout after failed login attempts
- Email verification for new accounts

### 2. Data Validation & Sanitization
- Input validation for all API endpoints
- XSS protection for user-generated content
- SQL injection prevention
- File upload validation and virus scanning
- Rate limiting for API endpoints
- CSRF protection

### 3. Privacy & Data Protection
- GDPR compliance for user data
- Data anonymization for deleted users
- Secure file storage with access controls
- Audit logging for sensitive operations
- Data retention policies
- User consent management

## File Storage Requirements

### 1. User Avatars
- Support for common image formats (JPG, PNG, GIF)
- Image resizing and optimization
- CDN integration for fast delivery
- Fallback to default avatars

### 2. Project Assets
- Support for project screenshots/mockups
- Document attachments (PDF, DOC, etc.)
- Version control for project files
- Virus scanning for uploaded files

## Notification System

### 1. Email Notifications
- Welcome emails for new users
- Email verification
- Password reset emails
- Project status updates
- New message notifications
- Weekly digest of new projects
- Comment notifications

### 2. In-App Notifications
- Real-time notifications for messages
- Project approval/rejection notifications
- Message notifications
- Like and comment notifications
- System announcements

## Search & Recommendation Engine

### 1. Full-Text Search
- Elasticsearch integration for project search
- Auto-complete suggestions
- Fuzzy matching for typos
- Search result ranking and relevance

### 2. Recommendation System
- Similar projects based on content
- Personalized project recommendations
- Trending projects algorithm
- User behavior tracking for recommendations

## Performance & Scalability

### 1. Caching Strategy
- Redis for session management
- Application-level caching for frequently accessed data
- Database query optimization
- CDN for static assets

### 2. Database Optimization
- Proper indexing for search queries
- Database connection pooling
- Read replicas for scaling
- Database backup and recovery

## Monitoring & Logging

### 1. Application Monitoring
- Health check endpoints
- Performance metrics collection
- Error tracking and alerting
- User activity logging

### 2. Security Monitoring
- Failed login attempt tracking
- Suspicious activity detection
- API rate limit monitoring
- Security audit logs

## Integration Requirements

### 1. Third-Party Services
- Email service (SendGrid, AWS SES)
- File storage (AWS S3, CloudFlare)
- Social authentication providers
- Analytics service (Google Analytics)
- Payment processing (for premium features)

### 2. API Documentation
- Swagger/OpenAPI documentation
- Postman collections
- SDK generation for frontend
- API versioning strategy

## Testing Requirements

### 1. Unit Testing
- JUnit tests for service layer
- Mock testing for external dependencies
- Code coverage requirements (>80%)

### 2. Integration Testing
- API endpoint testing
- Database integration tests
- External service integration tests

### 3. Performance Testing
- Load testing for high traffic scenarios
- Database performance testing
- API response time optimization

## Deployment & DevOps

### 1. Environment Configuration
- Development, staging, and production environments
- Environment-specific configuration
- Secrets management
- Database migrations

### 2. CI/CD Pipeline
- Automated testing on code commits
- Automated deployment to staging
- Production deployment with rollback capability
- Container orchestration (Docker/Kubernetes)

## Backup & Recovery

### 1. Data Backup
- Daily database backups
- File storage backups
- Point-in-time recovery capability
- Cross-region backup replication

### 2. Disaster Recovery
- Recovery time objectives (RTO)
- Recovery point objectives (RPO)
- Disaster recovery testing
- Business continuity planning

### 6. Password Security Requirements

#### Password Validation Rules
The backend must implement password strength validation matching the frontend requirements:

```java
@Component
public class PasswordValidator {
    public static final int MIN_LENGTH = 8;
    public static final String SPECIAL_CHARACTERS = "!@#$%^&*(),.?\":{}|<>";
    
    public ValidationResult validatePassword(String password) {
        List<String> errors = new ArrayList<>();
        
        if (password.length() < MIN_LENGTH) {
            errors.add("Password must be at least 8 characters long");
        }
        
        if (!password.matches(".*[a-z].*")) {
            errors.add("Password must contain at least one lowercase letter");
        }
        
        if (!password.matches(".*[A-Z].*")) {
            errors.add("Password must contain at least one uppercase letter");
        }
        
        if (!password.matches(".*[0-9].*")) {
            errors.add("Password must contain at least one number");
        }
        
        if (!password.matches(".*[" + Pattern.quote(SPECIAL_CHARACTERS) + "].*")) {
            errors.add("Password must contain at least one special character");
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }
}
```

#### Password Security Features
- Password hashing using BCrypt with appropriate cost factor (12+)
- Password history tracking (prevent reuse of last 5 passwords)
- Password expiration policies for admin accounts
- Account lockout after failed login attempts
- Password reset token expiration (15 minutes)

#### Registration Password Requirements
```json
{
  "password": {
    "minLength": 8,
    "requireLowercase": true,
    "requireUppercase": true,
    "requireNumbers": true,
    "requireSpecialChars": true,
    "specialChars": "!@#$%^&*(),.?\":{}|<>",
    "maxLength": 128
  }
}
```

## Password Validation Requirements

### Frontend Password Strength Requirements (Implementation Alignment)
The backend must implement password validation that matches the frontend's 5-level strength indicator:

**Level 1 (Weak):**
- Minimum 8 characters

**Level 2 (Fair):**
- 8+ characters
- Contains uppercase letter

**Level 3 (Good):**
- 8+ characters
- Contains uppercase letter
- Contains lowercase letter

**Level 4 (Strong):**
- 8+ characters
- Contains uppercase letter
- Contains lowercase letter
- Contains number

**Level 5 (Excellent):**
- 8+ characters
- Contains uppercase letter
- Contains lowercase letter
- Contains number
- Contains special character

**Backend Validation Rules:**
```
- Minimum password length: 8 characters
- Must contain at least one uppercase letter (A-Z)
- Must contain at least one lowercase letter (a-z)
- Must contain at least one number (0-9)
- Must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)
- Cannot be common passwords (implement password blacklist)
- Cannot contain user's email or name
- Password confirmation must match during registration
```

**API Response Format for Password Validation:**
```json
{
  "valid": false,
  "strength": 2,
  "feedback": "Add: number, special character",
  "errors": [
    "Password must contain at least one number",
    "Password must contain at least one special character"
  ]
}
```

### 7. Social Authentication Integration

#### Supported Providers
Based on frontend implementation, support for:
- Google OAuth 2.0
- GitHub OAuth
- LinkedIn OAuth (future implementation)

#### Frontend Social Auth Flow Requirements
```
1. User clicks social auth button (Google/GitHub)
2. Frontend initiates OAuth flow with provider
3. Provider returns authorization code/token
4. Frontend sends token/code to backend
5. Backend validates with provider
6. Backend creates/updates user account
7. Backend returns user data in standard format
8. Frontend receives user data and navigates to /account
```

#### Social Auth Response Format
Must match standard authentication response format with user data structure:
```json
{
  "user": {
    "id": 12345,
    "email": "user@provider.com",
    "name": "John Doe",
    "profilePicture": "https://provider.com/avatar.jpg",
    "joinDate": "2025-05-27T10:30:00.000Z",
    "isVerified": true,
    "preferences": { /* default preferences */ },
    "stats": { /* default stats */ }
  },
  "token": "jwt-token",
  "refreshToken": "refresh-token"
}
```

#### Social Provider Integration Requirements
- Google: Validate Google ID token server-side
- GitHub: Exchange authorization code for access token
- LinkedIn: Exchange authorization code for access token
- Extract profile information (name, email, profile picture)
- Handle email conflicts (link accounts or error)
- Create user with default preferences and stats if new
- Update existing user profile picture if account exists
```

### 8. Account Management Features

#### User Preferences Validation
```java
@Component
public class UserPreferencesValidator {
    public ValidationResult validatePreferences(UserPreferences preferences) {
        List<String> errors = new ArrayList<>();
        
        // Email notifications - boolean
        if (preferences.getEmailNotifications() == null) {
            errors.add("Email notifications preference is required");
        }
        
        // Idea recommendations - boolean
        if (preferences.getIdeaRecommendations() == null) {
            errors.add("Idea recommendations preference is required");
        }
        
        // Weekly digest - boolean
        if (preferences.getWeeklyDigest() == null) {
            errors.add("Weekly digest preference is required");
        }
        
        // Profile visibility - enum validation
        if (preferences.getProfileVisibility() == null || 
            !Arrays.asList("public", "private", "friends").contains(preferences.getProfileVisibility())) {
            errors.add("Profile visibility must be one of: public, private, friends");
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }
}
```

#### User Statistics Update Logic
```java
@Service
public class UserStatsService {
    
    public void incrementIdeasSubmitted(Long userId) {
        // Increment when user submits a new idea
        userRepository.incrementStat(userId, "ideasSubmitted", 1);
    }
    
    public void incrementProfileViews(Long userId) {
        // Increment when another user views the profile
        userRepository.incrementStat(userId, "profileViews", 1);
    }
```

### User Session Management & Persistence Requirements

**Frontend Session Handling:**
- Uses localStorage for authentication persistence
- Maintains user session across browser refreshes
- Automatic session restoration on app load
- Session cleanup on logout

**Backend Session Requirements:**
```
JWT Token Management:
- Access token expiration: 1 hour
- Refresh token expiration: 7 days
- Automatic token refresh before expiration
- Secure token storage recommendations for frontend
- Token blacklisting on logout

Session Validation:
- Validate JWT signature and expiration
- Check user account status (active, verified)
- Track user activity and last login
- Handle concurrent sessions (multiple devices)

Logout Handling:
- Invalidate current tokens
- Clear session data
- Update last logout timestamp
- Optional: Clear all user sessions (logout everywhere)
```

**Authentication Middleware Requirements:**
```
Protected Route Handling:
- Validate Authorization Bearer token
- Extract user information from token
- Check user permissions for requested resource
- Handle expired tokens gracefully
- Return appropriate error responses

Token Refresh Flow:
- Accept refresh token
- Validate refresh token
- Generate new access token
- Optionally rotate refresh token
- Return new tokens to frontend
```

### Account Management & Navigation Requirements

**Frontend Navigation Pattern:**
- Direct account access via navbar profile button (no dropdown menu)
- Account page route: `/account` 
- Authentication redirects to `/account` page after successful login/signup
- Profile button in navbar navigates directly to account management page
- Logout button in navbar (no dropdown menu structure)

**Account Page Features Required:**
- Complete user profile management
- User preferences configuration
- User statistics display
- Account settings
- Security settings (password change, email verification)
- Profile picture upload/management
- Account deletion option
- Privacy settings

**Backend Endpoints for Account Management:**
```
GET /api/users/me/account
- Headers: Authorization Bearer token
- Response: Complete account data for account page
- Includes: profile, preferences, stats, security settings, privacy settings

PUT /api/users/me/account/settings
- Headers: Authorization Bearer token
- Request Body: { accountSettings object }
- Response: Updated account settings

POST /api/users/me/account/delete
- Headers: Authorization Bearer token
- Request Body: { confirmationPassword, reason? }
- Response: Account deletion confirmation

GET /api/users/me/account/activity
- Headers: Authorization Bearer token
- Query Params: ?page=0&size=20
- Response: Page<UserActivity> - Recent account activity

PUT /api/users/me/security/password
- Headers: Authorization Bearer token
- Request Body: { currentPassword, newPassword, confirmPassword }
- Response: Password change confirmation
```

### Form Validation & Error Handling Requirements

**Registration Form Validation (Frontend Alignment):**
```
Email Validation:
- Valid email format (RFC 5322 compliant)
- Domain validation
- Email uniqueness check
- Email existence verification (optional)

Name Field Validation:
- Support both simple (fullName) and advanced (firstName/lastName) modes
- Minimum 2 characters for names
- Maximum 50 characters per name field
- No special characters except hyphens and apostrophes
- Trim whitespace

Password Validation:
- Implement 5-level strength validation (as detailed above)
- Real-time validation feedback
- Password confirmation matching

Terms and Conditions:
- Required checkbox validation for registration
- Legal compliance tracking
```

**Login Form Validation:**
```
Email Validation:
- Valid email format
- Case-insensitive email lookup

Password Validation:
- No client-side password requirements for login
- Secure password verification
- Account lockout after failed attempts (5 attempts)
- Progressive delay for repeated failures

Brute Force Protection:
- Rate limiting by IP address
- CAPTCHA after multiple failures
- Account lockout notification
```

**API Error Response Format:**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Please correct the following fields",
  "fieldErrors": {
    "email": ["Email is already registered"],
    "password": ["Password must contain at least one number"],
    "confirmPassword": ["Passwords do not match"]
  },
  "timestamp": "2025-05-27T10:30:00.000Z"
}
```

### My Submissions Dashboard Requirements

**Frontend My Submissions Features:**
- User's submitted project ideas dashboard
- Project status tracking and management
- Edit and delete capabilities
- Submission statistics

**Backend Requirements for My Submissions:**
```
GET /api/users/me/submissions
- Headers: Authorization Bearer token
- Query Params: ?status=PUBLISHED&page=0&size=20&sortBy=newest
- Response: Page<ProjectIdea> with additional owner metadata
- Includes: edit permissions, status history, engagement stats

GET /api/users/me/submissions/stats
- Headers: Authorization Bearer token
- Response: Submission statistics for dashboard
- Format: {
    totalSubmissions: number,
    publishedCount: number,
    draftCount: number,
    underReviewCount: number,
    rejectedCount: number,
    totalViews: number,
    totalLikes: number,
    totalComments: number
  }

PUT /api/projects/{id}/status
- Headers: Authorization Bearer token
- Request Body: { status: "DRAFT" | "UNDER_REVIEW" }
- Response: Updated project with new status
- Access Control: Only project owner can change status

GET /api/users/me/submissions/{id}/analytics
- Headers: Authorization Bearer token
- Response: Detailed analytics for user's specific project
- Includes: view trends, engagement metrics, demographic data
```

**Dashboard Data Requirements:**
- Filter by project status (All, Published, Draft, Under Review, Rejected)
- Sort by submission date, last updated, views, likes
- Search within user's own submissions
- Batch operations (select multiple for deletion/status change)
- Quick actions (edit, delete, resubmit)
- Status change notifications and history
````
