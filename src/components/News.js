import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./spinner";
import propsTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
  const [articles,setarticles] = useState([]);
  const [loading,setloading] = useState(true);
  const [page,setpage] = useState(1);
  const [totalResults,settotalResults] = useState(0);
//  document.title = `${props.category} - NewsApp`



  // 17aa749e596e493f87714f20507276bf
  const updatepage = async()=> { 
    props.setProgress(10);
    const url =
    `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    
    props.setProgress(30);
 setloading(true);
  let data = await fetch(url);
  let pasrsedata = await data.json();
  props.setProgress(70);
  setarticles(pasrsedata.articles)
  settotalResults(pasrsedata.totalResults)
  setloading(false)
  props.setProgress(100);
  }

  useEffect(() => {
    updatepage();

  },[])


 const handleprevclick = async () => {
    // console.log("prev");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=17aa749e596e493f87714f20507276bf&page=${
    //   this.state.page - 1
    // }&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let pasrsedata = await data.json();
    // this.setState({ articles: pasrsedata.articles, page: this.state.page - 1,loading:false });
    setpage(page -1 )
    updatepage();
  };

  const handlenextclick = async () => {
    // console.log("next");
    // if (this.state.page + 2 > Math.ceil(this.state.totalResults / props.pageSize)) {
    // } else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=17aa749e596e493f87714f20507276bf&page=${
    //     this.state.page + 1
    //   }&pageSize=${props.pageSize}`;
    //   this.setState({loading:true})
    //   let data = await fetch(url);
    //   let pasrsedata = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: pasrsedata.articles,
    //     loading:false
        
    //   });
    // }
    setpage(page + 1)
    updatepage();
  };
  const fetchMoreData = async() => {
    setpage(page + 1)
    const url =
    `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
  let data = await fetch(url);
  let pasrsedata = await data.json();
  setarticles(articles.concat(pasrsedata.articles))
  settotalResults(pasrsedata.totalResults)

  };


    return (
      <div className="container my-2">
        <h1 className="text-center" style={{margin: '30px 0'}} >NewsApp - Top {props.category} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
       
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="conatiner">
         <div className="row">
          { articles &&
            articles.map((element) => {
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
      </div>
    );
  
}

News.defaultProps ={
  country:"in",
  pageSize: 8,
  category: "general",
}
News.propsTypes ={
  country: propsTypes.string,
  pageSize: propsTypes.number,
  category: propsTypes.string,
}

export default News;
