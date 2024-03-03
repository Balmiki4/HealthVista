class User:
    def __init__(self, username, email, password, plan ="free", customer_id=None):
        self.username = username
        self.email = email
        self.password = password
        self.plan = plan
        self.customer_id = customer_id

