import React from 'react'

const NewsItem=(props)=>{
  let {title,description,imageUrl,newsUrl}=props
  return (
    <>
      <div className="card h-100" style={{width: "18rem"}}>
        <img src={imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm mt-auto">Read More</a>
          </div>
      </div>
    </>
  )
}

export default NewsItem
