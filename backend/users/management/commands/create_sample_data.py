from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from projects.models import ProjectIdea, Category, Tag, ProjectTag

User = get_user_model()


class Command(BaseCommand):
    help = 'Create sample data for development'

    def handle(self, *args, **options):
        # Create superuser if it doesn't exist
        if not User.objects.filter(email='admin@wantanidea.com').exists():
            admin_user = User.objects.create_superuser(
                username='admin',
                email='admin@wantanidea.com',
                password='admin123',
                first_name='Admin',
                last_name='User'
            )
            admin_user.is_verified = True
            admin_user.save()
            self.stdout.write(
                self.style.SUCCESS('Successfully created admin user: admin@wantanidea.com')
            )

        # Create a few sample users
        sample_users = [
            {
                'username': 'john_dev',
                'email': 'john@example.com',
                'first_name': 'John',
                'last_name': 'Developer',
                'bio': 'Full-stack developer with 5 years of experience',
                'skills': ['Python', 'React', 'Django', 'JavaScript']
            },
            {
                'username': 'jane_designer',
                'email': 'jane@example.com',
                'first_name': 'Jane',
                'last_name': 'Designer',
                'bio': 'UI/UX designer passionate about user experience',
                'skills': ['Figma', 'Adobe XD', 'HTML', 'CSS']
            },
            {
                'username': 'mike_ml',
                'email': 'mike@example.com',
                'first_name': 'Mike',
                'last_name': 'AI Engineer',
                'bio': 'Machine learning engineer working on innovative AI solutions',
                'skills': ['Python', 'TensorFlow', 'PyTorch', 'Data Science']
            }
        ]

        for user_data in sample_users:
            if not User.objects.filter(email=user_data['email']).exists():
                user = User.objects.create_user(
                    username=user_data['username'],
                    email=user_data['email'],
                    password='password123',
                    first_name=user_data['first_name'],
                    last_name=user_data['last_name'],
                    bio=user_data['bio'],
                    skills=user_data['skills']
                )
                user.is_verified = True
                user.save()
                self.stdout.write(
                    self.style.SUCCESS(f'Created user: {user.email}')
                )

        # Create sample projects
        sample_projects = [
            {
                'title': 'Smart Garden Monitoring System',
                'description': 'Develop an IoT-based system that monitors soil moisture, temperature, and light levels in gardens. The system should send alerts to users when plants need watering or care, and provide recommendations for optimal plant growth.',
                'category': 'Technology',
                'difficulty': 'intermediate',
                'estimated_time': '1_month',
                'required_skills': ['Python', 'Arduino', 'IoT', 'Mobile Development'],
                'tech_stack': ['Python', 'Arduino', 'React Native', 'Firebase'],
                'tags': ['IoT', 'Python', 'Mobile App'],
                'author_email': 'john@example.com'
            },
            {
                'title': 'AI-Powered Personal Finance Assistant',
                'description': 'Create an intelligent personal finance app that analyzes spending patterns, categorizes expenses automatically, and provides personalized budgeting recommendations using machine learning algorithms.',
                'category': 'Business & Finance',
                'difficulty': 'advanced',
                'estimated_time': '2-3_months',
                'required_skills': ['Machine Learning', 'Python', 'React', 'Data Analysis'],
                'tech_stack': ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
                'tags': ['AI', 'Machine Learning', 'React'],
                'author_email': 'mike@example.com'
            },
            {
                'title': 'Community Skill Exchange Platform',
                'description': 'Build a platform where community members can exchange skills and services. Users can offer their expertise (e.g., coding, cooking, music lessons) in exchange for learning new skills from others.',
                'category': 'Community & Social',
                'difficulty': 'beginner',
                'estimated_time': '1-2_weeks',
                'required_skills': ['Web Development', 'JavaScript', 'Database Design'],
                'tech_stack': ['JavaScript', 'Node.js', 'MongoDB', 'HTML/CSS'],
                'tags': ['Web Development', 'JavaScript', 'Database'],
                'author_email': 'jane@example.com'
            }
        ]

        for project_data in sample_projects:
            try:
                category = Category.objects.get(name=project_data['category'])
                author = User.objects.get(email=project_data['author_email'])

                if not ProjectIdea.objects.filter(title=project_data['title']).exists():
                    project = ProjectIdea.objects.create(
                        title=project_data['title'],
                        description=project_data['description'],
                        category=category,
                        difficulty=project_data['difficulty'],
                        estimated_time=project_data['estimated_time'],
                        required_skills=project_data['required_skills'],
                        tech_stack=project_data['tech_stack'],
                        author=author,
                        status='published'
                    )

                    # Add tags
                    for tag_name in project_data['tags']:
                        try:
                            tag = Tag.objects.get(name=tag_name)
                            ProjectTag.objects.create(project=project, tag=tag)
                        except Tag.DoesNotExist:
                            pass

                    self.stdout.write(
                        self.style.SUCCESS(f'Created project: {project.title}')
                    )
            except (Category.DoesNotExist, User.DoesNotExist) as e:
                self.stdout.write(
                    self.style.ERROR(f'Error creating project {project_data["title"]}: {e}')
                )

        self.stdout.write(
            self.style.SUCCESS('Successfully created sample data!')
        )
