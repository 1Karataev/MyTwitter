import { Button, Grid, IconButton, LinearProgress, makeStyles, Paper, styled, TextField, Typography} from '@mui/material'
import React, { useEffect } from 'react'
import TwitForm from '../../../components/TwitForm';
import PostForm from '../../../components/PostForm';
import SideBar from '../../../components/SideBar';
import { fetchTweets} from '../../../redux/slice/Tweets';
import { RootState, useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
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

const dispatch = useAppDispatch()

useEffect(()=>{
    dispatch(fetchTweets())
  },[dispatch]);

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
        {load ? (
          twee.map((twet: any, i: number) => <TwitForm key={i} text={twet.text} user={twet.user} />)
        ) : (
          <LinearProgress />
        )}
      </Grid>
      <Grid item xs={4} style={{ position: 'sticky', top: '0' }}>
        <CssTextField id="filled-basic" label="Filled" />
      </Grid>
    </Grid>
  );
}

export default Home