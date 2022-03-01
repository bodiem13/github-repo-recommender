import requests
import json
import pandas as pd
import csv

class githubAPIServices:

    def __init__(self):
        self.api_url = 'https://api.github.com/'
        self.api_token = self.get_git_token()
        self.headers = {'Authorization': 'token %s' % self.api_token}
        self.df_elements = {'size': "repoInfo['size']", 'watchers_count': "repoInfo['watchers_count']", 'has_issues': "repoInfo['has_issues']", 'has_wiki': "repoInfo['has_wiki']", 
        'has_pages': "repoInfo['has_pages']", 'has_projects': "repoInfo['has_projects']", 'forks_count': "repoInfo['forks_count']", 'open_issues_count': "repoInfo['open_issues_count']",
        'subscribers_count': "repoInfo['subscribers_count']", 'is_template': "repoInfo['is_template']", 'num_topics': "len(repoInfo['topics'])"}
        self.df_headers = []
        self.getDfHeaders()
        self.df = pd.DataFrame(columns = self.df_headers)
        self.rate_limit_remaining = 0
        self.row = []
        self.counter = 0
    
    def get_git_token(self):
        with open('config.json') as f:
            data = json.load(f)
            my_token = data['api_token']
            return my_token
    
    def getDfHeaders(self):
        self.df_headers.append('repoName')
        self.df_headers.append('owner')
        for key in self.df_elements.keys():
            self.df_headers.append(key)
        self.df_headers.append('num_branches')
        # with open('repoData.csv','w') as file:
        #     write = csv.writer(file)
        #     write.writerow(self.df_headers)

        #self.df_headers.append('num_commits')
    
    def exportToCsv(self):
        with open('repoData.csv','a+', newline='') as file:
            write = csv.writer(file)
            write.writerow(self.row)
        # self.df.to_csv('repoData.csv')

    def checkRateLimit(self):
        response = requests.get('https://api.github.com/rate_limit', headers=self.headers).json()
        self.rate_limit_remaining = response['resources']['core']['remaining']  

    def getRepositoriesByStars(self, numRepos, page):
        self.checkRateLimit()
        #check rate limit to ensure 4 api calls can be made
        print("Remaining rate limit: ", self.rate_limit_remaining)
        # https://api.github.com/search/repositories?q=stars:>500&sort=stars&order=desc&page=3
        my_url = self.api_url+'search/repositories?q=stars:>1000&sort=stars&order=asc'+'&page='+str(page)
        print(my_url)
        repos = requests.get(my_url, headers=self.headers).json()
        #print(repos)
        for repo in repos['items']:
            if self.counter < numRepos:
                try:
                    self.row = []
                    repoName = repo['name']
                    self.row.append(repoName)
                    owner = repo['owner']['login'] 
                    self.row.append(owner)
                    repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName, headers=self.headers).json()
                    if repoInfo['watchers_count'] > 500: 
                        for value in self.df_elements.values():
                            self.row.append(eval(value))
                        repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName+'/branches', headers=self.headers).json()
                        #append number of branches by getting len of repoInfo
                        self.row.append(len(repoInfo))

                        #COMMENTED OUT NUM COMMITS
                        # #check commits
                        # my_iterator = 1
                        # num_commits = 0
                        # while True:
                        #     repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName+'/commits?page=' + str(my_iterator), headers=self.headers).json()
                        #     if len(repoInfo) != 0:
                        #         num_commits += len(repoInfo)
                        #         my_iterator += 1
                        #     else:
                        #         break
                        # #add total num commits as calculated value
                        # self.row.append(num_commits)
                        #add row to df
                        self.df.loc[len(self.df)] = self.row
                        self.counter += 1
                        self.exportToCsv()
                    else:
                        print("Not enough Stars! We only had " + str(repoInfo['watchers_count']))
                except Exception as err:
                    print("The below exception has occurred")
                    print(err)
            else:
                break
            

githubAPIServices = githubAPIServices()
num_pages = 100
i = 0
while i < 100:
    githubAPIServices.getRepositoriesByStars(5000, i)
    i+= 1
