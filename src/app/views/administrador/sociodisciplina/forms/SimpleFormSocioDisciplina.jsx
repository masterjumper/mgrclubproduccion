import { Button, Icon, Grid, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { createSOCIODISCIPLINA } from '../../../../redux/actions/SocioDisciplinaActions'
import { addSocioDisciplina } from 'app/store/reducers/sociodisciplinasSlice';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//import { get_ALL_DISCIPLINAS } from '../../../../redux/actions/DisciplinaActions'
import { fetchDisciplinas } from 'app/store/reducers/disciplinasSlice';
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

const SimpleFormSocioDisciplina = () => {
  const location = useLocation();
  const [identificador, setIdentificador] = useState(location.state.identificador);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [datos, setDatos] = useState({
    DisciplinaId: '',
    SocioId: identificador
  });

  const listOfDisciplinas = useSelector((state) => state.disciplinas.disciplinas);
  useEffect(() => {
    //dispatch(get_ALL_DISCIPLINAS());
    dispatch(fetchDisciplinas());
    setIdentificador(location.state.identificador);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { DisciplinaId } = datos;

  const handleSubmit = (event) => {
    event.preventDefault();

    //dispatch(createSOCIODISCIPLINA(state));
    dispatch(addSocioDisciplina(datos));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Agrego con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/sociodisciplina/', {
      state: {
        identificador
      }
    });
  };

  const handleChangeSelect = (event) => {
    setDatos({
      ...datos,
      DisciplinaId: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/sociodisciplina/', {
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
              <InputLabel id="demo-simple-select-label">Disciplina</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={DisciplinaId}
                label="Disciplina"
                onChange={handleChangeSelect}
              >
                <MenuItem key={0} value={0} disabled>
                  {'Seleccione...'}
                </MenuItem>
                {listOfDisciplinas &&
                  listOfDisciplinas.map((disciplinas) => (
                    <MenuItem key={disciplinas.id} value={disciplinas.id}>
                      {disciplinas.disdsc}
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
export default SimpleFormSocioDisciplina;
