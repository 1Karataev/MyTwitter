import {Avatar, Typography, Menu, MenuItem} from '@mui/material';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLazyGetUserQuery} from '../../redux/RTK/Servis';
import {setUser} from '../../redux/slice/User';
import {useAppDispatch} from '../../redux/store';
import styles from './UserInfo.module.scss';

const UserInfo: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [fetchUser, {data, isLoading, error}] = useLazyGetUserQuery();

  const onMenuClick = (e: {stopPropagation: () => void; preventDefault: () => void}) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenMenu((prev) => !prev);
  };

  useLayoutEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isLoading)
      dispatch(
        setUser({
          fullname: data?.data.fullname as string,
          username: data?.data.username as string,
          email: data?.data.email as string,
          id: data?.data._id as string,
          // eslint-disable-next-line comma-dangle
        }),
      );
  }, [isLoading]);

  const onLogoutClick = () => {
    window.localStorage.removeItem('token');
    navigate('/register');
  };

  const onUserPageClick = () => {
    navigate(`/user/${data?.data._id}`);
  };

  return (
    <div className={styles.container} onClick={onMenuClick}>
      <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
      {!isLoading ? (
        <Typography>
          <b style={{fontSize: '16px', textDecoration: 'none'}}>{`${data?.data.username}`}</b>
          <br />
          <span style={{fontSize: '12px', opacity: '0.8'}}>{`@${`${data?.data.email}`}`}</span>
        </Typography>
      ) : (
        <></>
      )}

      <Menu
        id='basic-menu'
        open={openMenu}
        anchorEl={null}
        onClose={onMenuClick}
        sx={{
          '& .MuiMenu-paper': {
            width: '250px',
            top: 'auto !important',
            left: '80px',
            bottom: '110px',
            borderRadius: '20px ',
          },
        }}
      >
        <MenuItem onClick={onUserPageClick}>Мой профиль</MenuItem>
        <MenuItem onClick={onLogoutClick}>Выйти</MenuItem>
      </Menu>
    </div>
  );
};

export default UserInfo;
