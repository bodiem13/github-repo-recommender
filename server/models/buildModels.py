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
        self.df = pd.DataFrame()
        self.lin_reg_train_acc = []
        self.knn_train_acc = []
        self.rf_train_acc = []
        self.lin_reg_test_acc = []
        self.knn_test_acc = []
        self.rf_test_acc = []
        self.rand_state_var = 100
    
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
    
    #get info on size and shape of datasets
    def getDataInfo(self):
        self.df.shape
        self.df.info()
        self.df.describe()

    #Visualize trends in datasets
    def showDataTrends(self):
        sns.pairplot(self.df, x_vars=['forks_count', 'open_issues_count','subscribers_count'], 
             y_vars='watchers_count', size=4, aspect=1, kind='scatter')
        plt.show()
        sns.heatmap(self.df.corr(), cmap="YlGnBu", annot = True)
        plt.show()
    
    #build test and train datasets with 80% train and 20% test
    def getDataSets(self):
        X = self.df[['size', 'has_issues', 'has_wiki',
            'has_pages', 'has_projects', 'forks_count', 'open_issues_count',
            'subscribers_count', 'is_template', 'num_topics', 'num_branches']]
        y = self.df['watchers_count']
        X_train, X_test, y_train, y_test = train_test_split(X, y, train_size = 0.8, 
                                                    test_size = 0.2, random_state = self.rand_state_var)
        self.rand_state_var += 1


        return X_train, X_test, y_train, y_test
    
    #Remove insignificant columns from linear regression model
    def linRegRemoveCols(self, X_train, X_test, y_train, y_test):
        print(X_train)
        X_train = X_train.drop(columns=["size", "has_pages", "is_template"])
        X_test = X_test.drop(columns=["size", "has_pages", "is_template"])
        print("Done")
        print(X_train)
        return X_train, X_test, y_train, y_test
    
    #Build linear regression with sklearn
    def buildLinRegStatsmodels(self, X_train, X_test, y_train, y_test):
        X_train_sm = sm.add_constant(X_train)
        lr = sm.OLS(y_train, X_train_sm).fit()
        print("Below are params")
        print(lr.params)
        print("Below is summary")
        print(lr.summary())
        X_train, X_test, y_train, y_test = self.linRegRemoveCols(X_train, X_test, y_train, y_test)
        X_train_sm = sm.add_constant(X_train)
        lr = sm.OLS(y_train, X_train_sm).fit()
        print("Below are params after tuning")
        print(lr.params)
        print("Below is summary after tuning")
        y_train_pred = lr.predict(X_train_sm)
        X_test_sm = sm.add_constant(X_test)
        y_test_pred = lr.predict(X_test_sm)
        print("Prediction: ", y_test_pred)
        r_squared = r2_score(y_test, y_test_pred)
        print("r-squared value: ", r_squared)
        self.lin_reg_train_acc.append(r2_score(y_train,y_train_pred))
        self.lin_reg_test_acc.append(r2_score(y_test,y_test_pred))
    
    #Build linear regression with sklearn
    def buildLinRegSklearn(self, X_train, X_test, y_train, y_test):
        X_train.shape
        lm = LinearRegression()
        lm.fit(X_train, y_train)

        print("Intercept :",lm.intercept_)
        print('Slope :',lm.coef_)
        y_train_pred = lm.predict(X_train)
        y_test_pred = lm.predict(X_test)

        print("Train accuracy score for Linear Regression:", r2_score(y_train,y_train_pred))
        print("Testing accuracy score for Linear Regression:", r2_score(y_test,y_test_pred))
        self.lin_reg_train_acc.append(r2_score(y_train,y_train_pred))
        self.lin_reg_test_acc.append(r2_score(y_test,y_test_pred))

    #Build linear regression models
    def linearRegression(self):
        X_train, X_test, y_train, y_test = self.getDataSets()
        self.buildLinRegStatsmodels(X_train, X_test, y_train, y_test)
        #self.buildLinRegSklearn(X_train, X_test, y_train, y_test)
        return

    #Build random forest models
    def randomForest(self):
        X_train, X_test, y_train, y_test = self.getDataSets()
        rfc_b = RFC()
        rfc_b.fit(X_train,y_train)
        y_pred = rfc_b.predict(X_train)
        print('Train accuracy score for random forest:',accuracy_score(y_train,y_pred))
        print('Test accuracy score for random forest:', accuracy_score(y_test,rfc_b.predict(X_test)))
        self.rf_train_acc.append(accuracy_score(y_train,y_pred))
        self.rf_test_acc.append(accuracy_score(y_test,rfc_b.predict(X_test)))
        return
    
    #Build KNN models
    def kNNeighbors(self):
        X_train, X_test, y_train, y_test = self.getDataSets()
        knn = KNeighborsClassifier()
        knn.fit(X_train,y_train)
        y_pred = knn.predict(X_train)
        print('Train accuracy score for KNN:',accuracy_score(y_train,y_pred))
        print('Test accuracy score for KNN:',accuracy_score(y_test,knn.predict(X_test)))
        self.knn_train_acc.append(accuracy_score(y_train,y_pred))
        self.knn_test_acc.append(accuracy_score(y_test,knn.predict(X_test)))
        return
    
    #check results of the models
    def checkResults(self):
        print("Test accuracy of lin reg: ", (sum(self.lin_reg_test_acc)/len(self.lin_reg_test_acc)))
        print("Test accuracy of RF: ", (sum(self.rf_test_acc)/len(self.rf_test_acc)))
        print("Test accuracy of KNN: ", (sum(self.knn_test_acc)/len(self.knn_test_acc)))

    def main(self, num_runs):
        self.readCsvData()
        self.getDataInfo()
        #self.showDataTrends()
        i = 0
        while i < num_runs:
            self.linearRegression()
            self.randomForest()
            self.kNNeighbors()
            i += 1
        self.checkResults()

buildModels = buildModels()
num_runs = 10
buildModels.main(num_runs)


### MODEL RESULTS
# Test accuracy of lin reg:  0.8100664845126587
# Test accuracy of RF:  0.13603603603603603
# Test accuracy of KNN:  0.048048048048048055

# LINEAR REGRESSION COEFFS
#y = -513.692444 + has_issues*4634.716541 + has_wiki*-2568.089355 + has_projects*-1783.853471 + forks_count*0.145594 + open_issues_count*3.807028 + subscribers_count*22.076769 + num_topics*346.543219 + num_branches*43.965901
# const                -513.692444
# has_issues           4634.716541
# has_wiki            -2568.089355
# has_projects        -1783.853471
# forks_count             0.145594
# open_issues_count       3.807028
# subscribers_count      22.076769
# num_topics            346.543219
# num_branches           43.965901