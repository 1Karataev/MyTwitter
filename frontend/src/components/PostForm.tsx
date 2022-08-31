import { Avatar, Grid, Paper, IconButton, Button } from '@mui/material';
import React, { useState } from 'react'
import SmileIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PikchlIcon from '@mui/icons-material/CropOriginal';
import { TextareaAutosize } from '@mui/base';

const PostForm:React.FC = () =>  {
  const [tweet, setTweet] = useState<string>('')
  const hundlerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value)
  }
  return (
    <>
      <Paper variant="outlined">
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item xs={1}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
          <Grid item xs={11}>
            <TextareaAutosize style={{width:'400px', height:'200px'}} value={tweet} onChange={hundlerChange}></TextareaAutosize>
            <div>
              <IconButton color="primary" aria-label="add an alarm">
                <PikchlIcon color="primary" />
              </IconButton>
              <IconButton color="primary" aria-label="add an alarm">
                <SmileIcon color="primary" />
              </IconButton>
              <Button variant="contained" style={{ borderRadius: '30px', marginLeft: '50px' }}>
                Твитнуть
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default PostForm