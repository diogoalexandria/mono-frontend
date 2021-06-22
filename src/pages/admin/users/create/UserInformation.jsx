import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function UserInformation({ setPayload, payload }) {

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
            name="entity"
            label="Função"
            fullWidth
            autoComplete="entity"
            onChange={onChange}
            value={payload.entity}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}