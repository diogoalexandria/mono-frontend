
import { Select } from '@material-ui/core';
import { Button, Grid, InputLabel, makeStyles, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../../components/store/app/context';
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
        "class_id": "",
        "student_id": "",
        "status": ""
    }
}
export default function UpdateClasses() {
    const classes = useStyles();
    const { token } = useContext(AuthContext);
    const { id, response } = useAppContext();
    const history = useHistory();
    const [payload, setPayload] = useState(initial_state)
    const [state, setState] = React.useState({ checked: true });
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

    useEffect(() => {
        const selectedItem = response.filter(item => id === item.id ? item : null)
        setPayload(selectedItem[0])
        if (selectedItem[0]["status"] !== "active") {
            setState({ checked: false })
        }
    }, [setPayload, id, response, setState])

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
            await api.patch(`api/v1/classes/${id}`, payload, config)

            history.goBack()
        } catch (err) {
            console.log(err)
        }
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        if (event.target.checked) {
            setPayload({
                ...payload,
                "status": "active"
            })
        } else {
            setPayload({
                ...payload,
                "status": "deactivated"
            })
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

                    setSubjects(classesList)
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

            const getStudents = async () => await api.get("/api/v1/users", config)

            getStudents()
                .then((response) => {
                    let studentsList = response.data.map((student) => {
                        if (student["status"] === "active" && student["entity"] === "student") {
                            return { value: student["id"], label: `${student["first_name"]} ${student["last_name"]}` }
                        }
                        return null
                    })
                    
                    setProfessors(studentsList)
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
                        Atualizar Inscrições
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
                                        {subjects.map((subject) => (
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

                                        id="student"
                                        select
                                        name="student_id"
                                        label="Estudante"
                                        fullWidth
                                        onChange={onChange}
                                        value={payload.student_id}
                                        helperText="Selecione o/a estudante"
                                    >
                                        {professors.map((professor) => (
                                            professor ?
                                                <MenuItem key={professor.value} value={professor.value}>
                                                    {professor.label}
                                                </MenuItem> :
                                                <div></div>
                                        ))}
                                    </TextField>
                                </Grid>                                
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="age-native-simple">Status</InputLabel>
                                    <Select
                                        native
                                        value={payload.status}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        {["active", "approved", "disapproved", "canceled"].map((option, index) => {
                                            return <option value={option}>{option}</option>
                                        })}
                                    </Select>
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
                                    Atualizar
                                </Button>
                            </div>
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}