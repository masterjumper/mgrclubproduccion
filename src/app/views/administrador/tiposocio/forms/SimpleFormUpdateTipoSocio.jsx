import { Button, Icon, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
//import { get_TIPOSOCIO, updateTIPOSOCIO } from '../../../../redux/actions/TipoSocioActions'
import { fetchTipoSociobyId, updateTipoSocio } from 'app/store/reducers/tiposociosSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));
const SimpleFormUpdateTipoSocio = () => {
  const location = useLocation();
  const tiposocio = useSelector((state) => state.tiposocios.tiposocioUnique);
  const [datos, setDatos] = useState({ tipsocdsc: '' });
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { tipsocdsc } = datos;

  useEffect(() => {
    dispatch(fetchTipoSociobyId({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tiposocio) {
      setDatos(tiposocio);
    }
  }, [tiposocio]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateTipoSocio({ id: location.state.identificador, tiposocio: datos }));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Guardo con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/TipoSocio/');
  };

  const handleChange = (event) => {
    event.persist();
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/TipoSocio');
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="tipsocdsc"
              id="standard-basic"
              onChange={handleChange}
              value={tipsocdsc || ''}
              validators={['required', 'minStringLength: 4', 'maxStringLength: 15']}
              label="Descripcion (Largo min. 4, Largo Maximo 15)"
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

export default SimpleFormUpdateTipoSocio;
