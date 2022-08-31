import { IconButton, Typography, Avatar, Paper } from '@mui/material';
import React from 'react'
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import RepeatIcon from '@mui/icons-material/RepeatOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReplyIcon from '@mui/icons-material/ReplyOutlined';
import { User } from '../redux/slice/Tweets';
import { Navigate } from 'react-router-dom';


 type Twit = {
  text:string,
  user: User
}

const TwitForm:React.FC<Twit> = ({text, user})=> {
  return (
    <>
      <Paper variant="outlined" onClick={()=>console.log(user.username)}>
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
      </Paper>
    </>
  );
}

export default TwitForm