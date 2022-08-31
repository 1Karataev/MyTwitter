import { Typography, Button, Box, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import classes from './Signin.module.scss'
import  {makeStyles} from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';



const Signin:React.FC = ()=> {
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
        <Button variant="contained" onClick={hundlerOpen}>
          Зарегистрироваться
        </Button>
        <Modal
          open={onRegistr}
          onClose={hundlerOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box>
            <TextField id="standard-basic" label="Standard" variant="standard" />

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
        <Button variant="outlined" onClick={hundlerOpen}>
          войти
        </Button>
      </div>
    </div>
  );
}

export default Signin