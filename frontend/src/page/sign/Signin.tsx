import { Typography, Button, Box, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import classes from './Signin.module.scss'
import  {makeStyles} from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import FormModal from '../../components/FormModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


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

 const [onRegistr, setOnRegister] = useState<boolean>(false)

 
const hundlerOpen = ()=>{
setOnRegister(!onRegistr)
}
  return (
    <div className={classes.wrapper}>
      <div className={classes.blueside}></div>
      <div className={classes.registr}>
        <TwitterIcon />
        <Typography variant="h1">В курсе происходящего</Typography>
        <Typography variant="h3">Присоединяйтесь к Твиттеру прямо сейчас!</Typography>

        <Modal
          open={onRegistr}
          onClose={hundlerOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box className={classes.modal}>
            <FormModal
              inputs={['Email', 'Пароль']}
              button={'Войти'}
              schema={loginFormSchema}
              schemaName={['username', 'password']}
            />
          </Box>
        </Modal>
        <Button variant="contained" onClick={hundlerOpen}>
          Зарегистрироваться
        </Button>
        <Button variant="outlined" onClick={hundlerOpen}>
          войти
        </Button>
      </div>
    </div>
  );
}

export default Signin