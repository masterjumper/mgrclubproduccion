/* import {
    Button,
    Icon,
    Grid,        
    FormControl,  
} from '@mui/material' */
//import { styled } from '@mui/system'
//import { Span } from '../../../../components/Typography'
//import React, { useState, useEffect} from 'react'
import React, { useEffect, useState } from 'react'
//import { useNavigate, useLocation } from 'react-router-dom'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
//import {useDispatch, useSelector} from 'react-redux'
//import {useDispatch} from 'react-redux'
//import { get_ULTIMONUMERO } from '../../../../redux/actions/UltimosNumerosActions'
//import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
//import { get_CUOTAS_GENERADAS } from '../../../../redux/actions/SocioCuotasActions';
//import { get_SOCIO, get_SOCIO_CATEGORIA } from '../../../../redux/actions/SocioActions';
//import { get_SOCIO_CATEGORIA } from '../../../../redux/actions/SocioActions';
import { fetchSocioCategoriabyId } from 'app/store/reducers/sociosSlice'; 
import {useDispatch , useSelector} from 'react-redux';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//import {Connection} from '../../../../redux/Connection'
import { Connection } from '../../../../utils/Connection';
const MySwal = withReactContent(Swal)

const SimpleFormSocioCarnetImprimir = () => {   
    let dispatch = useDispatch();    
    const navigate = useNavigate(); 
    const location  = useLocation();
    const [state, setState] = useState({
        SocNom:"",
        SocApe:"",            
    });

    useEffect(() => {        
        //dispatch(get_SOCIO_CATEGORIA(location.state.identificador));      
        dispatch(fetchSocioCategoriabyId({id:location.state.identificador}));
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    },[dispatch]);

    let sociocategoria = useSelector(state => state.socios.sociocategoria);
    
    useEffect(() => {                   
        if(sociocategoria){
            setState(sociocategoria);              
        }
    },[sociocategoria]);
    
    const { 
        SocNom,
        SocApe,                
        } = state;
    
     useEffect(()=> {        
        if(sociocategoria){                
            MySwal.fire({            
               // title:  `Desea Imprimir El Carnet de ${socio.SocApe} ,${socio.SocNom} ?`,       
                title:  `Desea Imprimir El Carnet de ${SocApe}, ${SocNom} ?`,       
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI',
                cancelButtonText: 'NO'
                }).then((result) => {
                if (result.isConfirmed) {                   
                    MySwal.fire({
                        position: 'center',        
                        title: 'Generando Carnet',
                        showConfirmButton: false,
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        timer: 10000,
                        didOpen: () => {
                            MySwal.showLoading();
                            axios.post(Connection + '/gencarnet/create-pdf-carnet', sociocategoria)
                                .then(() => {});                                
                        },
                    }).then(          
                        (dismiss) => {                      
                        if (dismiss.dismiss === 'timer') { 
                            axios.get(Connection + '/gencarnet/fetch-pdf-carnet',{ 
                                headers: {
                                    accessToken: localStorage.getItem("accessToken"),
                                },
                                responseType: 'blob', 
                                refereceType: 'blob',          
                            })
                            .then((res) => {                                
                                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });                                                        
                                saveAs(pdfBlob, `Carnet_${SocApe}_${SocNom}.pdf` );
                                MySwal.fire({ 
                                title: 'Archivo Generado',
                                icon: 'success',
                                timer: 3000,
                                showConfirmButton: false
                                }).then(
                                    navigate('/socio')
                                    )
                        })
                        }        
                    })                    
                }else{
                    navigate('/socio');  
                }
            })            
        
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }); 

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
export default SimpleFormSocioCarnetImprimir
