import { Button, Icon, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdicionalbyId, updateAdicional } from '../../../../store/reducers/adicionalesSlice';
import InputAdornment from '@mui/material/InputAdornment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));
const SimpleFormupdateADICIONAL = () => {
  const location = useLocation();
  const adicional = useSelector((state) => state.adicionales.adicionalUnique);
  const [datos, setDatos] = useState({ adidsc: '', adiimp: 0, adiexe: 2 });
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { adidsc, adiimp, adiexe } = datos;

  useEffect(() => {
    dispatch(fetchAdicionalbyId({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (adicional) {
      setDatos(adicional);
    }
  }, [dispatch, adicional]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateAdicional({ id: location.state.identificador, adicional: datos }));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Guardo con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/adicional/');
  };

  const handleChange = (event) => {
    event.persist();
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/adicional');
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
  const handleInputChange = (e) => {
    e.persist();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="adidsc"
              id="standard-basic"
              onChange={handleChange}
              value={adidsc}
              validators={['required']}
              label="Descripcion (Largo min. 4, Largo Maximo 15)"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              label="Importe"
              type="number"
              name="adiimp"
              value={adiimp}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              validators={['required']}
              errorMessages={['Se requiere este campo']}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="adiexe"
                  checked={adiexe === 1 ? true : false}
                  value={adiexe}
                  onChange={handleChangeCheckBox}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Excento"
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

export default SimpleFormupdateADICIONAL;
