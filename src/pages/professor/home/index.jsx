import { Container } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default function AdminHome() {
    const classes = useStyles();  

    return (
        <React.Fragment>
            <Container className={classes.container}>Olá, Professor(a)</Container>
        </React.Fragment>
    )
}