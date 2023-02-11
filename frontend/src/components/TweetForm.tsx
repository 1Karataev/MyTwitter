import {IconButton, Typography, Avatar, Paper, Tooltip, Button} from '@mui/material';
import React, {useEffect} from 'react';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import RepeatIcon from '@mui/icons-material/RepeatOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReplyIcon from '@mui/icons-material/ReplyOutlined';
import {User} from '../redux/slice/Tweets';
import style from './TweetForm.module.scss';
import mediumZoom, {ZoomSelector} from 'medium-zoom';
import {useDeleteTweetMutation} from '../redux/RTK/Servis';
import {formDate} from '../helpers/helpers';

type Twit = {
  text: string;
  user: User;
  images?: Array<string>;
  id: string;
  createAt?: string;
};

const TweetForm: React.FC<Twit> = ({text, user, images, id, createAt}) => {
  useEffect(() => {
    mediumZoom(document.querySelectorAll('#img') as ZoomSelector);
  }, [images]);

  const [deleteTweet, {}] = useDeleteTweetMutation();

  const onDeleteTweetClick = () => {
    deleteTweet(id);
  };

  return (
    <Paper variant='outlined' className={style.container}>
      <div className={style.userInfo}>
        <Avatar alt='Remy Sharp' src={user.avatarURL} style={{margin: '5px 0 0 10px'}} />
        <Typography>
          <b style={{fontSize: '16px', textDecoration: 'none'}}>{user.fullname}</b>
          <br />
          <span style={{fontSize: '12px', opacity: '0.8'}}>{`@${user.username}`}</span>
        </Typography>
      </div>

      <Typography variant='body1' gutterBottom style={{margin: '10px 0 0 70px'}}>
        {text}
      </Typography>
      <div className={style.imageContainer} id='test'>
        {images?.map((image, i) => (
          <img
            id='img'
            src={image}
            style={{backgroundImage: `url(${image})`}}
            className={style.image}
            key={i}
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        ))}
      </div>
      <div>
        <span style={{fontSize: '12px', opacity: '0.8', marginLeft: '20px'}}>
          Создано {formDate(new Date(createAt as string))} назад
        </span>
      </div>
      <div>
        <IconButton color='primary' aria-label='add an alarm'>
          <CommentIcon color='primary' />
        </IconButton>
        <IconButton color='primary' aria-label='add an alarm'>
          <RepeatIcon color='primary' />
        </IconButton>
        <IconButton color='primary' aria-label='add an alarm'>
          <LikeIcon color='primary' />
        </IconButton>
        <IconButton color='primary' aria-label='add an alarm'>
          <ReplyIcon color='primary' />
        </IconButton>
      </div>
      <Tooltip
        disableFocusListener
        disableTouchListener
        onOpen={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        PopperProps={{
          sx: {
            '& .MuiTooltip-tooltip': {
              backgroundColor: 'white',
            },
          },
        }}
        title={
          <div className={style.buttonsInTooltip}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              Редактировать
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDeleteTweetClick();
              }}
            >
              Удалить
            </Button>
          </div>
        }
      >
        <div
          style={{
            position: 'absolute',
            top: '15px',
            right: '10px',
            backgroundColor: 'white',
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div className={style.tooltip}>
            <span
              style={{
                borderRadius: '50%',
                width: '4px',
                height: '4px',
                backgroundColor: 'grey',
                content: ' ',
                display: 'block',
              }}
            />

            <span
              style={{
                borderRadius: '50%',
                width: '4px',
                height: '4px',
                backgroundColor: 'grey',
                content: ' ',
                display: 'block',
              }}
            />
            <span
              style={{
                borderRadius: '50%',
                width: '4px',
                height: '4px',
                backgroundColor: 'grey',
                content: ' ',
                display: 'block',
              }}
            />
          </div>
        </div>
      </Tooltip>
    </Paper>
  );
};

export default TweetForm;
