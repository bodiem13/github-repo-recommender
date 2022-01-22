import React from 'react'

function Form(props){



    return(
        <div>
            Form
            {/*First part checks to make sure we have an article in our props!! Does not run if we do not have an article */}
            {props.article && props.article.title}
        </div>
    )
}

export default Form