import {Avatar, Typography, Menu, MenuItem, Paper, Tabs, Tab, IconButton} from '@mui/material';
import React, {useEffect, useState} from 'react';
import styles from './UserView.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



const UserView: React.FC = () => {
  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (

    <Paper variant='outlined' className={styles.wrapper}>
      <Paper variant='outlined'>
        <div className={styles.header}>
          <IconButton color="primary" aria-label="back" style={{float: 'inline-start'}}>
            <ArrowBackIosIcon/>
          </IconButton>
          <Typography variant='h3'>
            UserName
          </Typography>
          <Typography variant='caption' display='block' gutterBottom>
                65 твитов
          </Typography>
        </div>
        <div className={styles.block}/>
        <div className={styles.headerInfo}>
          <Avatar
            className={styles.avatar}
          />
          <h4>Name</h4>
          <h6>@nickname</h6>
        </div>

        <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" variant='fullWidth'>
          <Tab label="Твиты"/>
          <Tab label="Медиа"/>
          <Tab label="Твиты и ответы"/>
          <Tab label="Нравится" />
        </Tabs>
        <div hidden={value === 0}>
          Item One
        </div>
      </Paper>
    </Paper>



  );
};

export default UserView;
