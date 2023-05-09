import { Button, Icon, Grid, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { createSOCIOADICIONAL } from '../../../../redux/actions/SocioAdicionalActions'
import { addSocioAdicional } from 'app/store/reducers/socioadicionalesSlice';
//import { get_ALL_ADICIONALES } from '../../../../redux/actions/AdicionalActions'
import { fetchAdicional } from 'app/store/reducers/adicionalesSlice';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

/* const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
})) */

const Formcontrol = styled(FormControl)(() => ({
  /* width: 300, */
  width: '100%',
  marginBottom: '16px'
}));

const SimpleFormSocioAdicional = () => {
  const location = useLocation();
  const [identificador, setIdentificador] = useState(location.state.identificador);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [datos, setDatos] = useState({
    AdicionalId: '',
    SocioId: identificador
  });

  const listOfAdicionales = useSelector((state) => state.adicionales.adicionales);
  useEffect(() => {
    dispatch(fetchAdicional());
    setIdentificador(location.state.identificador);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { AdicionalId } = datos;

  const handleSubmit = (event) => {
    event.preventDefault();
    //dispatch(createSOCIOADICIONAL(state));
    dispatch(addSocioAdicional(datos));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Agrego con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/socioadicional/', {
      state: {
        identificador
      }
    });
  };

  const handleChangeSelect = (event) => {
    setDatos({
      ...datos,
      AdicionalId: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/socioadicional/', {
      state: {
        identificador
      }
    });
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <Formcontrol>
              <InputLabel id="demo-simple-select-label">Adicional</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={AdicionalId}
                label="Adicional"
                onChange={handleChangeSelect}
              >
                <MenuItem key={0} value={0} disabled>
                  {'Seleccione...'}
                </MenuItem>
                {listOfAdicionales &&
                  listOfAdicionales.map((adicionales) => (
                    <MenuItem key={adicionales.id} value={adicionales.id}>
                      {adicionales.adidsc}
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
export default SimpleFormSocioAdicional;
