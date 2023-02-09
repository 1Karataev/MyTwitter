import {Avatar, Typography, Menu, MenuItem} from '@mui/material';
import React, {useEffect, useState} from 'react';
import styles from './UserInfo.module.scss';




const UserInfo: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const onMenuClick = (e: { stopPropagation: () => void; preventDefault: () => void; }) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenMenu((prev) => !prev);
  };

  return (

    <div className={styles.container} onClick={onMenuClick}>
      <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
      <Typography>
        <b style={{fontSize: '16px', textDecoration: 'none'}}>{'user.fullname'}</b>
        <br />
        <span style={{fontSize: '12px', opacity: '0.8'}}>{`@${'user.username'}`}</span>
      </Typography>
      <Menu
        id="basic-menu"
        open={openMenu}
        anchorEl={null}
        onClose={onMenuClick}
        sx={{'& .MuiMenu-paper': {
          width: '250px',
          top: 'auto !important',
          left: '80px',
          bottom: '110px',
          borderRadius: '20px ',
        }}
        }
      >
        <MenuItem>Мой профиль</MenuItem>
        <MenuItem>Выйти</MenuItem>
      </Menu>
    </div>



  );
};

export default UserInfo;
