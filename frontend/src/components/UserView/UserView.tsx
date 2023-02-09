import {Avatar, Typography, Menu, MenuItem, Paper} from '@mui/material';
import React, {useEffect, useState} from 'react';
import styles from './UserView.module.scss';




const UserView: React.FC = () => {
  return (

    <Paper variant='outlined' className={styles.styles}>
      <Paper variant='outlined'>
        <div>
          <Typography variant='h6'>
            TESTETS
          </Typography>
          <Typography variant='caption' display='block' gutterBottom>
                65 ndbnjd
          </Typography>
        </div>
      </Paper>
    </Paper>



  );
};

export default UserView;
