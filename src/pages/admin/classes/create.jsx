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
        "name": "",
        "subject_id": "",
        "professor_id": ""    
    }
}



export default function CreateClasses() {
    const classes = useStyles();
    const { token } = useContext(AuthContext);
    const history = useHistory();
    const [payload, setPayload] = useState(initial_state)
    const [subjects, setSubjects] = useState([
        {
            value: '',
            label: ''
        }
    ]);
    const [professors, setProfessors] = useState([
        {
            value: '',
            label: ''
        }
    ]);

    useEffect(() => {
        console.log(payload)
    }, [payload])

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
            await api.post("api/v1/classes", payload, config)

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
            const getSubjects = async () => await api.get("/api/v1/subjects", config)            
            getSubjects()
                .then((response) => {
                    let subjectsList = response.data.map((subject) => {
                        if (subject["status"] === "active") {
                            return { value: subject["id"], label: subject["name"] }
                        }
                        return null
                    })

                    setSubjects(subjectsList)
                })           

        } catch (err) {
            console.log(err)
        }

    }, [token, setSubjects]);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            
            const getProfessors = async () => await api.get("/api/v1/users", config)
            
            getProfessors()
                .then((response) => {
                    let professorsList = response.data.map((professor) => {
                        if (professor["status"] === "active" && professor["entity"] === "professor") {
                            return { value: professor["id"], label: `${professor["first_name"]} ${professor["last_name"]}` }
                        }
                        return null
                    })
                    console.log(professorsList)
                    setProfessors(professorsList)
                })

        } catch (err) {
            console.log(err)
        }

    }, [token, setProfessors]);

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Criar Turma
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
                                        value={payload["name"]}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="subject"
                                        select
                                        name="subject_id"
                                        label="Matéria"
                                        fullWidth
                                        onChange={onChange}
                                        value={payload.subject_id}
                                        helperText="Selecione a matéria"
                                    >
                                        {subjects.map((subject) => (
                                            <MenuItem key={subject.value} value={subject.value}>
                                                {subject.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField

                                        id="professor"
                                        select
                                        name="professor_id"
                                        label="Professor"
                                        fullWidth
                                        onChange={onChange}
                                        value={payload.professor_id}
                                        helperText="Selecione o/a professor(a)"
                                    >
                                        {professors.map((professor) => (
                                            professor ?
                                                <MenuItem key={professor.value} value={professor.value}>
                                                    {professor.label}
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