import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './page/sign/main/Home';
import Signin from './page/sign/Signin'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Signin />} />
        <Route path='/' element={<Home/>}/>      
        </Routes>
    </div>
  );
}

export default App;
