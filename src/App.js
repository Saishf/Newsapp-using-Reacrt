import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
   BrowserRouter as Router,
   Route,
   Routes,
 } from "react-router-dom";

import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'




export default class App extends Component {
  pagesize=8;
  apikey= process.env.REACT_APP_NEWS_API
  
    state ={
      progress:0
    }
    setProgress = (progress) =>{
      this.setState({progress:progress})
    }
  
  render() {
    return (
      
      <div> 
        <Router>
          
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={4}
        progress={this.state.progress}
        
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pagesize} country="in" category="General" />} />
          <Route exact path="/business" element={<News setProgress={this.setProgress}  apikey={this.apikey}key="business" pageSize={this.pagesize} country="in" category="Business" />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pagesize} country="in" category="Entertainment" />} />
          <Route exact path="/general" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pagesize} country="in" category="General" />} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={this.pagesize} country="in" category="Health" />} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={this.pagesize} country="in" category="Science" />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={this.pagesize} country="in" category="Sports" />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress}  apikey={this.apikey}key="Technology" pageSize={this.pagesize} country="in" category="Technology" />} />
      </Routes>
        </Router>
      </div>
    )
  }
}

