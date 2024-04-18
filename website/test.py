import requests

r = requests.get('http://localhost:3000/api')

print(r.json())

