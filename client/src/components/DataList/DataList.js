import React from 'react'
import APIService from '../../APIService/APIService'


//add props
function DataList(props){
    
    //notifies parent
    const editBtn = (article) => {
        //notify app.js which article has been clicked
        props.editBtn(article)

    }

    const deleteBtn = (article) => {
        APIService.DeleteArticle(article.id)
        .then(() => props.deleteBtn(article))
        .catch(error => console.log(error))
    }


    return(
        <div>
            {/*iterate through api call response with map*/}
            {/*checks if there are articles in props. If no articles, will not execute */}
            {props.articles && props.articles.map(article => {
                return (
                    <div key = {article.id}>
                        <hr/>
                        <h4 className = 'text-grey-600'>{article.title}</h4>
                        <p>{article.description}</p>
                        <div className = "row">
                            <div className = "col-md-1">
                            <button className = "btn btn-primary" onClick = {() => editBtn(article)}>Update</button>
                            </div>
                            <div className = "col">
                            <button className = "btn btn-danger" onClick = {() => deleteBtn(article)}>Delete</button>
                            </div>
                            
                        </div>
                    </div>
                    )
            })}
        </div>
    )
}

export default DataList