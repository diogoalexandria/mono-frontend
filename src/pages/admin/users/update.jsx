import { Container } from '@material-ui/core';
import React from 'react';
import Header from '../../../components/header';
import { makeStyles } from '@material-ui/core/styles';
import { useAdminContext } from '../../../components/store/admin/context';

const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }    
  }));


export default function UpdateUser() {
    const classes = useStyles();
    const { entities } = useAdminContext()

    return(
        <React.Fragment>            
            <Header entities={entities} >
                <Container className={classes.container}>Update User Page</Container> 
            </Header>
        </React.Fragment>
    )
}