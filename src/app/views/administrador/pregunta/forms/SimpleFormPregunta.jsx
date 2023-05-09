import { Button, Icon, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { createPREGUNTA } from '../../../../redux/actions/PreguntaActions'
import { addPregunta } from 'app/store/reducers/preguntasSlice';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const SimpleFormPregunta = () => {
  const [datos, setDatos] = useState({ predsc: '' });
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { predsc } = datos;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addPregunta(datos));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Agrego con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/pregunta/');
  };

  const handleChange = (event) => {
    event.persist();
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/pregunta');
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="predsc"
              id="standard-basic"
              onChange={handleChange}
              value={predsc || ''}
              validators={['required', 'minStringLength: 4']}
              label="Descripcion (Largo min. 4)"
              errorMessages={['Se requiere este campo']}
            />
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
export default SimpleFormPregunta;
