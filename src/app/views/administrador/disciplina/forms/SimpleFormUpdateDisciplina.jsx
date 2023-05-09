import { Button, Icon, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDisciplinabyId, updateDisciplina } from '../../../../store/reducers/disciplinasSlice';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));
const SimpleFormUpdateDisciplina = () => {
  const location = useLocation();
  const disciplina = useSelector((state) => state.disciplinas.disciplinaUnique);
  const [datos, setDatos] = useState({ disdsc: '' });
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { disdsc } = datos;

  useEffect(() => {
    dispatch(fetchDisciplinabyId({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (disciplina) {
      setDatos(disciplina);
    }
  }, [dispatch, disciplina]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(updateDisciplina({ id: location.state.identificador, disciplina: datos }));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Registro con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/disciplina/');
  };

  const handleChange = (event) => {
    event.persist();
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/disciplina');
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="disdsc"
              id="standard-basic"
              onChange={handleChange}
              value={disdsc || ''}
              validators={['required']}
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

export default SimpleFormUpdateDisciplina;
