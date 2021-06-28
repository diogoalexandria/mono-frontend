import { Button, Grid, makeStyles, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';
// import BaseForm from '../../../components/baseForm';

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

function initial_state() {
    return {        
        "class_id": "",
        "student_id": ""      
    }
}


export default function CreateClasses() {
    const classes = useStyles();
    const { token } = useContext(AuthContext);
    const history = useHistory();
    const [payload, setPayload] = useState(initial_state)
    const [classesInfo, setClassesInfo] = useState([
        {
            value: '',
            label: ''
        }
    ]);
    const [students, setStudents] = useState([
        {
            value: '',
            label: ''
        }
    ]);   

    function onChange(event) {        
        const { value, name } = event.target;
        setPayload({
            ...payload,
            [name]: value,
        })
    };

    const handleBack = () => {
        history.goBack();
    };

    const handleForm = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        }
        try {
            await api.post("api/v1/subscriptions", payload, config)

            history.goBack()
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            const getClasses = async () => await api.get("/api/v1/classes", config)            
            getClasses()
                .then((response) => {
                    let classesList = response.data.map((class_item) => {
                        if (class_item["status"] === "active") {
                            return { value: class_item["id"], label: class_item["name"] }
                        }
                        return null
                    })

                    setClassesInfo(classesList)
                })           

        } catch (err) {
            console.log(err)
        }

    }, [token, setClassesInfo]);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            
            const getStudents = async () => await api.get("/api/v1/users", config)
            
            getStudents()
                .then((response) => {
                    let studentsList = response.data.map((student) => {
                        if (student["status"] === "active" && student["entity"] === "student") {
                            return { value: student["id"], label: `${student["first_name"]} ${student["last_name"]}` }
                        }
                        return null
                    })
                    
                    setStudents(studentsList)
                })

        } catch (err) {
            console.log(err)
        }

    }, [token, setStudents]);

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Criar Inscrição
                    </Typography>
                    <React.Fragment>
                        <React.Fragment>
                            <Grid container spacing={3}>                                
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="class"
                                        select
                                        name="class_id"
                                        label="Turma"
                                        fullWidth
                                        onChange={onChange}
                                        value={payload.class_id}
                                        helperText="Selecione a turma"
                                    >
                                        {classesInfo.map((subject) => (
                                            subject ?
                                            <MenuItem key={subject.value} value={subject.value}>
                                                {subject.label}
                                            </MenuItem>:
                                            <div></div>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="student"
                                        select
                                        name="student_id"
                                        label="Estudante"
                                        fullWidth
                                        onChange={onChange}
                                        value={payload.student_id}
                                        helperText="Selecione o/a estudante"
                                    >
                                        {students.map((student) => (
                                            student ?
                                                <MenuItem key={student.value} value={student.value}>
                                                    {student.label}
                                                </MenuItem>:
                                                <div></div>
                                        ))}
                                    </TextField>
                                </Grid>                              
                            </Grid>
                            <div className={classes.buttons}>
                                <Button onClick={handleBack} className={classes.button}>
                                    Voltar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => { handleForm() }}
                                >
                                    Criar
                                </Button>
                            </div>
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}