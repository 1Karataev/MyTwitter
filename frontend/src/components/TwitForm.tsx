import { IconButton, Typography, Avatar, Paper, Tooltip, Button } from '@mui/material';
import React from 'react';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import RepeatIcon from '@mui/icons-material/RepeatOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReplyIcon from '@mui/icons-material/ReplyOutlined';
import { User } from '../redux/slice/Tweets';
import style from './TweetForm.module.scss'

type Twit = {
  text: string;
  user: User;
};

const TwitForm: React.FC<Twit> = ({ text, user }) => {
  return (
    <Paper variant="outlined" onClick={() => console.log(user.username)}>
      <Avatar alt="Remy Sharp" src={user.avatarURL} />
      <Typography>
        <b style={{ fontSize: 'small' }}>{user.fullname}</b> <span>{`@${user.username}`}</span>
      </Typography>
      <Typography variant="body1" gutterBottom>
        {text}
      </Typography>
      <div>
        <IconButton color="primary" aria-label="add an alarm">
          <CommentIcon color="primary" />
        </IconButton>
        <IconButton color="primary" aria-label="add an alarm">
          <RepeatIcon color="primary" />
        </IconButton>
        <IconButton color="primary" aria-label="add an alarm">
          <LikeIcon color="primary" />
        </IconButton>
        <IconButton color="primary" aria-label="add an alarm">
          <ReplyIcon color="primary" />
        </IconButton>
      </div>
      <Tooltip
        disableFocusListener
        disableTouchListener
        onOpen={() => {
          console.log(111);
        }}
        title={<Button>test2</Button>}>
        <div style={{position:'absolute', top: '15px',right:'10px',}}>
          <div className={style.tooltip}>
            <span
              style={{
                borderRadius: '50%',
                width: '15px',
                height: '15px',
                backgroundColor: 'grey',
                content: ' ',
                display: 'block',
              }}
            />

            <span
              style={{
                borderRadius: '50%',
                width: '15px',
                height: '15px',
                backgroundColor: 'grey',
                content: ' ',
                display: 'block',
              }}
            />
            <span
              style={{
                borderRadius: '50%',
                width: '15px',
                height: '15px',
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

export default TwitForm;
