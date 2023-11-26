import React, { Component } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    country:'in',
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    category:PropTypes.string
  }
  defaultImage = "https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_960_720.jpg"
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 13
    }
    document.title=`${this.capitalize(this.props.category)}-News~Crawler`
  }
  capitalize=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  makeApiRequest = async (bias) => {
    this.setState({loading:false})
    await axios.get(`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + bias}&pageSize=12`).then((res) => {
      console.log(`${this.props.category}:-${res.data.articles}`)
      this.setState({
        page: this.state.page + bias,
        articles: res.data.articles,
        loading: true,
        totalResults: res.data.totalResults
      });
    });
  }
  componentDidMount() {
    this.makeApiRequest(0)
  }
  handlePrevious = async () => {
    this.makeApiRequest(-1)
  }
  handleNext = async () => {
    this.makeApiRequest(1)
  }
  render() {
    // const {sources,country}=this.props
    const { articles, loading } = this.state
    if (!loading) {
      return <div className='text-center'>
        <Spinner className="text-center"></Spinner>
      </div>
    }
    return (
      <div className='container'>
        <div className="d-flex justify-content-center strong">
          <h2 className='fs-1 fw-bold my-3 mg-auto'>News~Crawler - Top Headlines from {this.capitalize(this.props.category)}</h2>
        </div>
        
        <div className="row my-2">
          {this.state.loading && articles.map((element) => {
            return <div className="col-md-4 mb-3" key={element.url}>
              <NewsItem title={!element.title ? " " : element.title} description={!element.description ? " " : element.description} imageUrl={!element.urlToImage ? this.defaultImage : element.urlToImage} newsUrl={element.url}></NewsItem>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevious}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 12)} type="button" id="nextBtn" className="btn btn-primary" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
