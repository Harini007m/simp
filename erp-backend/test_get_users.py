import requests
url = "http://localhost:8000/api/v1/users/search"
data = {"page": 1, "page_size": 1000}
response = requests.post(url, json=data)
print(response.status_code)
print(response.text)
