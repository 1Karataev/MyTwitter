import { Box, Button, Modal, TextField } from '@mui/material';
import React, { ReactNode } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation } from '../redux/RTK/Servis';


interface IFormModal {
  inputs: Array<string>;
  button: string;
  schema: any;
  schemaName: Array<string>;
}

const FormModal: React.FC<IFormModal> = ({ inputs, button, schema, schemaName }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [login, {}] = useLoginMutation();
  
  const onSubmit = async (data: any) => {
    console.log(data)
   const response =  await login(data).unwrap();
    console.log(response)
  };

  return (
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((value, index, array) => (
          <Controller
            name={schemaName[index]}
            key={index}
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                style={{ width: '90%', margin:'10px 0 0 0' }}
                label={value}
                variant="standard"
                helperText={errors[schemaName[index]]?.message as ReactNode}
                error={!!errors[schemaName[index]]}
              />
            )}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          style={{ borderRadius: '30px', marginTop: '10px', width: '90%' }}
          onClick={() => console.log(errors)}>
          {button}
        </Button>
      </form>
   
  );
};

export default FormModal