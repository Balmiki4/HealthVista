from flask_mail import Mail
import os

mail = Mail()

def configure_mail(app):
    mail_user_name = os.getenv('GMAIL_USER_NAME')
    mail_app_password = os.getenv('GMAIL_APP_PASSWORD')
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = mail_user_name
    app.config['MAIL_PASSWORD'] = mail_app_password
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True
    mail.init_app(app)
