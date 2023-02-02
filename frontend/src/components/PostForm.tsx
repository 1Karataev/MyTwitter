import {Avatar, Grid, Paper, IconButton, Button} from '@mui/material';
import React, {useRef, useState} from 'react';
import SmileIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PikchlIcon from '@mui/icons-material/CropOriginal';
import {TextareaAutosize} from '@mui/base';
import {useAddPhotoMutation, useAddTweetMutation} from '../redux/RTK/Servis';
import styles from './PostForm.module.scss';
import {HighlightOff} from '@mui/icons-material';


 interface IFileObject {
   url: string,
   file: Blob
 }

const PostForm: React.FC = () => {
  const [tweet, setTweet] = useState<string>('');
  const [images, setImages] = useState<Array<IFileObject>>([]);

  const handlerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const fileInput = useRef(null);

  const [addTweet, {}] = useAddTweetMutation();

  const [addPhoto, {}] = useAddPhotoMutation();

  const onFileButtonClick = (): void => {
    if (fileInput.current) {
      (fileInput.current as HTMLInputElement).click();
    }
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileObj = new Blob([event.target.files[0]]);
      setImages((prev) => [...prev, {url: URL.createObjectURL(fileObj), file: fileObj}]);
    }
  };

  const onDeleteImageClick = (url: string) => {
    setImages((prev) => prev.filter((item) => item.url !== url));
  };

  const handlerTweet = async () => {
    const result = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i].file;
      const {url} = await addPhoto(file).unwrap();
      result.push(url);
    }

    await addTweet({
      text: tweet,
      images: result,
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
              style={{width: '100%', height: '200px', marginBottom: '20px', borderRadius: '10px', padding: '10px', resize: 'none'}}
              value={tweet}
              onChange={handlerChange}
            />
            <div className={styles.actions}>
              <div className={styles.imageList}>
                {images.map((url, id) => (
                  <div style={{backgroundImage: `url(${url.url})`}} className={styles.imageList_item} key={id}>
                    <IconButton
                      color='primary'
                      style={{width: '10px', height: '10px', position: 'absolute', right: '0', backgroundColor: 'white'}}
                      onClick={() => onDeleteImageClick(url.url)}>
                      <HighlightOff color='error' />
                    </IconButton>
                  </div>
                ))}
                <IconButton color='primary' aria-label='add an alarm' onClick={onFileButtonClick}>
                  <input ref={fileInput} type='file' hidden onChange={onFileInputChange}/>
                  <label htmlFor='file'>
                    <PikchlIcon color='primary'/>
                  </label>
                </IconButton>
              </div>

              <Button
                variant='contained'
                style={{borderRadius: '30px', marginLeft: '50px'}}
                onClick={handlerTweet}
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
