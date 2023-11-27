import React from 'react'
import NewsItem from './NewsItem'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

const News = (props) => {
  const defaultImage = "https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_960_720.jpg"
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  document.title = `${capitalize(props.category)}-News~Crawler`

  const makeApiRequest = async (bias) => {
    setLoading(false)
    await axios.get(`https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page + bias}&pageSize=12`).then((res) => {
      setArticles(res.data.articles)
      setPage(page + bias)
      setLoading(true)
      setTotalResults(res.data.totalResults)
    });
  }
  useEffect(() => {
    makeApiRequest(0)
  }, [])

  const handlePrevious = async () => {
    await makeApiRequest(-1)
  }
  const handleNext = async () => {
    await makeApiRequest(1)
  }
  if (!loading) {
    return <div className='text-center'>
      <Spinner className="text-center"></Spinner>
    </div>
  }
  return (
    <>
    <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalize(props.category)} Headlines</h1>
    {!loading && <Spinner />}
    <div className='container'>
      

      <div className="row my-2">
        {loading && articles.map((element) => {
          return <div className="col-md-4 mb-3" key={element.url}>
            <NewsItem title={!element.title ? " " : element.title} description={!element.description ? " " : element.description} imageUrl={!element.urlToImage ? defaultImage : element.urlToImage} newsUrl={element.url}></NewsItem>
          </div>
        })}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={page === 1} type="button" className="btn btn-primary" onClick={handlePrevious}>&larr; Previous</button>
        <button disabled={page + 1 > Math.ceil(totalResults / 12)} type="button" id="nextBtn" className="btn btn-primary" onClick={handleNext}>Next &rarr;</button>
      </div>
    </div>
    </>
  )
}
News.defaultProps = {
  country: 'in',
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
}
export default News

