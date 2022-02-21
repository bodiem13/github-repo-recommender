import requests
import json

class githubAPIServices:

    def __init__(self):
        self.api_url = 'https://api.github.com/'
        #self.api_token = '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'
        
        self.headers = {'Authorization': 'token %s' % self.api_token}

    def getRepositoriesByStars(self, numRepos):
        #api url to grab public user repositories
        #api_url = f"https://api.github.com/repos/bodiem13/github-repo-recommender"
        repos = requests.get(self.api_url+'repositories?sort=stars&order=desc', headers=self.headers).json()
        for repo in repos:
            repoName = repo['name']
            owner = repo['owner']['login'] 
            repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName).json()
            with open('server/models/src/data.json', 'w') as f:
                json.dump(repoInfo, f)
            size = repoInfo['size']
            watchers_count = repoInfo['watchers_count']
            has_issues = repoInfo['has_issues']
            has_wiki = repoInfo['has_wiki']
            has_pages = repoInfo['has_pages']
            has_projects = repoInfo['has_projects']
            forks_count = repoInfo['forks_count']
            open_issues_count = repoInfo['open_issues_count']
            subscribers_count = repoInfo['subscribers_count']
            is_template = repoInfo['is_template']
            num_topics = len(repoInfo['topics'])
            repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName+'/branches').json()
            with open('server/models/src/data.json', 'w') as f:
                json.dump(repoInfo, f)
            num_branches = len(repoInfo)
            #check commits
            my_iterator = 1
            num_commits = 0
            while True:
                repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName+'/commits?page=' + str(my_iterator)).json()
                if len(repoInfo) != 0:
                    num_commits += len(repoInfo)
                    my_iterator += 1
                else:
                    break
                # with open('server/models/src/data.json', 'w') as f:
                #     json.dump(repoInfo, f)
            
            print("Total commits: ", num_commits)
            
            #stars = repoInfo.json()['stargazers_count']
            print("Done")
            

githubAPIServices = githubAPIServices()
githubAPIServices.getRepositoriesByStars(5)