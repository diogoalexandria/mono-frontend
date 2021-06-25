import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, InputLabel, Paper, Switch, withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory } from 'react-router-dom';
import AuthContext from '../store/auth/context';
import api from '../../utils/api';
import { useEffect } from 'react';
import { useAppContext } from '../store/app/context';

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

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);


export default function BaseForm({ type, entity, fields, options, is_topic, initial_state, api_path, return_path }) {
    const classes = useStyles();
    const history = useHistory();
    const { token } = useContext(AuthContext);
    const { id, response } = useAppContext();
    const [payload, setPayload] = useState(initial_state)
    const [state, setState] = useState({ checked: true });    
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    useEffect(() => {
        if (type !== "create") {
            const selectedItem = response.filter(item => id === item.id ? item : null)
            setPayload(selectedItem[0])
            if (selectedItem[0]["status"] !== "active") {
                setState({ checked: false })
            }
        }       
        
    }, [type, setPayload, id, response, setState])

    const handleForm = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        }
        try {
            if (type === "create") {
                await api.post(api_path, payload, config)
            } else {
                await api.patch(api_path + id, payload, config)
            }
            history.push(return_path)
        } catch (err) {
            console.log(err)
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
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

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Criar {entity}
                    </Typography>
                    <React.Fragment>
                        <React.Fragment>
                            <Grid container spacing={3}>
                                {fields.map((object) => {
                                    return (
                                        <Grid item xs={12}>
                                            <TextField
                                                id={object["name"]}
                                                name={object["name"]}
                                                label={object["label"]}
                                                fullWidth
                                                autoComplete={object["name"]}
                                                value={payload[object["name"]]}
                                                onChange={onChange}
                                            />
                                        </Grid>
                                    )
                                })}
                                {type === 'update-switch' ?
                                    <Grid item xs={12}>
                                        <Typography component="div">
                                            <Grid component="label" container alignItems="center" spacing={1}>
                                                <Grid item>Desativado</Grid>
                                                <Grid item>
                                                    <AntSwitch checked={state.checked} onChange={handleChange} name="checked" />
                                                </Grid>
                                                <Grid item>Ativado</Grid>
                                            </Grid>
                                        </Typography>
                                    </Grid> :
                                    <div></div>
                                }
                                {type === 'update-selector' ?
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="age-native-simple">Status</InputLabel>
                                        <Select
                                            native
                                            value={state.age}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-native-simple',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            {options.map((option, index) => {
                                                return <option value={index}>{option}</option>
                                            })}
                                        </Select>
                                    </Grid> :
                                    <div></div>
                                }
                                {is_topic === true ?
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
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
                                    : <div></div>
                                }
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
                                    {type === 'create' ? 'Criar' : 'Atualizar'}
                                </Button>
                            </div>
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}