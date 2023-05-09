import { Button, Icon, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { createUSER } from '../../../../redux/actions/UsersActions'
import { addUser } from 'app/store/reducers/usersSlice';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));
const Formcontrol = styled(FormControl)(() => ({
  width: 300,
  marginBottom: '16px'
}));

const SimpleFormTipoSocio = () => {
  const [datos, setDatos] = useState({
    username: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: ''
  });
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const { username, nombre, apellido, email, rol } = datos;
  const roles = ['SA', 'ADMIN', 'EDITOR', 'GUEST'];

  const handleSubmit = (event) => {
    event.preventDefault();
    //dispatch(createUSER(state));
    //const usernameselected = {username: user.username}
    //const usernamecreated = { username: state.username };
    dispatch(addUser(datos));
    //, usernamecreated));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Agrego con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/appusers/');
  };

  const handleChange = (event) => {
    event.persist();
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/appusers');
  };

  const handleChangeCombo = (event) => {
    //setRolName(event.target.value);
    setDatos({ ...datos, rol: event.target.value });
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="username"
              id="standard-basic"
              onChange={handleChange}
              value={username || ''}
              validators={['required', 'minStringLength: 4']}
              label="Username"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              type="text"
              name="nombre"
              id="standard-basic"
              onChange={handleChange}
              value={nombre || ''}
              validators={['required']}
              label="Name"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              type="text"
              name="apellido"
              id="standard-basic"
              onChange={handleChange}
              value={apellido || ''}
              validators={['required']}
              label="Last Name"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              type="text"
              name="email"
              id="standard-basic"
              onChange={handleChange}
              value={email || ''}
              validators={['required']}
              label="Email"
              errorMessages={['Se requiere este campo']}
            />

            <Formcontrol>
              <InputLabel id="demo-simple-select-label" name="rol">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Role"
                value={rol || ''}
                onChange={handleChangeCombo}
                displayEmpty
              >
                {/* <MenuItem disabled value="" ><em>Seleccione...</em></MenuItem> */}
                {roles.map((rols) => (
                  <MenuItem key={rols} value={rols}>
                    {rols}
                  </MenuItem>
                ))}
              </Select>
            </Formcontrol>
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          <Icon>check_circle</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Aceptar</Span>
        </Button>
        <Span sx={{ pl: 1, textTransform: 'capitalize' }}></Span>
        <Button color="secondary" variant="contained" onClick={handleCancel}>
          <Icon>cancel</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Cancelar</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};
export default SimpleFormTipoSocio;
