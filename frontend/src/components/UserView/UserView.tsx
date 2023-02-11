import {
  Avatar,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  // eslint-disable-next-line comma-dangle
  LinearProgress,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import styles from './UserView.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import TweetForm from '../TweetForm';
import {Tweet} from '../../redux/slice/Tweets';
import {useLazyGetPostsQuery} from '../../redux/RTK/Servis';

const UserView: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const [fetchPost, {data, isLoading, error}] = useLazyGetPostsQuery();

  useEffect(() => {
    fetchPost();
  }, []);

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Paper variant='outlined' className={styles.wrapper}>
      <Paper variant='outlined'>
        <div className={styles.header}>
          <IconButton
            color='primary'
            aria-label='back'
            style={{float: 'inline-start'}}
            onClick={() => {
              navigate('/');
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant='h3'>{user?.username}</Typography>
          <Typography variant='caption' display='block' gutterBottom>
            {data?.data.filter((tweet) => tweet.user._id === user?.id).length} твитов
          </Typography>
        </div>
        <div className={styles.block} />
        <div className={styles.headerInfo}>
          <Avatar className={styles.avatar} />
          <h4>{user?.fullname}</h4>
          <h6>@{user?.email}</h6>
        </div>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='disabled tabs example'
          variant='fullWidth'
        >
          <Tab label='Твиты' />
          <Tab label='Медиа' />
          <Tab label='Твиты и ответы' />
          <Tab label='Нравится' />
        </Tabs>
        <div hidden={value === 0}>
          Здесь должны быть лайки и так далее, но я подустал делать этот проект и начал делать
          другой с новым стеком)
        </div>
        <div hidden={value !== 0}>
          {!isLoading ? (
            data?.data.map((tweet: Tweet, i: number) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              tweet.user?._id === user?.id ? (
                <Link
                  key={i}
                  to={`/tweet/:${tweet._id}`}
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
              ) : (
                <></>
                // eslint-disable-next-line comma-dangle
              ),
            )
          ) : (
            <LinearProgress />
          )}
        </div>
      </Paper>
    </Paper>
  );
};

export default UserView;
