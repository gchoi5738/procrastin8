import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import VideoPage from "./components/VideoPage";

function App() {
  return (
    <div className='app' style={{backgroundColor: "#343a40"}}>
      <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/play" element={<VideoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
