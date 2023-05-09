import { Button, Icon, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
//import { get_USER, updateUSER} from '../../../../redux/actions/UsersActions'
import { fetchUserbyId, updateUser } from 'app/store/reducers/usersSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const Formcontrol = styled(FormControl)(() => ({
  width: 300,
  marginBottom: '16px'
}));
const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));
const SimpleFormUpdateUsers = () => {
  const location = useLocation();
  const user = useSelector((state) => state.users.userUnique);
  const [datos, setDatos] = useState({
    username: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: ''
  });
  //const [rolName, setRolName] = React.useState([]);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { username, nombre, apellido, email, rol } = datos;
  const roles = ['SA', 'ADMIN', 'EDITOR', 'GUEST'];

  useEffect(() => {
    dispatch(fetchUserbyId({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setDatos(user);
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser({ id: location.state.identificador, user: datos }));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Guardo con Exito',
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

  const handleChangeCombo = (event) => {
    //setRolName(event.target.value);
    setDatos({ ...datos, rol: event.target.value });
  };

  const handleCancel = (event) => {
    navigate('/appusers/');
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
              label="Nombre"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              type="text"
              name="apellido"
              id="standard-basic"
              onChange={handleChange}
              value={apellido || ''}
              validators={['required']}
              label="Apellido"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              type="text"
              name="email"
              id="standard-basic"
              onChange={handleChange}
              value={email || ''}
              validators={['required']}
              label="Correo"
              errorMessages={['Se requiere este campo']}
            />

            <Formcontrol>
              <InputLabel id="demo-simple-select-label" name="rol">
                Rol
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Rol"
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

export default SimpleFormUpdateUsers;
