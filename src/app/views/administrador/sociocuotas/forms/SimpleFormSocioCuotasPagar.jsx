import {
  Button,
  Icon
  /*     Grid,        
    FormControl, */
} from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { createSOCIOCUOTAPAGO, startSOCIOCUOTAPAGO } from '../../../../redux/actions/SocioCuotasActions'
import { addSocioCuotaPago, setStatus } from 'app/store/reducers/sociocuotaSlice';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const SimpleFormSocioCuotasPagar = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ cuonro: '' });
  const { cuonro } = datos;
  let pago_ok = useSelector((state) => state.sociocuotas.status);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addSocioCuotaPago(datos));
  };

  const handleCancel = (event) => {
    navigate('/');
  };

  const handleChange = (event) => {
    event.persist();
    //if (event.target.value) {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
    //}
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      dispatch(addSocioCuotaPago(datos));
    }
  };

  useEffect(() => {
    if (pago_ok) {
      if (pago_ok === 'succeeded') {
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Pago fue Registrado con Exito',
          showConfirmButton: false,
          timer: 2000
        });
      }
      if (pago_ok === 'failed') {
        MySwal.fire({
          position: 'center',
          icon: 'error',
          //title: '',
          text: 'Pago registrado O No se Encuentra Codigo de Barra o Nro. Recibo',
          showConfirmButton: false,
          timer: 2000
        });
      }
      if (pago_ok === 'exist') {
        MySwal.fire({
          position: 'center',
          icon: 'error',
          title: 'El Pago YA Fue Registrado',
          text: 'con el Codigo de Barra o Nro. Recibo ',
          showConfirmButton: false,
          timer: 2000
        });
      }
      setDatos({ cuonro: '' });
      dispatch(setStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pago_ok]);

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <TextField
          type="text"
          name="cuonro"
          id="standard-basic"
          onChange={handleChange}
          value={cuonro || ''}
          validators={['required']}
          label="Codigo de Barras o Nro. Recibo"
          errorMessages={['Se requiere este campo']}
        />
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
export default SimpleFormSocioCuotasPagar;
