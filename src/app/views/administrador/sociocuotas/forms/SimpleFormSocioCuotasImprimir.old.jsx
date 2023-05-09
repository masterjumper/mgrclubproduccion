import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'; 
import { get_CUOTAS_GENERADAS } from '../../../../redux/actions/SocioCuotasActions';
import {useDispatch , useSelector} from 'react-redux';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import {Connection} from '../../../../redux/Connection';

const MySwal = withReactContent(Swal)

const SimpleFormSocioCuotasImprimir = () => {   
    let dispatch = useDispatch();    
    const navigate = useNavigate(); 
    let cuotas_generadas = useSelector(state => state.sociocuotas);

     useEffect(() => { 
        dispatch(get_CUOTAS_GENERADAS()); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]); 
    
     useEffect(()=> {
        if(cuotas_generadas) {
            let mes = new Date();
            let nombre_mes = mes.toLocaleString('es-es', { month: 'long' });  
            let anio = new Date().getFullYear();
            MySwal.fire({            
                title:  `Desea Imprimir las Cuotas de ${nombre_mes.toUpperCase()} de ${anio} ?`,       
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI',
                cancelButtonText: 'NO'
                }).then((result) => {
                if (result.isConfirmed) {
                    
                    if (cuotas_generadas.message === 'generadas' ){
                        MySwal.fire({
                            position: 'center',        
                            title: 'Generando Archivo de Cuotas',
                            showConfirmButton: false,
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            //timer: 15000,
                            didOpen: () => {
                                MySwal.showLoading();
                                axios.post(Connection + '/gencuotas/create-pdf')
                                    .then((res) => {
                                        //console.log(res.statusText);
                                        if(res.statusText === 'OK'){
                                            axios.get(Connection +'/gencuotas/fetch-pdf',{ 
                                                headers: {
                                                    accessToken: localStorage.getItem("accessToken"),
                                                },
                                                responseType: 'blob', 
                                                refereceType: 'blob',          
                                            }) 
                                            .then((res) => {
                                                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });                        
                                                saveAs(pdfBlob, `Cuotas_${nombre_mes}_${anio}.pdf` );
                                                MySwal.fire({ 
                                                title: 'Archivo Generado',
                                                icon: 'success',
                                                timer: 3000,
                                                showConfirmButton: false
                                                })
                                            })
                                        }
                                    });                                
                            },
                        })
                        /* MySwal.fire({
                            position: 'center',        
                            title: 'Generando Archivo de Cuotas',
                            showConfirmButton: false,
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            timer: 15000,
                            didOpen: () => {
                                MySwal.showLoading();
                                axios.post(Connection + '/gencuotas/create-pdf')
                                    .then(() => {});                                
                            },
                        }).then(          
                            (dismiss) => {                      
                            if (dismiss.dismiss === 'timer') { 
                                axios.get(Connection +'/gencuotas/fetch-pdf',{ 
                                    headers: {
                                        accessToken: localStorage.getItem("accessToken"),
                                    },
                                    responseType: 'blob', 
                                    refereceType: 'blob',          
                                })
                                .then((res) => {
                                    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });                        
                                    saveAs(pdfBlob, `Cuotas_${nombre_mes}_${anio}.pdf` );
                                    MySwal.fire({ 
                                    title: 'Archivo Generado',
                                    icon: 'success',
                                    timer: 3000,
                                    showConfirmButton: false
                                    })
                            })
                            }        
                        }) */
                    }else{
                        MySwal.fire({ 
                            title: `No se Han Generado las Cuotas de ${nombre_mes.toUpperCase()} de ${anio}`,
                            text: "Genere las Cuotas y vuelva a intentar!",
                            icon: 'error',
                            //timer: 3500,
                            showConfirmButton: true,
                            confirmButtonColor: '#3085d6',
                            })
                        navigate('/#/');  
                    }

                }else{
                    navigate('/#/');  
                }
                
            })
        }    
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []); //cuotas_generadas

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
    )
}
export default SimpleFormSocioCuotasImprimir
