import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({    
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
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

export default function UpdateUser() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    
    const handleUpdate = () => {
        setActiveStep(activeStep + 1);
    };
   
    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Atualizar Usuário
                    </Typography>                    
                    <React.Fragment>
                        <React.Fragment>                            
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="Nome"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Sobrenome"
                                        fullWidth
                                        autoComplete="last-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="username"
                                        name="username"
                                        label="Username"
                                        fullWidth
                                        autoComplete="username"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="password"
                                        name="password"
                                        label="Senha"
                                        fullWidth
                                        autoComplete="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        label="E-mail"
                                        fullWidth
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="entity"
                                        name="entity"
                                        label="Função"
                                        fullWidth
                                        autoComplete="entity"
                                    />
                                </Grid>
                            </Grid>
                            <div className={classes.buttons}>                                
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdate}
                                    className={classes.button}
                                    disabled={activeStep === 1}
                                >
                                    Atualizar
                                </Button>
                            </div>
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}