import {CircularProgress} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import './App.scss';
import Home from './page/sign/main/Home';
import Signin from './page/sign/Signin';
import {setIsAuth} from './redux/slice/User';
import {RootState, useAppDispatch} from './redux/store';

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(setIsAuth(!!window.localStorage.getItem('token')));

    if (!isAuth) {
      navigate('/register');
    } else if (location.pathname === '/') {
      navigate('/');
    }
    setIsLoading(false);
  }, [isAuth]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/register' element={<Signin />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
