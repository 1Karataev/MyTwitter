import {
  Grid,
  InputAdornment,
  LinearProgress,
  Paper,
  styled,
  TextField,
  // eslint-disable-next-line comma-dangle
  Typography,
} from '@mui/material';
import React, {useEffect} from 'react';
import TweetForm from '../../../components/TweetForm';
import PostForm from '../../../components/PostForm';
import SideBar from '../../../components/SideBar';
import {setLoad, Tweet} from '../../../redux/slice/Tweets';
import {useAppDispatch} from '../../../redux/store';
import {useLazyGetPostsQuery} from '../../../redux/RTK/Servis';
import {Link, Route, Routes} from 'react-router-dom';
import TweetView from './TweetView';
import UserInfo from '../../../components/userInfo/UserInfo';
import styles from './Home.module.scss';
import UserView from '../../../components/UserView/UserView';
import SearchIcon from '@mui/icons-material/Search';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    border: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '.MuiTextField-root': {
      backgroundColor: '#c0c3c9',
    },
  },
});

const Home: React.FC = () => {
  const [fetchPost, {data, isLoading, error}] = useLazyGetPostsQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchPost();

    dispatch(setLoad(false));
  }, []);

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='flex-start'>
      <Grid item xs={2} className={styles.leftContainer}>
        <SideBar />
        <UserInfo />
      </Grid>
      <Grid item xs={6} style={{height: '100%'}}>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Paper variant='outlined'>
                  <Typography variant='h1'>Главная</Typography>
                </Paper>
                <PostForm />
                {!isLoading ? (
                  data?.data.map((tweet: Tweet, i: number) => (
                    <Link
                      key={i}
                      to={`tweet/:${tweet._id}`}
                      style={{position: 'relative', textDecoration: 'none'}}
                    >
                      <TweetForm
                        key={i}
                        id={tweet._id}
                        text={tweet.text}
                        user={tweet.user}
                        images={tweet.images}
                        createAt={tweet.createAt}
                      />
                    </Link>
                  ))
                ) : (
                  <LinearProgress />
                )}
              </>
            }
          />

          <Route path='/tweet/:id' element={<TweetView />} />
          <Route path='/user/:id' element={<UserView />} />
        </Routes>
      </Grid>
      <Grid item xs={4} style={{position: 'sticky', top: '0'}}>
        <CssTextField
          id='filled-basic'
          style={{
            backgroundColor: 'rgb(226 229 235)',
            borderRadius: '20px',
            margin: '20px',
            height: '50px',
          }}
          placeholder='Поиск по Твиттеру'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
