import os
from flask import Flask
from flask_cors import CORS
from mail_config import configure_mail
from signup_python.signup_routes import signup_bp
from payment_python.payment_routes import payment_bp
from login_python.login_routes import login_bp
from forgot_python.forgot_routes import forgot_bp
from profile_python.profile_routes import profile_bp
from chatbot_python.chatbot_routes import chatbot_bp
from insurance_python.insurance_routes import insurance_bp
app = Flask(__name__)

configure_mail(app)  # Configure mail

app.register_blueprint(signup_bp)
app.register_blueprint(payment_bp)

app.register_blueprint(login_bp)
app.register_blueprint(forgot_bp)

app.register_blueprint(profile_bp)

app.register_blueprint(chatbot_bp)
app.register_blueprint(insurance_bp)

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
