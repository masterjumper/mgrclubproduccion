import {
    Button,
    Icon,
    Grid,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from '../../../../components/Typography'
import React, { useState} from 'react'
import { useNavigate, useLocation,  } from 'react-router-dom'; 
import {useDispatch} from 'react-redux'
//import {useDispatch, useSelector} from 'react-redux'
//import { createSOCIOTRANSACCION } from '../../../../redux/actions/SocioTransaccionActions'
import { addSocioTransaccion } from 'app/store/reducers/sociotransaccionSlice';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import InputAdornment from '@mui/material/InputAdornment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Connection } from 'app/utils/Connection';
import axios from 'axios';
import { saveAs } from 'file-saver';

const MySwal = withReactContent(Swal)

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const SimpleFormSocioAbono = () => {
    const location      = useLocation();
    
    const identificador = location.state.identificador; 
    let navigate    = useNavigate();
    let dispatch = useDispatch();

    const [transaccion, setTransaccion] = useState({
        socio_id: identificador,
        traimp:"", 
        traobs:"Abono Cuota",                     
    })   
    
    const {                 
        traimp,               
        traobs,        
        } = transaccion;

   
    const handleSubmit = (event) => {
        event.preventDefault();  
            //dispatch(createSOCIOTRANSACCION(transaccion));                     
            dispatch(addSocioTransaccion(transaccion))
            MySwal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se Registro el Abono/Credito con Exito',
                showConfirmButton: false,
                timer: 2000
            })
            .then((result) => { 
                     MySwal.fire({            
                    // title:  `Desea Imprimir El Carnet de ${socio.SocApe} ,${socio.SocNom} ?`,       
                     //title:  `Desea Imprimir el Recibo de ${SocApe}, ${SocNom} ?`,       
                     title:  `Desea Imprimir el Recibo?`,       
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
                             title: 'Generando Recibo',
                             showConfirmButton: false,
                             allowEscapeKey: false,
                             allowOutsideClick: false,
                             timer: 10000,
                             didOpen: () => {
                                 MySwal.showLoading();
                                 axios.post(Connection + '/genrecibo/create-pdf-recibo', transaccion)
                                     .then(() => {});                                
                             },
                         }).then(          
                             (dismiss) => {                      
                             if (dismiss.dismiss === 'timer') { 
                                 axios.get(Connection + '/genrecibo/fetch-pdf-recibo',{ 
                                     headers: {
                                         accessToken: localStorage.getItem("accessToken"),
                                     },
                                     responseType: 'blob', 
                                     refereceType: 'blob',          
                                 })
                                 .then((res) => {
                                     const pdfBlob = new Blob([res.data], { type: 'application/pdf' });                        
                                     //saveAs(pdfBlob, `Carnet_${socio.SocApe}_${socio.SocNom}.pdf` );
                                     //saveAs(pdfBlob, `recibo_${SocApe}_${SocNom}.pdf` );
                                     saveAs(pdfBlob, `recibo.pdf` );
                                     MySwal.fire({ 
                                     title: 'Archivo Generado',
                                     icon: 'success',
                                     timer: 3000,
                                     showConfirmButton: false
                                     }).then(
                                        navigate('/socioabono/' ,{state: {identificador}})
                                         )
                             })
                             }        
                         })                    
                     }else{
                        navigate('/socioabono/' ,{state: {identificador}})
                     } 
            })
        })         
    }
 
    const handleChange = (event) => {
        event.persist()
        setTransaccion({
            ...transaccion,
            [event.target.name]: event.target.value,
        })
    }

    const handleCancel = (event) => {
        navigate('/socio/' ,{
          state: {
            identificador,
          }
        });
    }
      
    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
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
                            label="Importe"
                            onChange={handleChange}
                            type="number"
                            name="traimp"                            
                            InputProps={{
                                startAdornment:<InputAdornment position="start">$</InputAdornment>
                              }}
                            value={traimp || ''}
                            validators={['required']}
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
            </ValidatorForm>
        </div>
    )
}
export default SimpleFormSocioAbono
