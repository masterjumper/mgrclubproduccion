import { Button, Icon, Grid, FormControlLabel, Checkbox } from '@mui/material';

import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriabyId, updateCategoria } from '../../../../store/reducers/categoriasSlice';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@mui/material/InputAdornment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const SimpleFormUpdateCategoria = () => {
  const location = useLocation();
  const categoria = useSelector((state) => state.categorias.categoriaUnique);
  const [datos, setDatos] = useState({
    catdsc: '',
    catedades: 0,
    catedahas: 0,
    catimp: 0,
    catexe: 2
  });
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { catdsc, catedades, catedahas, catimp, catexe } = datos;

  useEffect(() => {
    dispatch(fetchCategoriabyId({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (categoria) {
      setDatos(categoria);
    }
  }, [dispatch, categoria]);

  const handleInputChange = (e) => {
    e.persist();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateCategoria({ id: location.state.identificador, categoria: datos }));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Guardo con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/categoria/');
  };

  const handleChangeCheckBox = (e) => {
    if (e.target.checked) {
      setDatos({
        ...datos,
        [e.target.name]: 1
      });
    } else {
      setDatos({
        ...datos,
        [e.target.name]: 2
      });
    }
  };

  const handleCancel = (event) => {
    navigate('/categoria');
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="catdsc"
              id="standard-basic"
              value={catdsc}
              onChange={handleInputChange}
              validators={['required']}
              label="Descripcion (Largo min. 4, Largo Maximo 15)"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              label="Edad Desde"
              type="text"
              name="catedades"
              value={catedades}
              onChange={handleInputChange}
              validators={['required']}
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              label="Importe"
              type="number"
              name="catimp"
              value={catimp}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              validators={['required']}
              errorMessages={['Se requiere este campo']}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <Grid item lg={1} md={1} sm={1} xs={1} sx={{ mt: 8.6 }}></Grid>
            <TextField
              label="Edad Hasta"
              type="text"
              name="catedahas"
              value={catedahas}
              onChange={handleInputChange}
              validators={['required']}
              errorMessages={['Se requiere este campo']}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="catexe"
                  checked={catexe === 1 ? true : false}
                  value={catexe}
                  onChange={handleChangeCheckBox}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Vitalicio"
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
export default SimpleFormUpdateCategoria;
