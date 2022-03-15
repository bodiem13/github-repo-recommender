export default class MakeAPiCalls{
    static getDataElements(){
        return true
    }

    static buildApiUrl(repoUrl){
        const mySplitUrl = repoUrl.split("github.com/")
        let apiEnd = mySplitUrl[1]
        const apiUrl = "https://api.github.com/repos/" + apiEnd
        console.log(apiUrl)

        return apiUrl
    }


} 