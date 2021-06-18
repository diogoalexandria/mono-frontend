import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, Paper, Switch, withStyles } from '@material-ui/core';
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

const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);
  

export default function BaseForm({ type, entity }) {
    const classes = useStyles();
   
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
      });

      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Criar {entity}
                    </Typography>
                    <React.Fragment>
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Nome"
                                        fullWidth
                                        autoComplete="name"
                                    />
                                </Grid>
                                {type === 'update'? 
                                <Grid item xs={12}>
                                    <Typography component="div">
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            <Grid item>Desativado</Grid>
                                            <Grid item>
                                                <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                            </Grid>
                                            <Grid item>Ativado</Grid>
                                        </Grid>
                                    </Typography>
                                </Grid>:
                                <div></div>
                                }                                
                            </Grid>
                            <div className={classes.buttons}>
                                <Button
                                    variant="contained"
                                    color="primary"                                    
                                    className={classes.button}                                    
                                >
                                    {type === 'create' ? 'Criar' : 'Atualizar'}
                                </Button>
                            </div>
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}