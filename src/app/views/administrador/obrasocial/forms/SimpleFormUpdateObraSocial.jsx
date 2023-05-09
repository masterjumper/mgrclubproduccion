import { Button, Icon, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObraSocialbyId, updateObraSocial } from 'app/store/reducers/obrasocialesSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));
const SimpleFormUpdateobrasocial = () => {
  const location = useLocation();
  const obrasocial = useSelector((state) => state.obrasociales.obrasocialUnique);
  const [datos, setDatos] = useState({ obrdsc: '' });
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { obrdsc } = datos;

  useEffect(() => {
    dispatch(fetchObraSocialbyId({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (obrasocial) {
      setDatos(obrasocial);
    }
  }, [obrasocial]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateObraSocial({ id: location.state.identificador, obrasocial: datos }));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Guardo con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/obrasocial/');
  };

  const handleChange = (event) => {
    event.persist();
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/obrasocial');
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="obrdsc"
              id="standard-basic"
              onChange={handleChange}
              value={obrdsc || ''}
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

export default SimpleFormUpdateobrasocial;
