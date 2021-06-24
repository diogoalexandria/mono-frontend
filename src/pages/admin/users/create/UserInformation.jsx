import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import { useEffect } from 'react';
import AuthContext from '../../../../components/store/auth/context';
import api from '../../../../utils/api';

export default function UserInformation({ setPayload, payload }) {
  const { token } = useContext(AuthContext);  
  const [courses, setCourses] = useState([]);

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

  function onChange(event) {
    const { value, name } = event.target;
    setPayload({
      ...payload,
      [name]: value,
    })
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Registrar Informações
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="first_name"
            label="Nome"
            fullWidth
            autoComplete="given-name"
            onChange={onChange}
            value={payload.first_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="last_name"
            label="Sobrenome"
            fullWidth
            autoComplete="last-name"
            onChange={onChange}
            value={payload.last_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            fullWidth
            autoComplete="username"
            onChange={onChange}
            value={payload.username}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            type="password"
            label="Senha"
            fullWidth
            autoComplete="password"
            onChange={onChange}
            value={payload.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="E-mail"
            fullWidth
            autoComplete="email"
            onChange={onChange}
            value={payload.email}
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
            value={payload.entity}
            helperText="Selecione o tipo do usuário"
          >
            {entitites.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {payload.entity === "student" ?
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
              value={payload.course}
              helperText="Selecione o curso"
            >
              {courses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>:
          <div></div>
        }
      </Grid>
    </React.Fragment>
  );
}