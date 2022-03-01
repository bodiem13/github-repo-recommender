import requests
import json
import csv
import pandas as pd
import matplotlib.pyplot as plt 
import seaborn as sns
from sklearn import linear_model
from sklearn.model_selection import train_test_split
import statsmodels.api as sm
import numpy as np
from sklearn.metrics import r2_score
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.ensemble import RandomForestClassifier as RFC
from sklearn.metrics import accuracy_score
from sklearn.neighbors import KNeighborsClassifier

class buildModels:
    def __init__(self):
        df = pd.DataFrame()
    
    #read csv data into dataframe
    def readCsvData(self):
        self.df = pd.read_csv('server/models/src/data/repoData.csv')
        self.df = self.df[['repoName', 'owner', 'size', 'watchers_count', 'has_issues', 'has_wiki',
            'has_pages', 'has_projects', 'forks_count', 'open_issues_count',
            'subscribers_count', 'is_template', 'num_topics', 'num_branches']]
        self.df['has_issues']= self.df['has_issues'].astype(int)
        self.df['has_wiki']= self.df['has_wiki'].astype(int)
        self.df['has_pages']= self.df['has_pages'].astype(int)
        self.df['has_projects']= self.df['has_projects'].astype(int)
        self.df['is_template']= self.df['is_template'].astype(int)
    
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
    
    def getDataSets(self):
        X = self.df[['size', 'has_issues', 'has_wiki',
            'has_pages', 'has_projects', 'forks_count', 'open_issues_count',
            'subscribers_count', 'is_template', 'num_topics', 'num_branches']]
        y = self.df['watchers_count']
        X_train, X_test, y_train, y_test = train_test_split(X, y, train_size = 0.7, 
                                                    test_size = 0.3, random_state = 100)

        return X_train, X_test, y_train, y_test
    
    def buildLinRegStatsmodels(self, X_train, X_test, y_train, y_test):
        X_train_sm = sm.add_constant(X_train)
        lr = sm.OLS(y_train, X_train_sm).fit()
        print("Below are params")
        print(lr.params)
        print("Below is summary")
        print(lr.summary())
        X_test_sm = sm.add_constant(X_test)
        y_test_pred = lr.predict(X_test_sm)
        print("Prediction: ", y_test_pred)
        r_squared = r2_score(y_test, y_test_pred)
        print("r-squared value: ", r_squared)
    
    def buildLinRegSklearn(self, X_train, X_test, y_train, y_test):
        X_train.shape
        lm = LinearRegression()
        lm.fit(X_train, y_train)

        print("Intercept :",lm.intercept_)
        print('Slope :',lm.coef_)
        y_train_pred = lm.predict(X_train)
        y_test_pred = lm.predict(X_test)

        print(r2_score(y_train,y_train_pred))
        print(r2_score(y_test,y_test_pred))

    def linearRegression(self):
        X_train, X_test, y_train, y_test = self.getDataSets()
        self.buildLinRegStatsmodels(X_train, X_test, y_train, y_test)
        self.buildLinRegSklearn(X_train, X_test, y_train, y_test)
        return

    def randomForest(self):
        X_train, X_test, y_train, y_test = self.getDataSets()
        rfc_b = RFC()
        rfc_b.fit(X_train,y_train)
        y_pred = rfc_b.predict(X_train)
        print('Train accuracy score:',accuracy_score(y_train,y_pred))
        print('Test accuracy score:', accuracy_score(y_test,rfc_b.predict(X_test)))
        return
    
    def kNNeighbors(self):
        X_train, X_test, y_train, y_test = self.getDataSets()
        knn = KNeighborsClassifier()
        knn.fit(X_train,y_train)
        y_pred = knn.predict(X_train)
        print('Train accuracy score:',accuracy_score(y_train,y_pred))
        print('Test accuracy score:',accuracy_score(y_test,knn.predict(X_test)))
        return

    def main(self):
        self.readCsvData()
        self.getDataInfo()
        #self.showDataTrends()
        self.linearRegression()
        self.randomForest()
        self.kNNeighbors()

buildModels = buildModels()
buildModels.main()