import requests
import json
import pandas as pd

class githubAPIServices:

    def __init__(self):
        self.api_url = 'https://api.github.com/'
        #self.api_token = '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'
        
        self.headers = {'Authorization': 'token %s' % self.api_token}
        self.df_elements = {'size': "repoInfo['size']", 'watchers_count': "repoInfo['watchers_count']", 'has_issues': "repoInfo['has_issues']", 'has_wiki': "repoInfo['has_wiki']", 
        'has_pages': "repoInfo['has_pages']", 'has_projects': "repoInfo['has_projects']", 'forks_count': "repoInfo['forks_count']", 'open_issues_count': "repoInfo['open_issues_count']",
        'subscribers_count': "repoInfo['subscribers_count']", 'is_template': "repoInfo['is_template']", 'num_topics': "len(repoInfo['topics'])"}
        self.df_headers = []
        self.getDfHeaders()
        self.df = pd.DataFrame(columns = self.df_headers)
    
    def getDfHeaders(self):
        self.df_headers.append('repoName')
        self.df_headers.append('owner')
        for key in self.df_elements.keys():
            self.df_headers.append(key)
        self.df_headers.append('num_branches')
        self.df_headers.append('num_commits')

        

    def getRepositoriesByStars(self, numRepos):
        repos = requests.get(self.api_url+'repositories?sort=stars&order=desc', headers=self.headers).json()
        print(len(repos))
        for repo in repos:
            row = []
            repoName = repo['name']
            owner = repo['owner']['login'] 
            repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName).json()
            with open('server/models/src/data.json', 'w') as f:
                json.dump(repoInfo, f)
            for value in self.df_elements.values():
                row.append(eval(value))
            repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName+'/branches').json()
            with open('server/models/src/data.json', 'w') as f:
                json.dump(repoInfo, f)
            num_branches = len(repoInfo)
            row.append(num_branches)
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
            row.append(num_commits)
            print(row)
            print(len(row))
            self.df.loc[len(self.df)] = row
            print(self.df)
            #stars = repoInfo.json()['stargazers_count']
            print("Done")
            

githubAPIServices = githubAPIServices()
githubAPIServices.getRepositoriesByStars(5)
githubAPIServices.getDfHeaders()