export default class MakeAPiCalls{
    static async fetchApiData(apiUrl){
        const apiData = fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                console.log(typeof(data))
                }
            )
        return apiData
        
    }

    static buildApiUrl(repoUrl){
        const mySplitUrl = repoUrl.split("github.com/")
        let apiEnd = mySplitUrl[1]
        const apiUrl = "https://api.github.com/repos/" + apiEnd
        console.log(apiUrl)

        return apiUrl
    }

    static buildBranchesApiUrl(repoUrl){
        const mySplitUrl = repoUrl.split("github.com/")
        let apiEnd = mySplitUrl[1]
        const branchesUrl = "https://api.github.com/repos/" + apiEnd + "/branches"
        console.log(branchesUrl)

        return branchesUrl
    }
} 