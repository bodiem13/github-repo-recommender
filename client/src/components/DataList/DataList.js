import React from 'react'


//add props
function DataList(props){
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
                    </div>
                    )
            })}
        </div>
    )
}

export default DataList