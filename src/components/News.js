import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./spinner";
import propsTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps ={
    country:"in",
    pageSize: 8,
    category: "general",
  }
  static propsTypes ={
    country: propsTypes.string,
    pageSize: propsTypes.number,
    category: propsTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.props.category} - NewsApp`
  }

  async updatepage(){ 
    this.props.setProgress(10);
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17aa749e596e493f87714f20507276bf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.props.setProgress(30);

  let data = await fetch(url);
  let pasrsedata = await data.json();
  this.props.setProgress(70);

  this.setState({
    articles: pasrsedata.articles,
    totalResults: pasrsedata.totalResults,
    loading:false,
   
  });
  this.props.setProgress(100);

  }

  async componentDidMount() {
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17aa749e596e493f87714f20507276bf&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    // let data = await fetch(url);
    // let pasrsedata = await data.json();
    // this.setState({
    //   articles: pasrsedata.articles,
    //   totalResults: pasrsedata.totalResults,
    //   loading:false
    // });
    this.updatepage();
  }

  handleprevclick = async () => {
    // console.log("prev");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17aa749e596e493f87714f20507276bf&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let pasrsedata = await data.json();
    // this.setState({ articles: pasrsedata.articles, page: this.state.page - 1,loading:false });
    this.setState({  page: this.state.page - 1})
    this.updatepage();
  };

  handlenextclick = async () => {
    // console.log("next");
    // if (this.state.page + 2 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
    // } else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17aa749e596e493f87714f20507276bf&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    //   let data = await fetch(url);
    //   let pasrsedata = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: pasrsedata.articles,
    //     loading:false
        
    //   });
    // }
    this.setState({  page: this.state.page + 1})
    this.updatepage();
  };
  fetchMoreData = async() => {
    this.setState({page: this.state.page +1})
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17aa749e596e493f87714f20507276bf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
  let data = await fetch(url);
  let pasrsedata = await data.json();
  this.setState({
    articles: this.state.articles.concat(pasrsedata.articles),
    totalResults: pasrsedata.totalResults,
    loading:false,
    totalResults:0
  });
  };

  render() {
    return (
      <div className="container my-2">
        <h1 className="text-center" style={{margin: '30px 0'}} >NewsApp - Top {this.props.category} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
       
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="conatiner">
         <div className="row">
          { this.state.articles &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    ImageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"
                    }
                    NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            &#8592; Previous
          </button>

          <button
            disabled={
              this.state.page +2 > Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handlenextclick}
          >
            {" "}
            Next &#8594;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
