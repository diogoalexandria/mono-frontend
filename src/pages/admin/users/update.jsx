import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, MenuItem, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useAppContext } from '../../../components/store/app/context';
import api from '../../../utils/api';
import AuthContext from '../../../components/store/auth/context';
import { useHistory } from 'react-router-dom';
import Users from '.';

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

export default function UpdateUser() {
    const classes = useStyles();
    const history = useHistory();
    const { token } = useContext(AuthContext);
    const { id, response } = useAppContext();
    const [courses, setCourses] = useState([]);

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
                  return {value: course["id"], label: course["name"]}
                }
              })
    
              setCourses(coursesList)          
            })
    
        } catch (err) {
          console.log(err)
        }
    
      }, [token, setCourses])

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
    }

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
                            </Grid>
                            <div className={classes.buttons}>
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