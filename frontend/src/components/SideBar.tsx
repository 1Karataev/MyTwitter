import {IconButton} from '@mui/material';
import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/LocalPostOffice';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListIcon from '@mui/icons-material/ListAlt';
import UserIcon from '@mui/icons-material/Person';
import classes from '../page/sign/main/Home.module.scss';
import {useNavigate} from 'react-router-dom';

const SideBar: React.FC = () => {
  const history = useNavigate();

  const onTwitterClick = () => {
    history('/');
  };

  return (
    <ul className={classes.homeUrl}>
      <li onClick={onTwitterClick}>
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
  );
};

export default SideBar;
