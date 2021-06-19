import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React, { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
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

export default function ListEntity({ identity, entity, columns, create_path, update_path, details_path }) {
    const classes = useStyles();
    const history = useHistory();
    const [checked, setChecked] = useState([]);
    const [values, setValues] = useState([0, 1, 2, 3])

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

    const handleDeletion = (value) => {
        const currentIndex = values.indexOf(value);
        const newValues = [...values]
        newValues.splice(currentIndex, 1);
        setValues(newValues)
    }

    return (
        <React.Fragment>
            {identity === "administrator" ?
                <Button variant="contained" color="primary" onClick={() => handleNavigate(create_path)}>
                    Criar {entity}
                </Button> :
                <div></div>
            }
            <Button variant="contained" disabled={checked.length === 0} onClick={() => { identity === "administrator" ? handleNavigate(update_path) : handleNavigate(details_path) }}>
                {identity === "administrator" ? `Atualizar ${entity}` : `Detalhes ${entity}`}
            </Button>
            <List className={classes.root}>
                <ListItem dense >
                    <ListItemIcon className={classes.checkbox}>
                    </ListItemIcon>
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
                            <ListItemIcon className={classes.checkbox}>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            {columns.map((column) => {
                                return (
                                    <ListItemText id={labelId} primary={`${column} ${value + 1}`} />
                                )
                            })}
                            {identity === "administrator" ?
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => { handleDeletion(value) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction> :
                                <div></div>
                            }
                        </ListItem>
                    );
                })}
            </List>
        </React.Fragment>
    )
}