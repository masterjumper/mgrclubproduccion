import { Button, Icon, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocalidadesbyId, updateLocalidad } from 'app/store/reducers/localidadesSlice';
import { fetchProvincias } from 'app/store/reducers/provinciasSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Formcontrol = styled(FormControl)(() => ({
  width: 300,
  marginBottom: '16px'
}));

const MySwal = withReactContent(Swal);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const SimpleFormLocalidad = () => {
  const location = useLocation();
  const localidad = useSelector((state) => state.localidades.localidadUnique);
  const [datos, setDatos] = useState({ loccodpos: 0, locdsc: '', provincia_id: 0 });

  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { loccodpos, locdsc, provincia_id } = datos;

  useEffect(() => {
    dispatch(fetchLocalidadesbyId({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (localidad) {
      setDatos(localidad);
    }
  }, [localidad]);

  /* para el combo*/
  const listaDeprovincias = useSelector((state) => state.provincias.provincias);
  useEffect(() => {
    dispatch(fetchProvincias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeCombo = (event) => {
    setDatos({
      ...datos,
      provincia_id: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(updateLocalidad({ id: location.state.identificador, localidad: datos }));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Guardo con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/Localidad/');
  };

  const handleChange = (event) => {
    event.persist();
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/localidad');
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="numeric"
              name="loccodpos"
              id="standard-basic"
              onChange={handleChange}
              value={loccodpos || ''}
              validators={['required', 'minStringLength: 1', 'maxStringLength: 8']}
              label="Codigo Postal"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              type="text"
              name="locdsc"
              id="standard-basic"
              onChange={handleChange}
              value={locdsc || ''}
              validators={['required', 'minStringLength: 4', 'maxStringLength: 15']}
              label="Descripcion (Largo min. 4, Largo Maximo 15)"
              errorMessages={['Se requiere este campo']}
            />
            <Formcontrol>
              <InputLabel id="demo-simple-select-label">Provincia</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={provincia_id}
                label="ProvinciaId"
                onChange={handleChangeCombo}
                displayEmpty
              >
                <MenuItem key={0} value={0} disabled>
                  {'Seleccione...'}
                </MenuItem>
                {listaDeprovincias &&
                  listaDeprovincias.map((provincia) => (
                    <MenuItem key={provincia.id} value={provincia.id}>
                      {provincia.prvdsc}
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
export default SimpleFormLocalidad;
