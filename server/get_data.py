import requests


github_username  = "bodiem13"   #specify your User name

#api url to grab public user repositories
api_url = f"https://api.github.com/repos/bodiem13/github-repo-recommender"

#send get request
response = requests.get(api_url)

#get the json data
data =  response.json()

print(data)