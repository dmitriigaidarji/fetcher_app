from django.contrib.auth.forms import AuthenticationForm


class MyAuthenticationForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.initial = {'username': 'demo', 'password': 'demo'}
        self.fields['password'].widget.render_value = True
