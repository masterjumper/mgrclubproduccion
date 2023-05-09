import { Button, Icon, Grid, InputLabel, MenuItem, Select, FormControl } from '@mui/material';

import React, { useState, useEffect } from 'react';
import { Span } from '../../../../components/Typography';
import { styled } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';
//import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
//import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//import {Connection} from '../../../../redux/Connection';
import { fetchMesAnio } from 'app/store/reducers/sociocuotaSlice';
import {  gencuoindSociobyId } from 'app/store/reducers/sociosSlice';
//import { Connection } from 'app/utils/Connection';
//import axios from 'axios';

const MySwal = withReactContent(Swal);
const MySwal_Gen_Cuo = withReactContent(Swal);

/* const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
})); */

const Formcontrol = styled(FormControl)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const SimpleFormSeleccionCuotaGenerarIndividual = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    anio: '',
    mes: '',
    socid: location.state.identificador
  });

  const { anio, mes } = datos;

  let dispatch = useDispatch();
  let status = useSelector((state) => state.sociocuotas.status);
  let mensaje = useSelector((state) => state.sociocuotas.message);
  useEffect(() => {
    dispatch(fetchMesAnio(datos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datos]);

/* useEffect(()=>{
  console.log('useEffect')
  console.log('mensaje ', mensaje)
  console.log('status ', status)
  console.log('datos ', datos)
  if (mensaje === 'Cuota Generada Individual') {
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cuotas Generadas con Exito',
      showConfirmButton: false,
      timer: 3000
    });
    MySwal_Gen_Cuo.fire({
      position: 'center',
      //title: `Generando Archivo Cuotas ${nombre_mes.toUpperCase()} de ${anio}`,
      title: `Generando Archivo Cuotas`,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
        axios
          .post(Connection + '/gencuotas/create-pdf-seleccion', datos)
          .then((res) => {
            if (res.statusText === 'OK') {
              axios
                .get(Connection + '/gencuotas/fetch-pdf-seleccion', {
                  headers: {
                    accessToken: localStorage.getItem('accessToken')
                  },
                  responseType: 'blob',
                  refereceType: 'blob'
                })
                .then((res) => {
                  const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                  //saveAs(pdfBlob, `Cuotas_${nombre_mes}_${anio}.pdf`);
                  saveAs(pdfBlob, `Cuota.pdf`);
                  MySwal.fire({
                    title: 'Archivo Generado',
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false
                  });
                });
            }
          });
      }
    });
  } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[mensaje]) */


  const handleSubmit = (event) => {
    event.preventDefault();
    /*buscar si las cuotas estan generadas*/
    let mesparanombre = new Date(datos.mes + 1 + '/01/' + datos.anio);
    let nombre_mes = mesparanombre.toLocaleString('es-es', { month: 'long' });
    dispatch(fetchMesAnio(datos));

    if (mensaje === 'generadas' && status === 'succeeded') {
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cuotas No Generadas',
        showConfirmButton: false,
        timer: 3000
      });

      MySwal.fire({
        title: `Desea Generar la Cuota de ${nombre_mes.toUpperCase()} de ${anio} ?`,
        text: 'El Proceso no podra ser revertido!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText: 'NO'
      }).then((result) => {
        if (result.isConfirmed) {
          MySwal_Gen_Cuo.fire({
            position: 'center',
            title: `Generando Cuota ${nombre_mes.toUpperCase()} de ${anio}`,
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 1500,
            didOpen: () => {
              MySwal.showLoading();              
              dispatch(gencuoindSociobyId(datos));              
            } 
          });
        }
      });
    } else {
      if (mensaje === 'generadas' && status === 'succeeded') {
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cuotas Ya Generadas',
          showConfirmButton: false,
          timer: 3000
        });
      }
    }
    setDatos({
      mes: '',
      anio: ''
    });
  };

  const handleChangeComboAnio = (event) => {
    event.preventDefault();
    setDatos({
      ...datos,
      anio: event.target.value
    });
  };

  const handleCancel = (event) => {
    navigate('/socio');
  };

  const handleChangeComboMes = (event) => {
    event.preventDefault();
    setDatos({
      ...datos,
      mes: event.target.value
    });
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <Formcontrol>
              <InputLabel id="demo-simple-select-label">Mes </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="simple-select"
                value={mes}
                label="Mes"
                onChange={handleChangeComboMes}
                validators={['required']}
              >
                <MenuItem key={1} value={0}>
                  Enero
                </MenuItem>
                <MenuItem key={2} value={1}>
                  Febrero
                </MenuItem>
                <MenuItem key={3} value={2}>
                  Marzo
                </MenuItem>
                <MenuItem key={4} value={3}>
                  Abril
                </MenuItem>
                <MenuItem key={5} value={4}>
                  Mayo
                </MenuItem>
                <MenuItem key={6} value={5}>
                  Junio
                </MenuItem>
                <MenuItem key={7} value={6}>
                  Julio
                </MenuItem>
                <MenuItem key={8} value={7}>
                  Agosto
                </MenuItem>
                <MenuItem key={9} value={8}>
                  Septiembre
                </MenuItem>
                <MenuItem key={10} value={9}>
                  Octubre
                </MenuItem>
                <MenuItem key={11} value={10}>
                  Noviembre
                </MenuItem>
                <MenuItem key={12} value={11}>
                  Diciembre
                </MenuItem>
              </Select>
            </Formcontrol>
            <Formcontrol>
              <InputLabel id="demo-simple-select-label">Año </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="simple-select"
                value={anio}
                label="Año"
                onChange={handleChangeComboAnio}
                validators={['required']}
              >
                <MenuItem key={1} value={2023}>
                  2023
                </MenuItem>
                <MenuItem key={2} value={2024}>
                  2024
                </MenuItem>
                <MenuItem key={3} value={2025}>
                  2025
                </MenuItem>
                <MenuItem key={4} value={2026}>
                  2026
                </MenuItem>
                <MenuItem key={5} value={2027}>
                  2027
                </MenuItem>
                <MenuItem key={6} value={2028}>
                  2028
                </MenuItem>
                <MenuItem key={7} value={2029}>
                  2029
                </MenuItem>
                <MenuItem key={8} value={2030}>
                  2030
                </MenuItem>                
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
export default SimpleFormSeleccionCuotaGenerarIndividual;
