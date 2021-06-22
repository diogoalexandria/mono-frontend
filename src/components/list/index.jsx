import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React, { useContext, useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import api from '../../utils/api';
import AuthContext from '../store/auth/context';
import { useAppContext } from '../store/app/context';

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

export default function ListEntity({ type, identity, entity, columns, create_path, update_path, details_path, list }) {
    const classes = useStyles();    
    const history = useHistory();
    const { token } = useContext(AuthContext);
    const { setId } = useAppContext();
    const [checked, setChecked] = useState([]);
    const [values, setValues] = useState([])

    useEffect(() => {
        setValues(list)        
    }, [setValues, list])

    const handleToggle = (value) => () => {
        setId(value[0])        
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

    const handleDeletion = async (value) => {        

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        }
        await api.delete(`/api/v1/users/${value[0]}`, config)

        const currentIndex = values.indexOf(value);
        console.log(currentIndex)
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
            {type !== "details" ?
                <Button variant="contained" disabled={checked.length === 0} onClick={() => { identity === "administrator" ? handleNavigate(update_path) : handleNavigate(details_path) }}>
                    {identity === "administrator" ? `Atualizar ${entity}` : `Detalhes ${entity}`}
                </Button> :
                <div></div>
            }
            <List className={classes.root}>
                <ListItem key={"1"} dense >
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
                {values.map((value, index) => {
                    const labelId = `checkbox-list-label-${index}`;

                    return (
                        <ListItem key={labelId} role={undefined} dense button onClick={handleToggle(value)}>
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
                            {value.map((column, index) => {
                                return (
                                    <ListItemText key={index} id={value.length > 0 ? column : 1} primary={`${column}`} />
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
