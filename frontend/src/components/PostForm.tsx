import {Avatar, Grid, Paper, IconButton, Button} from '@mui/material';
import React, {useRef, useState} from 'react';
import SmileIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PikchlIcon from '@mui/icons-material/CropOriginal';
import {TextareaAutosize} from '@mui/base';
import {useAddTweetMutation} from '../redux/RTK/Servis';

const PostForm: React.FC = () => {
  const [tweet, setTweet] = useState<string>('');
  const [images, setImages] = useState<Array<string>>([]);

  const hundlerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const fileInput = useRef(null);

  const [addTweet, {}] = useAddTweetMutation();

  const onFileButtonClick = (): void => {
    if (fileInput.current) {
      (fileInput.current as HTMLInputElement).click();
    }
  };

  const onFileInputChange = (event: any) => {
    if (event.target.files) {
      const img = new Blob([event.target.files[0]]);
      setImages((prev) => [...prev, URL.createObjectURL(img)]);
    }
  };


  const hundlerTweet = async () => {
    await addTweet({
      _id: '635ec5ae7a070627f5290e4b',
      text: tweet,
      user: {
        fullname: 'admin',
        username: 'admin',
        avatarURL: 'https://source.unsplash.com/random/100x100?2',
      },
    }).unwrap();
    setTweet('');
  };
  return (
    <>
      <Paper variant='outlined'>
        <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
          <Grid item xs={1}>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </Grid>
          <Grid item xs={11}>
            <TextareaAutosize
              style={{width: '400px', height: '200px'}}
              value={tweet}
              onChange={hundlerChange}
            ></TextareaAutosize>
            <div>
              <div style={{backgroundColor: 'red', display: 'flex'}}>
                {images.map((url) => (
                  <div style={{backgroundImage: `url(${url})`, width: '50px', height: '50px'}}/>
                ))}
              </div>
              <IconButton color='primary' aria-label='add an alarm' onClick={onFileButtonClick}>
                <input ref={fileInput} type='file' hidden onChange={onFileInputChange}/>
                <label htmlFor='file'>
                  <PikchlIcon color='primary' />
                </label>
              </IconButton>
            
              <IconButton color='primary' aria-label='add an alarm'>
                <SmileIcon color='primary' />
              </IconButton>
              <Button
                variant='contained'
                style={{borderRadius: '30px', marginLeft: '50px'}}
                onClick={hundlerTweet}
              >
                Твитнуть
              </Button>
            </div>
            
            
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PostForm;
