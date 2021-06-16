import React from 'react';
import Header from '../../../components/header';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { useAdminContext } from '../../../components/store/admin/context';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function Users() {
    const classes = useStyles();
    const history = useHistory();
    const { entities } = useAdminContext()
    console.log(entities)
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);        
        const newChecked = []; 

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleNavigate = (path) => {
        history.push(path)
    }   

    return (
        <React.Fragment>
            <Header entities={entities} >
                <Button variant="contained" color="primary" onClick={() => handleNavigate("/admin/users/create")}>
                    Criar 
                </Button>
                <Button variant="contained" disabled={checked.length === 0} onClick={() => handleNavigate("/admin/users/update")}>
                    Atualizar
                </Button>
                <List className={classes.root}>
                    <ListItem key={"test"} dense >
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary={'ID'} />
                        <ListItemText primary={'Nome'} />
                        <ListItemText primary={'Sobrenome'} />
                        <ListItemText primary={'Função'} />
                        <ListItemText primary={'Status'} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" >
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                            <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`ID ${value + 1}`} />
                                <ListItemText id={labelId} primary={`Nome ${value + 1}`} />
                                <ListItemText id={labelId} primary={`Sobrenome ${value + 1}`} />
                                <ListItemText id={labelId} primary={`Funcao ${value + 1}`} />
                                <ListItemText id={labelId} primary={`Status ${value + 1}`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Header>
        </React.Fragment>
    )
}