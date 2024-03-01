import os
from flask import Flask
from flask_cors import CORS
from mail_config import configure_mail
from signup_python.signup_routes import signup_bp
from login_python.login_routes import login_bp
from forgot_python.forgot_routes import forgot_bp

app = Flask(__name__)

configure_mail(app)  # Configure mail

app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(forgot_bp)

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
