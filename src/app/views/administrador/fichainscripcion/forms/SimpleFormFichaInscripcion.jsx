import { Button, Icon, Grid, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addFichaInscripcion } from 'app/store/reducers/fichainscripcionSlice';

import { fetchObraSociales } from 'app/store/reducers/obrasocialesSlice';

import { fetchPreguntas } from 'app/store/reducers/preguntasSlice';

import { fetchLocalidades } from 'app/store/reducers/localidadesSlice';

import { fetchCategorias } from 'app/store/reducers/categoriasSlice';

import { fetchTipoSocios } from 'app/store/reducers/tiposociosSlice';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AccordionRoot = styled('div')(({ theme }) => ({
  width: '100%',
  '& .heading': {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  marginBottom: '16px'
}));

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const Formcontrol = styled(FormControl)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const SimpleFormFichaInscripcion = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [datos, setDatos] = useState({
    InsNom: '',
    InsApe: '',
    InsDom: '',
    InsNroDNI: '',
    InsFecNac: '',
    InsSex: 0,
    obrasocial_Ins_id: '',
    localidad_Ins_id: '',
    InsNroAfi: '',

    EncNom: '',
    EncApe: '',
    EncDom: '',
    EncNroDNI: '',
    EncFecNac: '',
    EncSex: 0,
    obrasocial_enc_id: '',
    localidad_enc_id: '',
    EncNroAfi: '',
    EncTel: '',
    EncCel: '',

    categoria_id: '',
    tiposocio_id: ''
  });

  const {
    InsNom,
    InsApe,
    InsDom,
    InsNroDNI,
    InsFecNac,
    InsSex,
    obrasocial_Ins_id,
    localidad_Ins_id,
    InsNroAfi,

    EncNom,
    EncApe,
    EncDom,
    EncNroDNI,
    EncFecNac,
    EncSex,
    obrasocial_enc_id,
    localidad_enc_id,
    EncNroAfi,
    EncTel,
    EncCel,

    categoria_id,
    tiposocio_id
  } = datos;

  const listaTipoSocio = useSelector((state) => state.tiposocios.tiposocios);
  useEffect(() => {
    dispatch(fetchTipoSocios());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listaLocalidades = useSelector((state) => state.localidades.localidades);
  useEffect(() => {
    dispatch(fetchLocalidades());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listaObrasociales = useSelector((state) => state.obrasociales.obrasociales);
  useEffect(() => {
    dispatch(fetchObraSociales());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listaPreguntas = useSelector((state) => state.preguntas.preguntas);
  useEffect(() => {
    dispatch(fetchPreguntas());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listaCategorias = useSelector((state) => state.categorias.categorias);
  useEffect(() => {
    dispatch(fetchCategorias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRespuestas = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    MySwal.fire({
      position: 'center',
      title: 'Seguro de Agregar esta Ficha?',
      text: 'No se podra Revertir!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addFichaInscripcion({ datos }));
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se Agrego con Exito',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/fichainscripcion/');
      }
    });
  };

  const handleChange = (event) => {
    event.persist();
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/fichainscripcion');
  };

  const handleChangeComboCategoria = (event) => {
    setDatos({
      ...datos,
      categoria_id: event.target.value
    });
  };

  const handleChangeComboTipoSocio = (event) => {
    setDatos({
      ...datos,
      tiposocio_id: event.target.value
    });
  };

  const handleChangeComboLocalidad = (event) => {
    setDatos({
      ...datos,
      localidad_Ins_id: event.target.value
    });
  };

  const handleChangeComboLocalidad_Encargado = (event) => {
    setDatos({
      ...datos,
      localidad_enc_id: event.target.value
    });
  };

  const handleChangeComboObraSocial_encargado = (event) => {
    setDatos({
      ...datos,
      obrasocial_enc_id: event.target.value
    });
  };

  const handleChangeComboObraSocial = (event) => {
    setDatos({
      ...datos,
      obrasocial_Ins_id: event.target.value
    });
  };

  const handleChangeSelect_sexo_inscripto = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeSelect_sexo_encargado = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <AccordionRoot>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="heading">Persona A Inscribir</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="InsNom"
                    id="standard-basic"
                    onChange={handleChange}
                    value={InsNom || ''}
                    validators={['required', 'minStringLength: 4']}
                    label="Nombre (Largo min. 4)"
                    errorMessages={['Se requiere este campo']}
                  />
                  <TextField
                    type="number"
                    name="InsNroDNI"
                    id="standard-basic"
                    onChange={handleChange}
                    value={InsNroDNI || ''}
                    validators={['required']}
                    label="DNI"
                    errorMessages={['Se requiere este campo']}
                  />
                  <TextField
                    type="date"
                    name="InsFecNac"
                    id="standard-basic"
                    onChange={handleChange}
                    value={InsFecNac || ''}
                    validators={['required']}
                    InputLabelProps={{
                      shrink: true
                    }}
                    label="Fecha Nacimiento"
                    errorMessages={['Se requiere este campo']}
                  />
                  <Formcontrol>
                    <InputLabel id="demo-simple-select-label">Obra Social</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={obrasocial_Ins_id}
                      label="Obra Social"
                      onChange={handleChangeComboObraSocial}
                    >
                      <MenuItem key={0} value={0} disabled>
                        {'Seleccione...'}
                      </MenuItem>
                      {listaObrasociales &&
                        listaObrasociales.map((obrasocial) => (
                          <MenuItem key={obrasocial.id} value={obrasocial.id}>
                            {obrasocial.obrdsc}
                          </MenuItem>
                        ))}
                    </Select>
                  </Formcontrol>
                  <TextField
                    type="text"
                    name="InsNroAfi"
                    id="standard-basic"
                    onChange={handleChange}
                    value={InsNroAfi || ''}
                    label="Nro. Afiliado"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="InsApe"
                    id="standard-basic"
                    onChange={handleChange}
                    value={InsApe || ''}
                    validators={['required', 'minStringLength: 4']}
                    label="Apellido (Largo min. 4)"
                    errorMessages={['Se requiere este campo']}
                  />
                  <TextField
                    type="text"
                    name="InsDom"
                    id="standard-basic"
                    onChange={handleChange}
                    value={InsDom || ''}
                    validators={['required']}
                    label="Domicilio"
                    errorMessages={['Se requiere este campo']}
                  />
                  <Formcontrol fullWidth>
                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="InsSex"
                      value={InsSex || ''}
                      displayEmpty
                      label="Sexo"
                      onChange={handleChangeSelect_sexo_inscripto}
                      validators={['required']}
                    >
                      <MenuItem value={1}>Masculino</MenuItem>
                      <MenuItem value={2}>Femenino</MenuItem>
                    </Select>
                  </Formcontrol>
                  <Formcontrol>
                    <InputLabel id="demo-simple-select-label">Localidad</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={localidad_Ins_id}
                      label="Localidad"
                      onChange={handleChangeComboLocalidad}
                      displayEmpty
                      validators={['required']}
                    >
                      <MenuItem key={0} value={0} disabled>
                        {'Seleccione...'}
                      </MenuItem>
                      {listaLocalidades &&
                        listaLocalidades.map((localidades) => (
                          <MenuItem key={localidades.id} value={localidades.id}>
                            {localidades.locdsc}
                          </MenuItem>
                        ))}
                    </Select>
                  </Formcontrol>
                  <Formcontrol>
                    <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={categoria_id}
                      label="Categoria"
                      onChange={handleChangeComboCategoria}
                      displayEmpty
                      validators={['required']}
                    >
                      <MenuItem key={0} value={0} disabled>
                        {'Seleccione...'}
                      </MenuItem>
                      {listaCategorias &&
                        listaCategorias.map((categorias) => (
                          <MenuItem key={categorias.id} value={categorias.id}>
                            {categorias.catdsc}
                          </MenuItem>
                        ))}
                    </Select>
                  </Formcontrol>
                  <Formcontrol>
                    <InputLabel id="demo-simple-select-label">Tipo Socio</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tiposocio_id}
                      label="Tipo Socio"
                      onChange={handleChangeComboTipoSocio}
                      displayEmpty
                      validators={['required']}
                    >
                      <MenuItem key={0} value={0} disabled>
                        {'Seleccione...'}
                      </MenuItem>
                      {listaTipoSocio &&
                        listaTipoSocio.map((tiposocio) => (
                          <MenuItem key={tiposocio.id} value={tiposocio.id}>
                            {tiposocio.tipsocdsc}
                          </MenuItem>
                        ))}
                    </Select>
                  </Formcontrol>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className="heading">Padres/Tutor/Encargado</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="EncNom"
                    id="standard-basic"
                    onChange={handleChange}
                    value={EncNom || ''}
                    validators={['required', 'minStringLength: 4']}
                    label="Nombre (Largo min. 4)"
                    errorMessages={['Se requiere este campo']}
                  />
                  <TextField
                    type="number"
                    name="EncNroDNI"
                    id="standard-basic"
                    onChange={handleChange}
                    value={EncNroDNI || ''}
                    validators={['required']}
                    label="DNI"
                    errorMessages={['Se requiere este campo']}
                  />
                  <TextField
                    type="date"
                    name="EncFecNac"
                    id="standard-basic"
                    onChange={handleChange}
                    value={EncFecNac || ''}
                    validators={['required']}
                    InputLabelProps={{
                      shrink: true
                    }}
                    label="Fecha Nacimiento"
                    errorMessages={['Se requiere este campo']}
                  />
                  <TextField
                    type="text"
                    name="EncTel"
                    id="standard-basic"
                    onChange={handleChange}
                    value={EncTel || ''}
                    validators={['required']}
                    label="Telefono"
                    errorMessages={['Se requiere este campo']}
                  />
                  <Formcontrol>
                    <InputLabel id="demo-simple-select-label">Obra Social</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={obrasocial_enc_id}
                      label="Obra Social"
                      onChange={handleChangeComboObraSocial_encargado}
                    >
                      <MenuItem key={0} value={0} disabled>
                        {'Seleccione...'}
                      </MenuItem>
                      {listaObrasociales &&
                        listaObrasociales.map((obrasocial) => (
                          <MenuItem key={obrasocial.id} value={obrasocial.id}>
                            {obrasocial.obrdsc}
                          </MenuItem>
                        ))}
                    </Select>
                  </Formcontrol>
                  <TextField
                    type="text"
                    name="EncNroAfi"
                    id="standard-basic"
                    onChange={handleChange}
                    value={EncNroAfi || ''}
                    label="Nro. Afiliado"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="EncApe"
                    id="standard-basic"
                    onChange={handleChange}
                    value={EncApe || ''}
                    validators={['required', 'minStringLength: 4']}
                    label="Apellido (Largo min. 4)"
                    errorMessages={['Se requiere este campo']}
                  />
                  <TextField
                    type="text"
                    name="EncDom"
                    id="standard-basic"
                    onChange={handleChange}
                    value={EncDom || ''}
                    validators={['required']}
                    label="Domicilio"
                    errorMessages={['Se requiere este campo']}
                  />
                  <Formcontrol fullWidth>
                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="EncSex"
                      value={EncSex || ''}
                      displayEmpty
                      label="Sexo"
                      onChange={handleChangeSelect_sexo_encargado}
                      validators={['required']}
                    >
                      <MenuItem value={1}>Masculino</MenuItem>
                      <MenuItem value={2}>Femenino</MenuItem>
                    </Select>
                  </Formcontrol>
                  <TextField
                    type="text"
                    name="EncCel"
                    id="standard-basic"
                    onChange={handleChange}
                    value={EncCel || ''}
                    validators={['required']}
                    label="Celular"
                    errorMessages={['Se requiere este campo']}
                  />
                  <Formcontrol>
                    <InputLabel id="demo-simple-select-label">Localidad</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={localidad_enc_id}
                      label="Localidad"
                      onChange={handleChangeComboLocalidad_Encargado}
                      displayEmpty
                      validators={['required']}
                    >
                      <MenuItem key={0} value={0} disabled>
                        {'Seleccione...'}
                      </MenuItem>
                      {listaLocalidades &&
                        listaLocalidades.map((localidades) => (
                          <MenuItem key={localidades.id} value={localidades.id}>
                            {localidades.locdsc}
                          </MenuItem>
                        ))}
                    </Select>
                  </Formcontrol>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className="heading">Preguntas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {listaPreguntas &&
                listaPreguntas.map((pregunta, i) => (
                  <TextField
                    key={pregunta.id}
                    name={'' + pregunta.id}
                    label={pregunta.predsc}
                    onChange={(e) => {
                      handleRespuestas(e);
                    }}
                  />
                ))}
            </AccordionDetails>
          </Accordion>
        </AccordionRoot>

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
export default SimpleFormFichaInscripcion;
