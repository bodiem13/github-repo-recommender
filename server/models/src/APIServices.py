import requests

class githubAPIServices:

    def __init__(self):
        self.api_url = 'https://api.github.com/'
        self.api_token = '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'
        self.headers = {'Authorization': 'token %s' % self.api_token}

    def getRepositoriesByStars(self, numRepos):
        #api url to grab public user repositories
        #api_url = f"https://api.github.com/repos/bodiem13/github-repo-recommender"
        repos = requests.get(self.api_url+'repositories?sort=stars&order=desc', headers=self.headers).json()
        print(repos)
        for repo in repos:
            repoName = repo['name']
            owner = repo['owner']['login'] 
            repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName)
            stars = repoInfo.json()['stargazers_count']
            print(repoName, stars)
        print(repos)

githubAPIServices = githubAPIServices()
githubAPIServices.getRepositoriesByStars(5)