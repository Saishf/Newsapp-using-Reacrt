import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./spinner";
import propsTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
 
  const updatepage = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30);
    setloading(true);
    let data = await fetch(url);
    let pasrsedata = await data.json();
    props.setProgress(70);
    setarticles(pasrsedata.articles);
    settotalResults(pasrsedata.totalResults);
    setloading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${props.category} - NewsApp`
    updatepage();
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apikey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setpage(page + 1);
    let data = await fetch(url);
    let pasrsedata = await data.json();
    setarticles(articles.concat(pasrsedata.articles));
    settotalResults(pasrsedata.totalResults);
  };

  return (
    <div className="container my-2">
      <h1
        className="text-center"
        style={{ margin: "30px 0", marginTop: "90px" }}
      >
        NewsApp - Top {props.category} Headlines
      </h1>
      {/* {this.state.loading && <Spinner/>} */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="conatiner">
          <div className="row">
            {articles &&
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
                      NewsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propsTypes = {
  country: propsTypes.string,
  pageSize: propsTypes.number,
  category: propsTypes.string,
};

export default News;
