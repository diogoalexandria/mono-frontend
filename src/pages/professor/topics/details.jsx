import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    checkbox: {
        Width: '5%',

    }
}));

export default function ProfessorTopicsDetails({ type, identity, entity, create_path, update_path, details_path }) {
    const classes = useStyles();
    const history = useHistory();
    const [checked, setChecked] = useState([]);
    const [values ] = useState([0, 1, 2, 3])
    const [presences ] = useState(true)
    const columns = ['ID', 'Aluno']

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

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

            <Button variant="contained" color="primary" onClick={() => handleNavigate("/professor/topics/details/photo")}>
                Tirar Foto
            </Button>
            <Button variant="contained" disabled={checked.length === 0} onClick={() => handleNavigate("/professor/topics/details/photo")}>
                Registrar presenças
            </Button>
            <Button color="secondary" disabled={!presences} onClick={() => handleNavigate("/professor/topics/details/presences")}>
                Mostrar presenças
            </Button>
            <List className={classes.root}>
                <ListItem dense >
                    {type !== "details" ?
                        <ListItemIcon className={classes.checkbox}>
                        </ListItemIcon> :
                        <div></div>
                    }
                    {columns.map((column) => {
                        return (
                            <ListItemText primary={column} />
                        )
                    })}
                    {identity === "administrator" ?
                        <ListItemSecondaryAction>
                            <IconButton edge="end" >
                            </IconButton>
                        </ListItemSecondaryAction> :
                        <div></div>
                    }
                </ListItem>
                {values.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                            {type !== "details" ?
                                <ListItemIcon className={classes.checkbox}>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon> :
                                <div></div>
                            }
                            {columns.map((column) => {
                                return (
                                    <ListItemText id={labelId} primary={`${column} ${value + 1}`} />
                                )
                            })}                            
                        </ListItem>
                    );
                })}
            </List>
        </React.Fragment>
    )
}
