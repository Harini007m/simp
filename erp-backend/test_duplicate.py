import requests
url = "http://localhost:8000/api/v1/users/"
data = {
    "name": "Anish User",
    "username": "anishuser",
    "email": "anish123@example.com",
    "password": "password123",
    "roleId": None,
    "roleName": "User",
    "status": "Active",
    "moduleOverrides": [],
    "avatar": "AN"
}
# This will be a duplicate of the previous successful request
response = requests.post(url, json=data)
print(response.status_code)
print(response.text)
