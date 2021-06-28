import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, makeStyles, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import api from '../../../utils/api';

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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));

function initial_state() {
    return {
        "class_id": "",
        "topic_date": ""
    }
}

export default function UpdateTopic() {   
    const classes = useStyles();
    const { token } = useContext(AuthContext);
    const history = useHistory();
    const { id, response } = useAppContext();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [payload, setPayload] = useState(initial_state)
    const [classesInfo, setClassesInfo] = useState([
        {
            value: '',
            label: ''
        }
    ]);
    
    useEffect(() => {        
        const selectedItem = response.filter(item => id === item.id ? item : null)
        
        setPayload(selectedItem[0])
        setSelectedDate(selectedItem[0]["topic_date"])

    }, [setPayload, id, response])
    
    function onChange(event) {
        const { value, name } = event.target;
        setPayload({
            ...payload,
            [name]: value,
        })
    };

    const handleDateChange = (date) => {
       
        setSelectedDate(date);
        // 2021-06-25 00:27:27.23189
        const months = {
            'Jan': '01',
            'Feb': '02',
            'Mar': '03',
            'Apr': '04',
            'May': '05',
            'Jun': '06',
            'Jul': '07',
            'Aug': '08',
            'Sep': '09',
            'Oct': '10',
            'Nov': '11',
            'Dec': '12'
        }
        const splited_date = date.toString().split(" ")
        
        const str_date = `${splited_date[3]}-${months[splited_date[1]]}-${splited_date[2]} ${splited_date[4]}`
        setPayload({ ...payload, "topic_date": str_date })
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
            await api.post("api/v1/topics", payload, config)

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

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Atualizar Aula
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
                                                </MenuItem> :
                                                <div></div>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Selecione a data da aula"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Time picker"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <form className={classes.container} noValidate>
                                        <TextField
                                            id="datetime-local"
                                            label="Selecione a data da aula"
                                            type="datetime-local"
                                            defaultValue={selectedDate}
                                            className={classes.textField}
                                            value={selectedDate}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                                </Grid> */}
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
    )
}