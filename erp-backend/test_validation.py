import requests
url = "http://localhost:8000/api/v1/users/"
data = {
    "name": "John Doe",
    "username": "johndoe001",
    "email": "johndoe001@example.com",
    "password": "Password123!",
    "roleId": "e5223ab4-f18c-4fdf-9730-22cda61fc86a",
    "roleName": "HR",
    "status": "Active",
    "moduleOverrides": ["dashboard", "users", "roles"],
    "avatar": "JD"
}
response = requests.post(url, json=data)
print(response.status_code)
print(response.text)
