import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import AuthContext from '../../../components/store/auth/context';
import { useAppContext } from '../../../components/store/app/context';
import api from '../../../utils/api';

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
    const { token } = useContext(AuthContext);
    const { id, setResponse } = useAppContext();
    const [checked, setChecked] = useState([]);    
    const [presences] = useState(true);
    const [users, setUsers] = useState([]);
    const [payload, setPayload] = useState({
        "attendances": []
    });
    
    const columns = ['ID', 'Aluno'];
   
    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            const getUsers = async () => await api.get(`/api/v1/users_topic/${id}`, config)

            getUsers()
                .then((response) => {                    
                    let usersList = response.data.map((user) => [user["id"], `${user["first_name"]} ${user["last_name"]}`])
                    
                    setUsers(usersList)                    
                })

        } catch (err) {
            console.log(err)
        }

    }, [token, setUsers, setResponse, id])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        const attendances = [ ...payload["attendances"], {"topic_id": id, "student_id": value }]
        
        setPayload({"attendances": attendances })
        setChecked(newChecked);
    };

    const handleNavigate = (path) => {
        history.push(path)
    }

    const handleAttendance = async () => {
        console.log(token)
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        await api.post(`/api/v1/attendances`, payload, config)  
        handleNavigate("/professor/topics/details/attendances")
    }
    
    return (
        <React.Fragment>

            <Button variant="contained" color="primary" onClick={() => handleNavigate("/professor/topics/details/photo")}>
                Tirar Foto
            </Button>
            <Button variant="contained" disabled={checked.length === 0} onClick={handleAttendance}>
                Registrar presenças
            </Button>
            <Button color="secondary" disabled={!presences} onClick={() => handleNavigate("/professor/topics/details/attendances")}>
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
                {users.map((user) => {
                    const labelId = `checkbox-list-label-${user[0]}`;

                    return (
                        <ListItem key={user[0]} role={undefined} dense button onClick={handleToggle(user[0])}>
                            {type !== "details" ?
                                <ListItemIcon className={classes.checkbox}>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(user[0]) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon> :
                                <div></div>
                            }
                            {user.map((column) => {
                                return (
                                    <ListItemText id={labelId} primary={`${column}`} />
                                )
                            })}                            
                        </ListItem>
                    );
                })}
            </List>
        </React.Fragment>
    )
}
