import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
   BrowserRouter as Router,
   Route,
   Routes,
 } from "react-router-dom";

import React, { Component } from 'react'




export default class App extends Component {
  render() {
    return (
      
      <div> 
        <Router>
          
        <Navbar/>
        
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={8} country="in" category="general" />} />
          <Route exact path="/business" element={<News key="business" pageSize={8} country="in" category="Business" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={8} country="in" category="Entertainment" />} />
          <Route exact path="/general" element={<News key="general" pageSize={8} country="in" category="General" />} />
          <Route exact path="/health" element={<News key="health" pageSize={8} country="in" category="Health" />} />
          <Route exact path="/science" element={<News key="science" pageSize={8} country="in" category="Science" />} />
          <Route exact path="/sports" element={<News key="sports" pageSize={8} country="in" category="Sports" />} />
          <Route exact path="/technology" element={<News key="Technology" pageSize={8} country="in" category="Technology" />} />
      </Routes>
        </Router>
      </div>
    )
  }
}

