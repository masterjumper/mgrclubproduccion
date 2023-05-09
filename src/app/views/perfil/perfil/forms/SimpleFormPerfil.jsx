import {
    Button,
    Icon,
    Grid,    
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from '../../../../components/Typography'
import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'; 
import {useDispatch} from 'react-redux'
import { createCATEGORIA } from '../../../../redux/actions/CategoriaActions'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import InputAdornment from '@mui/material/InputAdornment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const SimpleFormCategoria = () => {     
    const [state, setState] = useState({catdsc : "", catedades :0, catedahas:0, catimp:0, catexe:2});
    let navigate            = useNavigate();
    let dispatch            = useDispatch();
    const {       
        catdsc, catedades, catedahas, catimp,
    } = state
  
    const handleSubmit = (event) => {
        event.preventDefault();  
        dispatch(createCATEGORIA(state)); 
        MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se Agrego con Exito',
            showConfirmButton: false,
            timer: 1500
          });
        navigate('/categoria/');    
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    
    const handleChangeCheckBox = (e)=>{        
        if (e.target.checked){            
            setState({
                ...state,
                [e.target.name]:1,
            })
        }else{            
            setState({
                ...state,
                [e.target.name]:2,
            })
        }        
    }

    const handleCancel = (event) => {
        navigate('/categoria');
    }
   
    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                         <TextField
                            type="text"
                            name="catdsc"
                            id="standard-basic"
                            onChange={handleChange}
                            value={catdsc || ''}
                            validators={[
                                'required',
                                'minStringLength: 4',
                                'maxStringLength: 15',
                            ]}
                            label="Descripcion (Largo min. 4, Largo Maximo 15)"
                            errorMessages={['Se requiere este campo']}
                        />
                        <TextField
                            label="Edad Desde"
                            onChange={handleChange}
                            type="text"
                            name="catedades"
                            value={ catedades || ''}
                            validators={['required']}
                            errorMessages={['Se requiere este campo']}
                        />
                        <TextField
                            label="Importe"
                            onChange={handleChange}
                            type="number"
                            name="catimp"                            
                            InputProps={{
                                startAdornment:<InputAdornment position="start">$</InputAdornment>
                              }}
                            value={catimp || ''}
                            validators={['required']}
                            errorMessages={['Se requiere este campo']}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Grid item lg={1} md={1} sm={1} xs={1} sx={{ mt: 8.6 }}>
                        </Grid>
                        <TextField
                            label="Edad Hasta"
                            onChange={handleChange}
                            type="text"
                            name="catedahas"
                            value={catedahas || ''}
                            validators={['required']}
                            errorMessages={['Se requiere este campo']}
                        />
                        <FormControlLabel
                            control={<Checkbox
                                name="catexe"
                                onClick={(e) =>handleChangeCheckBox(e)}
                                inputProps={{ 'aria-label': 'controlled' }}                                
                            />}
                            label="Vitalicio"
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
export default SimpleFormCategoria
