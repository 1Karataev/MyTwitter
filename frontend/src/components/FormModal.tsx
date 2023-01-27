import {Alert, Box, Button, CircularProgress, Modal, Snackbar, TextField} from '@mui/material';
import React, {ReactNode, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ILogin, useLoginMutation, useRegisterMutation} from '../redux/RTK/Servis';
import {useAppDispatch} from '../redux/store';
import {setIsAuth} from '../redux/slice/User';
import {AlertColor} from '@mui/material/Alert';


interface IFormModal {
  inputs: Array<string>;
  button: string;
  schema: any;
  schemaName: Array<string>;
  formType: 'register' | 'login';
  closeModal: Function;
}

const FormModal: React.FC<IFormModal> = ({
  inputs,
  button,
  schema,
  schemaName,
  formType,
  closeModal,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const [login, {}] = useLoginMutation();
  const [register, {isLoading}] = useRegisterMutation();

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [statusSnackbar, setStatusSnackbar] = useState<string>('success');
  const [messageSnackbar, setMessageSnackbar] = useState<string>('');

  const onSubmit = async(data: any) => {
    if ((formType === 'register')) {
      const response = await register(data).unwrap();

      if (response.status === 'success') {
        setStatusSnackbar(response.status);
        setMessageSnackbar('Вы успешно зарегистрировались!');
        setOpenSnackbar(true);

        setTimeout(() => {
          closeModal(false);
        }, 2000);
      } else if (response.status === 'error') {
        setStatusSnackbar(response.status);
        setMessageSnackbar('Попробуйте другой email');
        setOpenSnackbar(true);
      }
    } else if ((formType === 'login')) {
      const response = await login(data)
        .unwrap()
        .catch(() => {
          setStatusSnackbar('error');
          setMessageSnackbar('Неверный email или пароль');
          setOpenSnackbar(true);
        });

      if (response?.status === 'success') {
        setStatusSnackbar(response.status);
        setMessageSnackbar('Вы вошли в аккаунт!');
        setOpenSnackbar(true);

        setTimeout(() => {
          window.localStorage.setItem('token', response.data.token);
          dispatch(setIsAuth(!!window.localStorage.getItem('token')));
        }, 1000);
      }
    }
  };

  const getTypeInput = (inputName: string): string => {
    return inputName === 'password' || inputName === 'password2' ? 'password' : '';
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
      onSubmit={handleSubmit(onSubmit)}>
      {inputs.map((value, index, array) => (
        <Controller
          name={schemaName[index]}
          key={index}
          control={control}
          rules={{required: true}}
          defaultValue=""
          render={({field}) => (
            <TextField
              {...field}
              style={{width: '90%', margin: '10px 0 0 0'}}
              label={value}
              variant="standard"
              type={getTypeInput(schemaName[index])}
              helperText={errors[schemaName[index]]?.message as ReactNode}
              error={!!errors[schemaName[index]]}
            />
          )}
        />
      ))}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={statusSnackbar as AlertColor}
          sx={{width: '100%'}}>
          {`${messageSnackbar}`}
        </Alert>
      </Snackbar>

      <Button
        type="submit"
        variant="contained"
        style={{borderRadius: '30px', margin: '10px 0 20px 0', width: '90%'}}>
        {isLoading ? <CircularProgress /> : button}
      </Button>
    </form>
  );
};

export default FormModal;
