import requests
url = "http://localhost:8000/api/v1/rbac/modules/"
response = requests.get(url)
print(response.status_code)
print(response.text[:200])
