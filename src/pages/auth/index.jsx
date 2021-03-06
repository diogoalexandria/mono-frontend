import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AuthContext from '../../components/store/auth/context';
import { useHistory } from 'react-router-dom';
import api from '../../utils/api';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Eduty
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function initialState() {
  return { user: "", password: "" }
}

async function login({ user, password }) {
  // TO DO call to api
  try{
    const response = await api.post('/api/v1/auth', {
      "identity": user,
      "password": password
    })    
    return response.data

  } catch(err) {
    console.log(err)
  }  
}

export default function SignIn() {
  const classes = useStyles();
  const history =  useHistory();
  const [ values, setValues ] = useState(initialState)
  const { setToken, setEntity } = useContext(AuthContext)
  

  function onChange(event) {
      const { value, name } = event.target;      
      setValues({
          ...values,
          [name]: value,
      })
  }

  async function onSubmit(event) {
    event.preventDefault();
    
    const { token, entity } = await login(values); 
    
    if (token) {      
      setToken(token)
      setEntity(entity)
      if (entity === "administrator")
        return history.push('/admin')
      if (entity === "professor")
        return history.push('/professor')
      if (entity === "student")
        return history.push('/student')
    } 

    setValues(initialState)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">
          Eduty
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>        
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Username ou Email"
            name="user"
            autoComplete="user"
            autoFocus
            onChange={onChange}
            value={values.user}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
            value={values.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembre de mim
            "
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>            
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}