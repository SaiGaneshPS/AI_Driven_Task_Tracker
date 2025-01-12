import requests
import json

# Backend URL
BASE_URL = "http://localhost:3000/api"

# Signup data
signup_data = {
    "username": "testuser1",
    "password": "testpass123",
    "name": "Test User",
    "email": "test1@test.com"
}

# Make POST request to signup endpoint
try:
    response = requests.post(
        f"{BASE_URL}/signup",
        headers={"Content-Type": "application/json"},
        data=json.dumps(signup_data)
    )
    
    # Print status code and response
    print(f"Status Code: {response.status_code}")
    print("Response:")
    print(json.dumps(response.json(), indent=2))

except requests.exceptions.RequestException as e:
    print(f"Error occurred: {e}")