import React from "react";

const Newsitem = (props)=> {

    let { title, description, ImageUrl, NewsUrl, author, date,source} = props;
    return (
      <div>
        <div className="card my-2">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: "82%",zIndex: '1'}}>
                {source} 
              </span>
          <img src={ImageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}...{" "}
              
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                by {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={NewsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
