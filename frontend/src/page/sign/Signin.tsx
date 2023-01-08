import { Typography, Button, Box, Modal, TextField, IconButton } from '@mui/material';
import React, { useState } from 'react'
import classes from './Signin.module.scss'
import  {makeStyles} from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import FormModal from '../../components/FormModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';

const Signin:React.FC = ()=> {
 const loginFormSchema = yup
   .object({
     username: yup.string().email('Неверный Email').required('Введите Ваш Email'),
     password: yup
       .string()
       .min(6, 'Минимальная  длина пароля 6 символов')
       .required('Введите пароль'),
   })
   .required();

   const registerFormSchema = yup
     .object({
       email: yup.string().email('Неверный Email').required('Введите Ваш Email'),
       fullname: yup.string().required('Введите свое ФИО'),
       username: yup.string().required('Введите свои имя'),
       password: yup
         .string()
         .min(6, 'Минимальная  длина пароля 6 символов')
         .required('Введите пароль'),
       password2: yup.string()
         .required()
         .oneOf([yup.ref('password'), null], 'Пароли не совпадают '),
     })
     .required();

 const [onLogin, setOnLogin] = useState<boolean>(false);
  const [onRegister, setOnRegister] = useState<boolean>(false);
 
  const hundlerLoginOpen = ()=>{
  setOnLogin(!onLogin);
  }

  const hundlerRegisterOpen = () => {
    setOnRegister(!onRegister);
  };

  const onCloseModalClick = (setCloseModal: React.Dispatch<React.SetStateAction<boolean>>) => {
    setCloseModal(false);
  };


  return (
    <div className={classes.wrapper}>
      <div className={classes.blueside}></div>
      <div className={classes.registr}>
        <TwitterIcon />
        <Typography variant="h1">В курсе происходящего</Typography>
        <Typography variant="h3">Присоединяйтесь к Твиттеру прямо сейчас!</Typography>

        <Modal
          open={onLogin}
          onClose={hundlerLoginOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box className={classes.modal}>
            <IconButton
              color="primary"
              aria-label="Закрыть"
              style={{ width: '40px', alignSelf: 'flex-end' }}
              onClick={() => onCloseModalClick(setOnLogin)}>
              <CloseIcon />
            </IconButton>
            <FormModal
              inputs={['Email', 'Пароль']}
              button={'Войти'}
              schema={loginFormSchema}
              schemaName={['username', 'password']}
              formType={'login'}
              closeModal={setOnLogin}
            />
          </Box>
        </Modal>
        <Modal
          open={onRegister}
          onClose={hundlerRegisterOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box className={classes.modal}>
            <IconButton
              color="primary"
              aria-label="Закрыть"
              style={{ width: '40px', alignSelf: 'flex-end' }}
              onClick={() => onCloseModalClick(setOnRegister)}>
              <CloseIcon />
            </IconButton>
            <FormModal
              inputs={['Email', 'Полное ФИО', 'Имя пользователя', 'Пароль', 'Подтвердите пароль']}
              button={'Зарегистрироваться'}
              schema={registerFormSchema}
              schemaName={['email', 'fullname', 'username', 'password', 'password2']}
              formType={'register'}
              closeModal={setOnRegister}
            />
          </Box>
        </Modal>
        <Button variant="contained" onClick={hundlerRegisterOpen}>
          Зарегистрироваться
        </Button>
        <Button
          variant="outlined"
          onClick={hundlerLoginOpen}
          style={{ width: '205px', marginTop: '20px' }}>
          войти
        </Button>
      </div>
    </div>
  );
}

export default Signin