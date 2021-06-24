import Users from '.';
import React, { useContext, useState, useEffect } from 'react';
import api from '../../../utils/api';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button, MenuItem, Paper, Switch, withStyles } from '@material-ui/core';
import { useAppContext } from '../../../components/store/app/context';
import AuthContext from '../../../components/store/auth/context';
import { useHistory } from 'react-router-dom';

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

export default function UpdateUser() {
    const classes = useStyles();
    const history = useHistory();
    const { token } = useContext(AuthContext);
    const { id, response } = useAppContext();
    const [courses, setCourses] = useState([]);
    const [state, setState] = React.useState({ checked: true });

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        entity: "",
        password: ""
    })

    const entitites = [
        {
            value: 'administrator',
            label: 'Administrador',
        },
        {
            value: 'professor',
            label: 'Professor',
        },
        {
            value: 'student',
            label: 'Estudante',
        }
    ];

    useEffect(() => {
        const selectedItem = response.filter(item => id === item.id ? item : null)
        setUser(selectedItem[0])
        if (selectedItem[0]["status"] !== "active") {
            setState({ checked: false })
        }
    }, [setUser, id, response])
   

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        try {
            const getCourses = async () => await api.get("/api/v1/courses", config)

            getCourses()
                .then((response) => {
                    let coursesList = response.data.map((course) => {
                        if (course["status"] === "active") {
                            return { value: course["id"], label: course["name"] }
                        }
                        return null
                    })

                    setCourses(coursesList)
                })

        } catch (err) {
            console.log(err)
        }

    }, [token, setCourses]);

    const handleUpdate = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        }

        await api.patch(`api/v1/users/${id}`, user, config)
        history.push("/admin/users")
    };

    function onChange(event) {
        const { value, name } = event.target;
        setUser({
            ...user,
            [name]: value,
        })
    };

    const handleBack = () => {
        history.goBack();
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });        
        if(event.target.checked) {
            setUser({
                ...user,
                "status": "active"
            })
        } else {
            setUser({
                ...user,
                "status": "deactivated"
            })
        }
    };

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Atualizar Usuário
                    </Typography>
                    <React.Fragment>
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="firstName"
                                        name="first_name"
                                        label="Nome"
                                        fullWidth
                                        autoComplete="given-name"
                                        onChange={onChange}
                                        value={user.first_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="lastName"
                                        name="last_name"
                                        label="Sobrenome"
                                        fullWidth
                                        autoComplete="last-name"
                                        onChange={onChange}
                                        value={user.last_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="username"
                                        name="username"
                                        label="Username"
                                        fullWidth
                                        autoComplete="username"
                                        onChange={onChange}
                                        value={user.username}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="Senha"
                                        type="password"
                                        fullWidth
                                        autoComplete="password"
                                        onChange={onChange}
                                        value={user.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="E-mail"
                                        fullWidth
                                        autoComplete="email"
                                        onChange={onChange}
                                        value={user.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="entity"
                                        select
                                        name="entity"
                                        label="Função"
                                        fullWidth
                                        autoComplete="entity"
                                        onChange={onChange}
                                        value={user.entity}
                                        helperText="Selecione o tipo do usuário"
                                    >
                                        {entitites.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                {user.entity === "student" ?
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="course"
                                            select
                                            name="course"
                                            label="Curso"
                                            fullWidth
                                            autoComplete="course"
                                            onChange={onChange}
                                            value={Users.course}
                                            helperText="Selecione o curso"
                                        >
                                            {courses.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid> :
                                    <div></div>
                                }
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
                                    </Grid>
                            </Grid>
                            <div className={classes.buttons}>
                                <Button onClick={handleBack} className={classes.button}>
                                    Voltar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdate}
                                    className={classes.button}
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