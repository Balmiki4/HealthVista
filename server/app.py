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
from nutrition_python.nutrition_routes import nutrition_bp
from medication_python.medication_routes import  medication_bp
from medication_python.medicationdetails_routes import medicine_details_bp 
app = Flask(__name__)

configure_mail(app)  # Configure mail

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


app.register_blueprint(signup_bp)
app.register_blueprint(payment_bp)

app.register_blueprint(login_bp)
app.register_blueprint(forgot_bp)

app.register_blueprint(profile_bp)

app.register_blueprint(chatbot_bp)
app.register_blueprint(nutrition_bp)
app.register_blueprint(insurance_bp)
app.register_blueprint(medication_bp)
app.register_blueprint(medicine_details_bp)

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
