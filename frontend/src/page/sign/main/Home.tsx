import {
  Button,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import TwitForm from '../../../components/TwitForm';
import PostForm from '../../../components/PostForm';
import SideBar from '../../../components/SideBar';
import { setLoad, setTweets, Tweet, User } from '../../../redux/slice/Tweets';
import { RootState, useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { useLazyGetPostsQuery } from '../../../redux/RTK/Servis';
import { Link, Route, Routes } from 'react-router-dom';
import TweetView from './TweetView';

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

const Home: React.FC = () => {
  const [fetchPost, { data, isLoading, error }] = useLazyGetPostsQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchPost('');
    // dispatch(fetchTweets())

    dispatch(setLoad(false));
  }, []);

  const load = useSelector((state: RootState) => state.tweets.load);
  const twee = useSelector((state: RootState) => state.tweets.tweet);

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
      <Grid item xs={2} style={{ position: 'sticky', top: '0' }}>
        <SideBar />
      </Grid>
      <Grid item xs={6}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Paper variant="outlined">
                  <Typography variant="h1">Главная</Typography>
                </Paper>
                <PostForm />
                {!isLoading ? (
                  data?.data.map((tweet: Tweet, i: number) => (
                    <Link to={`tweet/:${tweet._id}`} style={{position: 'relative'}}>
                      <TwitForm key={i} text={tweet.text} user={tweet.user} />
                    </Link>
                  ))
                ) : (
                  <LinearProgress />
                )}
              </>
            }
          />

          <Route path="/tweet/:id" element={<TweetView />} />
        </Routes>
      </Grid>
      <Grid item xs={4} style={{ position: 'sticky', top: '0' }}>
        <CssTextField id="filled-basic" label="Filled" />
      </Grid>
    </Grid>
  );
};

export default Home;
