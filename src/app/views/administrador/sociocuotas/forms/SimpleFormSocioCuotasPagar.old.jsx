import {
    Button,
    Icon,
/*     Grid,        
    FormControl, */  
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from '../../../../components/Typography'
import React, { useState, useEffect} from 'react'
//import React, { useState} from 'react'
//import { useNavigate, useLocation } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; 
import {useDispatch, useSelector} from 'react-redux'
//import {useDispatch} from 'react-redux'
import { createSOCIOCUOTAPAGO } from '../../../../redux/actions/SocioCuotasActions'
//import { get_ULTIMONUMERO } from '../../../../redux/actions/UltimosNumerosActions'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
//import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const SimpleFormSocioCuotasPagar = () => {
   
   let dispatch = useDispatch();
   const navigate = useNavigate();
   const [state, setState] = useState({cuonro:''})
   const { cuonro } = state;

   const handleSubmit = (event) => {  
        event.preventDefault();  
        dispatch(createSOCIOCUOTAPAGO(state)); 
    }

    const handleCancel = (event) => {
        navigate('/');
    }
    
    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

   let pago_ok = useSelector(state => state.sociocuotas); 
    useEffect(() => {            
        if(pago_ok){
            if(pago_ok.sociocuotas === 'success'){
                MySwal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'El Pago fue Registrado con Exito',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            if(pago_ok.sociocuotas === 'failure'){                 
                    MySwal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'No se Encuentra',
                        text:'Codigo de Barra o Nro. Recibo',
                        showConfirmButton: false,
                        timer: 2000
                    });
            }
            if(pago_ok.sociocuotas === 'exist'){                 
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'El Pago YA Fue Registrado',
                    text:'con el Codigo de Barra o Nro. Recibo ',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }                    
        // eslint-disable-next-line react-hooks/exhaustive-deps
   },[pago_ok]);
   
    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null} > 
                <TextField
                    type="number"
                    name="cuonro"
                    id="standard-basic"
                    onChange={handleChange}
                    value={cuonro || ''}
                    validators={[
                        'required',                                                        
                    ]}
                    label="Codigo de Barras o Nro. Recibo"
                    errorMessages={['Se requiere este campo']}                                           
                />               
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
            </ValidatorForm>
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
export default SimpleFormSocioCuotasPagar
