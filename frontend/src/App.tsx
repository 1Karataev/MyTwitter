import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import SideBar from './components/SideBar';
import Home from './page/sign/main/Home';
import TweetView from './page/sign/main/TweetView';
import Signin from './page/sign/Signin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Signin />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
