import requests
import json
import csv
import pandas as pd
import matplotlib.pyplot as plt 
import seaborn as sns

class buildModels:
    def __init__(self):
        df = pd.DataFrame()
    
    #read csv data into dataframe
    def readCsvData(self):
        self.df = pd.read_csv('server/models/src/data/repoData.csv')
        self.df = self.df[['repoName', 'owner', 'size', 'watchers_count', 'has_issues', 'has_wiki',
            'has_pages', 'has_projects', 'forks_count', 'open_issues_count',
            'subscribers_count', 'is_template', 'num_topics', 'num_branches']]
    
    def getDataInfo(self):
        self.df.shape
        self.df.info()
        self.df.describe()

    def showDataTrends(self):
        sns.pairplot(self.df, x_vars=['forks_count', 'open_issues_count','subscribers_count'], 
             y_vars='watchers_count', size=4, aspect=1, kind='scatter')
        plt.show()
        sns.heatmap(self.df.corr(), cmap="YlGnBu", annot = True)
        plt.show()
        
    def linearRegression(self):
        return

    def main(self):
        self.readCsvData()
        self.getDataInfo()
        self.showDataTrends()

buildModels = buildModels()
buildModels.main()