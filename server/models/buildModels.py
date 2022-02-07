from src.APIServices import githubAPIServices

apiClass = githubAPIServices

githubAPI = apiClass.getRepositoriesByStars(5)
print("test")