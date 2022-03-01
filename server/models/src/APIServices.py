import requests
import json
import csv

class githubAPIServices:

    def __init__(self):
        self.api_url = 'https://api.github.com/'
        self.api_token = self.getGitToken()
        self.headers = {'Authorization': 'token %s' % self.api_token}
        self.df_elements = {'size': "repoInfo['size']", 'watchers_count': "repoInfo['watchers_count']", 'has_issues': "repoInfo['has_issues']", 'has_wiki': "repoInfo['has_wiki']", 
        'has_pages': "repoInfo['has_pages']", 'has_projects': "repoInfo['has_projects']", 'forks_count': "repoInfo['forks_count']", 'open_issues_count': "repoInfo['open_issues_count']",
        'subscribers_count': "repoInfo['subscribers_count']", 'is_template': "repoInfo['is_template']", 'num_topics': "len(repoInfo['topics'])"}
        self.csv_headers = []
        self.getHeaders()
        self.rate_limit_remaining = 0
        self.row = []
        self.counter = 0
    
    #get api_token needed for git authentication
    def getGitToken(self):
        with open('config.json') as f:
            data = json.load(f)
            my_token = data['api_token']
            return my_token
    
    #get headers for columns of exported csv file
    def getHeaders(self):
        self.csv_headers.append('repoName')
        self.csv_headers.append('owner')
        for key in self.df_elements.keys():
            self.csv_headers.append(key)
        self.csv_headers.append('num_branches')
        #uncomment to add headers to the top of csv file
        # with open('repoData.csv','w') as file:
        #     write = csv.writer(file)
        #     write.writerow(self.csv_headers)
    
    #export row with repository details to csv
    def exportToCsv(self):
        with open('server/models/src/data/repoData.csv','a+', newline='') as file:
            write = csv.writer(file)
            write.writerow(self.row)

    #helper function for checking api rate limit
    def checkRateLimit(self):
        response = requests.get('https://api.github.com/rate_limit', headers=self.headers).json()
        self.rate_limit_remaining = response['resources']['core']['remaining']  

    
    def getRepoDetails(self, repo):
        try:
            self.row = []
            repoName = repo['name']
            self.row.append(repoName)
            owner = repo['owner']['login'] 
            self.row.append(owner)
            repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName, headers=self.headers).json()
            for value in self.df_elements.values():
                self.row.append(eval(value))
            repoInfo = requests.get(self.api_url + 'repos/'+owner+'/'+repoName+'/branches', headers=self.headers).json()
            #append number of branches by getting len of repoInfo
            self.row.append(len(repoInfo))
            self.counter += 1
            self.exportToCsv()
            return True
        except Exception as err:
            print("The below exception has occurred")
            print(err)
            return False

    #get repository details by the number of stars a repository has
    def getRepositoriesByStars(self, page, num_stars):
        self.checkRateLimit()
        #check rate limit to ensure 4 api calls can be made
        print("Remaining rate limit: ", self.rate_limit_remaining)
        my_url = self.api_url+'search/repositories?q=stars:>'+str(num_stars)+'&sort=stars&order=asc'+'&page='+str(page)
        print(my_url)
        try:
            repos = requests.get(my_url, headers=self.headers).json()
            keep_going = True
            for repo in repos['items']:
                if keep_going == True:
                    keep_going = self.getRepoDetails(repo)
                else:
                    break
            return True
        except Exception as err:
            print("The following error occurred getting repo data: ", err)
            return False

            

githubAPIServices = githubAPIServices()
page_num = 1
num_stars = [500, 1000, 2000, 10000, 25000, 40000]
for star_count in num_stars:
    page_num = 1
    more_pages = True
    while more_pages == True:
        more_pages = githubAPIServices.getRepositoriesByStars(page_num, star_count)
        page_num+= 1
