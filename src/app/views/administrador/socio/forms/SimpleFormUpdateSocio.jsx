import {
  Button,
  Icon,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/system';
import { Span } from '../../../../components/Typography';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { get_SOCIO, updateSOCIO } from '../../../../redux/actions/SocioActions'
import { fetchSociobyId, updateSocio } from 'app/store/reducers/sociosSlice';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { fetchLocalidades } from 'app/store/reducers/localidadesSlice';
//import { get_ALL_LOCALIDADES } from '../../../../redux/actions/LocalidadActions'
import { fetchCategorias } from 'app/store/reducers/categoriasSlice';
//import { get_ALL_CATEGORIAS } from '../../../../redux/actions/CategoriaActions'
//import { fetchTipoSocios } from 'app/store/reducers/tiposociosSlice';
//import { get_ALL_TIPOSOCIOS } from '../../../../redux/actions/TipoSocioActions'

const MySwal = withReactContent(Swal);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const Formcontrol = styled(FormControl)(() => ({
  /* width: 300, */
  width: '100%',
  marginBottom: '16px'
}));

const SimpleFormUpdateSocio = () => {
  const location = useLocation();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const socio = useSelector((state) => state.socios.socioUnique);
  const [isNroCtaDisabled, setIsNroCtaDisabled] = React.useState(false);

  useEffect(() => {    
    dispatch(fetchSociobyId({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socio) {
      setDatos(socio);
    }
  }, [socio]);

  const listaCategorias = useSelector((state) => state.categorias.categorias);
  useEffect(() => {    
    dispatch(fetchCategorias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listaLocalidades = useSelector((state) => state.localidades.localidades);
  useEffect(() => {    
    dispatch(fetchLocalidades());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* const listaTipoSocios = useSelector((state) => state.tiposocios.tiposocios);
  useEffect(() => {    
    dispatch(fetchTipoSocios());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  const [datos, setDatos] = useState({
    SocNom: '',
    SocApe: '',
    SocDom: '',
    SocTelCel: '',
    SocNroDNI: '',
    SocMail: '',
    SocMailTutor: '',
    SocTelCelTut: '',
    SocFecNac: '',
    SocSex: 1,
    categoria_id: '',
    localidad_id: '',
    //tiposocio_id: '',
    tiposocio_id: 1,
    SocNroCta: '',
    SocMarMut: 0,
    SocMarCob: 0,
    SocMarPagSec:0,
    SocMarPagMut:0,
    /*       
    SocMarMut:0,
    SocNro:"",
    SocFecBaj:"",
    SocFecAlt:"",
    SocHab:0,
    SocSal:0,
    SocPathFot:"", */
  });

  const {
    SocNom,
    SocApe,
    SocDom,
    SocTelCel,
    SocNroDNI,
    SocMail,
    SocMailTutor,
    SocTelCelTut,
    SocFecNac,
    SocSex,
    categoria_id,
    localidad_id,
    //tiposocio_id,
    SocNroCta,
    SocMarMut,
    SocMarCob,
    SocMarPagSec,
    SocMarPagMut
    /* 
        SocNro,
        SocFecAlt, 
        SocFecBaj,               
        SocHab,
        SocSal,
        SocPathFot, */
  } = datos;

  const handleSubmit = (event) => {
    event.preventDefault();                
    dispatch(updateSocio({ id: location.state.identificador, socio: datos }));
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Guardo con Exito',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/socio/');
  };

  const handleChange = (event) => {
    event.persist();
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeSexo = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/socio');
  };

  const handleChangeComboCategoria = (event) => {
    setDatos({
      ...datos,
      categoria_id: event.target.value
    });
  };
  const handleChangeComboLocalidad = (event) => {
    setDatos({
      ...datos,
      localidad_id: event.target.value
    });
  };

  /* const handleChangeComboTipoSocio = (event) => {
    setDatos({
      ...datos,
      tiposocio_id: event.target.value
    });
  }; */

  const handleChangeCheckBox = (e) => {    
    if (e.target.checked) {
      setDatos({
        ...datos,
        [e.target.name]: 1
      });
    } else {
      setDatos({
        ...datos,
        [e.target.name]: 0
      });
    }
  };

  const handleChangeCheckBoxCob = (e) => {    
    if (e.target.checked) {
      setDatos({
        ...datos,
        [e.target.name]:1
      });
    } else {
      setDatos({
        ...datos,
        [e.target.name]: 0
      });
    }
  };

  const handleChangeCheckBoxMut = (e) => {    
    if (e.target.checked) {
      setIsNroCtaDisabled(false);
      setDatos({
        ...datos,
        [e.target.name]:1
      });
    } else {
      setIsNroCtaDisabled(true);
      setDatos({
        ...datos,
        [e.target.name]: 0
      });
    }
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="SocNom"
              id="standard-basic"
              onChange={handleChange}
              value={SocNom || ''}
              validators={['required', 'minStringLength: 4']}
              label="Nombre (Largo min. 4)"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              type="number"
              name="SocNroDNI"
              id="standard-basic"
              onChange={handleChange}
              value={SocNroDNI || ''}
              validators={['required']}
              label="DNI"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              type="date"
              name="SocFecNac"
              id="standard-basic"
              onChange={handleChange}
              value={SocFecNac || ''}
              validators={['required']}
              InputLabelProps={{
                shrink: true
              }}
              label="Fecha Nacimiento"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              type="text"
              name="SocTelCel"
              id="standard-basic"
              onChange={handleChange}
              value={SocTelCel || ''}
              label="Telefono/Celular"
            />
            <TextField
              type="text"
              name="SocTelCelTut"
              id="standard-basic"
              onChange={handleChange}
              value={SocTelCelTut || ''}
              label="Telefono/Celular Tutor"
            />
            <Formcontrol>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoria_id}
                label="categoria_id"
                onChange={handleChangeComboCategoria}
              >
                <MenuItem key={0} value={0}>
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
            {/* <Formcontrol>
              <InputLabel id="demo-simple-select-label">Tipo socio</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tiposocio_id}
                label="categoria_id"
                onChange={handleChangeComboTipoSocio}
              >
                <MenuItem key={0} value={0}>
                  {'Seleccione...'}
                </MenuItem>
                {listaTipoSocios &&
                  listaTipoSocios.map((tiposocios) => (
                    <MenuItem key={tiposocios.id} value={tiposocios.id}>
                      {tiposocios.tipsocdsc}
                    </MenuItem>
                  ))}
              </Select>
            </Formcontrol> */}
            <FormControlLabel
              control={
                <Checkbox
                  name="SocMarMut"
                  checked={SocMarMut === 1 ? true : false}
                  value={SocMarMut}
                  onChange={handleChangeCheckBox}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Socio Mutual"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="SocApe"
              id="standard-basic"
              onChange={handleChange}
              value={SocApe || ''}
              validators={['required', 'minStringLength: 4']}
              label="Apellido (Largo min. 4)"
              errorMessages={['Se requiere este campo']}
            />
            <TextField
              type="text"
              name="SocDom"
              id="standard-basic"
              onChange={handleChange}
              value={SocDom || ''}
              validators={['required']}
              label="Domicilio"
              errorMessages={['Se requiere este campo']}
            />
            <Formcontrol fullWidth>
              <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="SocSex"
                value={SocSex}
                label="Sexo"
                displayEmpty
                onChange={handleChangeSexo}
                validators={['required']}
              >
                <MenuItem key={1} value={1}>
                  Masculino
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Femenino
                </MenuItem>
              </Select>
            </Formcontrol>
            <TextField
              type="mail"
              name="SocMail"
              id="standard-basic"
              onChange={handleChange}
              value={SocMail || ''}
              label="Correo Electronico"
            />
            <TextField
              type="mail"
              name="SocMailTutor"
              id="standard-basic"
              onChange={handleChange}
              value={SocMailTutor || ''}
              label="Correo Electronico Tutor"
            />
            <Formcontrol>
              <InputLabel id="demo-simple-select-label">Localidad</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={localidad_id}
                label="localidad_id"
                onChange={handleChangeComboLocalidad}
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
              <FormControlLabel
              control={
                <Checkbox
                  name="SocMarPagMut"                  
                  checked={SocMarPagMut}                  
                  onChange={handleChangeCheckBoxMut}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Paga en Mutual?"
            /> 
            </Formcontrol>
            <TextField
              disabled={isNroCtaDisabled}
              type="text"
              name="SocNroCta"
              id="standard-basic"
              onChange={handleChange}
              value={SocNroCta || ''}
              validators={['maxStringLength: 13']}
              label="Nro Cuenta Mutual/Bancaria"               
              //errorMessages={['Se requiere este campo']}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="SocMarCob"                  
                  checked={SocMarCob}                  
                  onChange={handleChangeCheckBoxCob}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Pasa cobrador?"              
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="SocMarPagSec"                  
                  checked={SocMarPagSec}                  
                  onChange={handleChangeCheckBoxCob}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Paga en Secretaria?"
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
export default SimpleFormUpdateSocio;
