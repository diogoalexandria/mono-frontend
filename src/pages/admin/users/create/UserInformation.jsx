import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function UserInformation() {
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
            name="firstName"
            label="Nome"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Sobrenome"
            fullWidth
            autoComplete="last-name"
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            label="Senha"
            fullWidth
            autoComplete="password"
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="entity"
            name="entity"
            label="Função"
            fullWidth
            autoComplete="entity"
          />
        </Grid>        
      </Grid>
    </React.Fragment>
  );
}