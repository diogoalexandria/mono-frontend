import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserInfo from './UserInformation';
import UserPhoto from './UserPhoto';
import api from '../../../../utils/api';
import AuthContext from '../../../../components/store/auth/context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function initialState() {
  return {
    "username": "teste",
    "email": "teste@eduty.com",
    "password": "1234",
    "first_name": "teste",
    "last_name": "teste",
    "entity": "administrator",
    "course": ""
  }
}

const steps = ['Informações', 'Foto'];

function getStepContent(step, setCheckout, setPayload, payload) {
  switch (step) {
    case 0:
      return <UserInfo setPayload={setPayload} payload={payload} />;
    case 1:
      return <UserPhoto setCheckout={setCheckout} setPayload={setPayload} payload={payload} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function CreateForm() {
  const { token } = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [checkout, setCheckout] = useState(true);
  const [payload, setPayload] = useState(initialState)

  const handleNext = async () => {
    if (activeStep === 0) {
      setActiveStep(activeStep + 1);
    } else {

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      }

      await api.post("/api/v1/users", payload, config)
      history.push("/admin/users")
    }
  };

  const handleBack = () => {
    if (activeStep === steps.length - 1) {
      setActiveStep(activeStep - 1);
      setCheckout(true)
    } else {
      history.goBack()
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Criar Usuário
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep, setCheckout, setPayload, payload)}
            <div className={classes.buttons}>

              <Button onClick={handleBack} className={classes.button}>
                Voltar
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={activeStep === 1 && checkout}
              >
                {activeStep === steps.length - 1 ? 'Cadastrar' : 'Próximo'}
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}