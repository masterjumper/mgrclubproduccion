import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { get_CUOTAS_GENERADAS, start_CUOTAS_GENERADAS } from '../../../../redux/actions/SocioCuotasActions'
import { fetchCuotasGenerada } from 'app/store/reducers/sociocuotaSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//import {Connection} from '../../../../redux/Connection';
import { Connection } from 'app/utils/Connection';
import axios from 'axios';

const MySwal = withReactContent(Swal);
const MySwal_Gen_Cuo = withReactContent(Swal);

const SimpleFormSocioCuotas = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let cuotas_generadas = useSelector((state) => state.sociocuotas.cuotasgenerada);
  //let errores = useSelector((state) => state.sociocuotas.error);
  let mensaje = useSelector((state) => state.sociocuotas.message);

  useEffect(() => {
    //dispatch(start_CUOTAS_GENERADAS())
    //dispatch(get_CUOTAS_GENERADAS())
    dispatch(fetchCuotasGenerada());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cuotas_generadas) {
      let mes = new Date();
      let nombre_mes = mes.toLocaleString('es-es', { month: 'long' });
      let anio = new Date().getFullYear();

      MySwal.fire({
        title: `Desea Generar las Cuotas de ${nombre_mes.toUpperCase()} de ${anio} ?`,
        text: 'El Proceso no podra ser revertido!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI',
        cancelButtonText: 'NO'
      }).then((result) => {
        if (result.isConfirmed) {
          //console.log('cuotas_generadas mensaje', mensaje);
          //if (cuotas_generadas.sociocuotas[0].respuesta === 'no_generadas' ){
          if (mensaje === 'no generadas') {
            miFuncionAsincrona(nombre_mes, anio);
            /* .then((res) => {  
                            if(res.isDismissed){                            
                                if(res.dismiss === 'timer'){
                                    MySwal.fire({ 
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Cuotas Generadas con Exito',
                                        showConfirmButton: false,
                                        timer: 3000
                                    }) 
                                    navigate('/#/');
                                }
                            }
                        })  */
          } else {
            MySwal.fire({
              position: 'center',
              icon: 'error',
              title: `Las Cuotas ${nombre_mes.toUpperCase()} de ${anio}, Ya Fueron Generadas`,
              confirmButtonColor: '#3085d6',
              showConfirmButton: true
              //timer: 3000
            });
            navigate('/#/');
          }
        } else {
          navigate('/#/');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cuotas_generadas]);

  function generarCuotas(nombre_mes, anio) {
    return new Promise(function (resolve, reject) {
      MySwal_Gen_Cuo.fire({
        position: 'center',
        title: `Generando Cuotas ${nombre_mes.toUpperCase()} de ${anio}`,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        //timer: 15000,
        didOpen: () => {
          MySwal.showLoading();
          //dispatch(set_GENERARCUOTAS())
          //.post(Connection + '/cuotas/gen', { mode: 'no-cors', timeout: 5400000 })
          //, { mode: 'no-cors', timeout: 3600 })
          axios.post(Connection + '/cuotas/gen').then((res) => {
            //console.log(res.data[0].respuesta);
            if (res.data.respuesta === 'success') {
              MySwal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cuotas Generadas con Exito',
                showConfirmButton: false,
                timer: 3000
              });
              navigate('/#/');
            }
          });
        }
      });
    });
  }

  async function miFuncionAsincrona(nombre_mes, anio) {
    try {
      await generarCuotas(nombre_mes, anio);
      console.log('La operación de generación de cuotas se ha completado con éxito');
    } catch (error) {
      console.error('La operación de generación de cuotas ha fallado', error);
    }
  }

  return (
    <div>
      {/* <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
                <Button color="primary" variant="contained" type="submit">
                    <Icon>check_circle</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Aceptar
                    </Span>
                </Button>
            </ValidatorForm> */}
      {/* <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
            <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                         <TextField
                            type="text"
                            name="traobs"
                            id="standard-basic"
                            onChange={handleChange}
                            value={traobs || 'Abono Cuota'}
                            validators={[
                                'required',
                                'minStringLength: 4',                                
                            ]}
                            label="Descripcion (Largo min. 4)"
                            errorMessages={['Se requiere este campo']}                                           
                        />
                        <TextField
                            type="number"
                            name="traimp"
                            id="standard-basic"
                            onChange={handleChange}
                            value={traimp}
                            validators={[
                                'required',                                                                
                            ]}
                            label="Importe"
                            errorMessages={['Se requiere este campo']}                                           
                        />
                    </Grid>                    
                </Grid>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>check_circle</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Aceptar
                    </Span>
                </Button>
                <Span sx={{ pl: 1, textTransform: 'capitalize' }}>                        
                </Span>
                <Button color="secondary" variant="contained" onClick={handleCancel}>
                    <Icon>cancel</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Cancelar
                    </Span>
                </Button>
            </ValidatorForm> */}
    </div>
  );
};
export default SimpleFormSocioCuotas;
