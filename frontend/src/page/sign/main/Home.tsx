import { Button, Grid, IconButton, LinearProgress, makeStyles, Paper, styled, TextField, Typography} from '@mui/material'
import React, { useEffect } from 'react'
import TwitForm from '../../../components/TwitForm';
import PostForm from '../../../components/PostForm';
import SideBar from '../../../components/SideBar';
import { fetchTweets, setLoad, setTweets, Tweet, User} from '../../../redux/slice/Tweets';
import { RootState, useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { useLazyGetPostQuery } from '../../../redux/RTK/Servis';
import { Route, Routes } from 'react-router-dom';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey',
    },
    '&:hover fieldset': {
      borderColor: 'blue',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const Home:React.FC = () =>{
const [fetchPost,{ data, isLoading, error}] = useLazyGetPostQuery()

const dispatch = useAppDispatch()

useEffect(()=>{
  fetchPost('');
 dispatch(fetchTweets())
  
  
  
  dispatch(setLoad(false))
  },[]);


const load = useSelector((state: RootState) => state.tweets.load);
const twee = useSelector((state:RootState)=> state.tweets.tweet)

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
      <Grid item xs={2} style={{ position: 'sticky', top: '0' }}>
        <SideBar />
      </Grid>
      <Grid item xs={6}>
        <Paper variant="outlined">
          <Typography variant="h1">Главная</Typography>
        </Paper>
        <PostForm />
        <Routes>
          <Route
            path="/home"
            element={
              !isLoading ? (
                data?.map((twet: Tweet, i: number) => (
                  <TwitForm key={i} text={twet.text} user={twet.user} />
                ))
              ) : (
                <LinearProgress />
              )
            }></Route>
        </Routes>
      </Grid>
      <Grid item xs={4} style={{ position: 'sticky', top: '0' }}>
        <CssTextField id="filled-basic" label="Filled" />
      </Grid>
    </Grid>
  );
}

export default Home