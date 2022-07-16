import { Grid, IconButton, makeStyles, styled, TextField} from '@mui/material'
import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/LocalPostOffice';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListIcon from '@mui/icons-material/ListAlt';
import UserIcon from '@mui/icons-material/Person';
import classes from './Home.module.scss'

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



  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
      <Grid item xs={2}>
        <ul className={classes.homeul}>
          <li>
            <IconButton color="primary" aria-label="add an alarm">
              <TwitterIcon color="primary" />
            </IconButton>
          </li>
          <li>
            <IconButton color="primary" aria-label="add an alarm">
              <SearchIcon color="primary" />
            </IconButton>
          </li>
          <li>
            <IconButton color="primary" aria-label="add an alarm">
              <NotificationsIcon color="primary" />
            </IconButton>
          </li>
          <li>
            <IconButton color="primary" aria-label="add an alarm">
              <MessageIcon color="primary" />
            </IconButton>
          </li>
          <li>
            <IconButton color="primary" aria-label="add an alarm">
              <BookmarkIcon color="primary" />
            </IconButton>
          </li>
          <li>
            <IconButton color="primary" aria-label="add an alarm">
              <ListIcon color="primary" />
            </IconButton>
          </li>
          <li>
            <IconButton color="primary" aria-label="add an alarm">
              <UserIcon color="primary" />
            </IconButton>
          </li>
          <li></li>
        </ul>
      </Grid>
      <Grid item xs={6}>
        hgfhfh
      </Grid>
      <Grid item xs={4}>
        <CssTextField id="filled-basic" label="Filled"  />
      </Grid>
    </Grid>
  );
}

export default Home