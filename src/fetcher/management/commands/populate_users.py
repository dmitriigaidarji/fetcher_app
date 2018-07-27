from django.contrib.auth import get_user_model
from django.core.management import BaseCommand


class Command(BaseCommand):
    help = 'Populates the database with default users'

    def handle(self, *args, **options):
        if not get_user_model().objects.filter(username='demo').exists():
            get_user_model().objects.create(
                username='demo',
                password='demo',
                email='dmitriigaidarji@gmail.com',
                is_active=True,
                is_staff=True
            )
            print('Demo user has been created')
        else:
            print('Demo user already exists in database')
