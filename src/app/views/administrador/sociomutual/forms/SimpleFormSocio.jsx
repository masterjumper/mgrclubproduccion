import {
    Button,
    Icon,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    FormControl,  
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from '../../../../components/Typography'
import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'; 
import {useDispatch, useSelector} from 'react-redux'
import { createSOCIO } from '../../../../redux/actions/SocioActions'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { get_ALL_LOCALIDADES } from '../../../../redux/actions/LocalidadActions'
import { get_ALL_CATEGORIAS } from '../../../../redux/actions/CategoriaActions'
import { get_ALL_TIPOSOCIOS } from '../../../../redux/actions/TipoSocioActions'

const MySwal = withReactContent(Swal)

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Formcontrol = styled(FormControl)(() => ({
    /* width: 300, */
    width: '100%',
    marginBottom: '16px',
})) 

const SimpleFormSocio = () => {
    
    const listaCategorias = useSelector(state => state.categorias);
    useEffect(() => { 
        dispatch(get_ALL_CATEGORIAS()) ; 
         // eslint-disable-next-line react-hooks/exhaustive-deps            
    },[]); 
        
    const listaLocalidades = useSelector(state => state.localidades);
    useEffect(() => { 
        dispatch(get_ALL_LOCALIDADES()) ; 
         // eslint-disable-next-line react-hooks/exhaustive-deps            
    },[]); 

      
    const listaTipoSocios = useSelector(state => state.tiposocios);
    useEffect(() => { 
        dispatch(get_ALL_TIPOSOCIOS()) ; 
         // eslint-disable-next-line react-hooks/exhaustive-deps            
    },[]); 

    const [state, setState] = useState({
    SocNom:"",
    SocApe:"",
    SocDom:"",
    SocTelCel:"",
    SocNroDNI:"",
    SocMail:"",
    SocMailTutor:"",
    SocTelCelTut:"",
    SocFecNac:"",
    SocSex:0,
    categoria_id:"",  
    localidad_id:"", 
    tiposocio_id:"",
    /*       
    SocMarMut:0,
    SocNro:"",
    SocFecBaj:"",
    SocFecAlt:"",
    SocHab:0,
    SocSal:0,
    SocPathFot:"", */})

    let navigate    = useNavigate();
    let dispatch = useDispatch();
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
        tiposocio_id,
        /* 
        SocNro,
        SocFecAlt, 
        SocFecBaj,               
        SocHab,
        SocSal,
        SocPathFot, */ } = state;

    const handleSubmit = (event) => {       
        
        event.preventDefault();  
        dispatch(createSOCIO(state)); 
        MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se Agrego con Exito',
            showConfirmButton: false,
            timer: 1500
          });
        navigate('/socio/');    
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleChangeSelect = (event) => {        
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleCancel = (event) => {
        navigate('/socio');
    }

    const handleChangeComboCategoria = (event) => {        
        setState({
            ...state,            
            categoria_id: event.target.value,
        })  
    }
    const handleChangeComboLocalidad = (event) => {        
        setState({
            ...state,            
            localidad_id: event.target.value,
        })  
    }

    const handleChangeComboTipoSocio = (event) => {        
        setState({
            ...state,            
            tiposocio_id: event.target.value,
        })  
    }
    
/*     const handleChangeCheckBox = (e)=>{        
        if (e.target.checked){            
            setState({
                ...state,
                [e.target.name]:1,
            })
        }else{            
            setState({
                ...state,
                [e.target.name]:0,
            })
        }        
    } */
      
    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                        
                        <TextField
                            type="text"
                            name="SocNom"
                            id="standard-basic"
                            onChange={handleChange}
                            value={SocNom || ''}
                            validators={[
                                'required',
                                'minStringLength: 4',                                
                            ]}
                            label="Nombre (Largo min. 4)"
                            errorMessages={['Se requiere este campo']}                                           
                        />
                        <TextField
                            type="number"
                            name="SocNroDNI"
                            id="standard-basic"
                            onChange={handleChange}
                            value={SocNroDNI || ''}
                            validators={[
                                'required',
                            ]}
                            label="DNI"
                            errorMessages={['Se requiere este campo']}                                           
                        /> 
                        <TextField
                            type="date"
                            name="SocFecNac"
                            id="standard-basic"
                            onChange={handleChange}
                            value={SocFecNac || ''}
                            validators={[
                                'required',
                            ]}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            label="Fecha Nacimiento"
                            errorMessages={['Se requiere este campo']}                                           
                        />  
                        <TextField
                            type="number"
                            name="SocTelCel"
                            id="standard-basic"
                            onChange={handleChange}
                            value={SocTelCel || ''}
                            /* validators={[
                                'required',
                            ]} */
                            label="Telefono/Celular"
                            /* errorMessages={['Se requiere este campo']}   */                                         
                        />
                        <TextField
                            type="number"
                            name="SocTelCelTut"
                            id="standard-basic"
                            onChange={handleChange}
                            value={SocTelCelTut || ''}
                            /* validators={[
                                'required',                                
                            ]} */
                            label="Telefono/Celular Tutor"
                            /* errorMessages={['Se requiere este campo']}  */                                          
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
                                <MenuItem key={0} value={0} disabled>{"Seleccione..."}</MenuItem>
                                {listaCategorias.categorias && listaCategorias.categorias
                                .map((categorias) => (                                
                                    <MenuItem key={categorias.id} value={categorias.id}>{categorias.catdsc}</MenuItem>
                                ))}    
                            </Select>
                        </Formcontrol>
                        <Formcontrol>
                            <InputLabel id="demo-simple-select-label">Tipo socio</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tiposocio_id}
                                label="categoria_id"
                                onChange={handleChangeComboTipoSocio} 
                                errorMessages={['Se requiere este campo']}
                                validators={[
                                    'required',                                
                                ]}                                                               
                            >
                                <MenuItem key={0} value={0} disabled>{"Seleccione..."}</MenuItem>
                                {listaTipoSocios.tiposocios && listaTipoSocios.tiposocios
                                .map((tiposocios) => (                                
                                    <MenuItem key={tiposocios.id} value={tiposocios.id}>{tiposocios.tipsocdsc}</MenuItem>
                                ))}    
                            </Select>
                        </Formcontrol>                                     
                    </Grid>                                    
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    {/* <Grid item lg={1} md={1} sm={1} xs={1} sx={{ mt: 8.6 }}>
                        </Grid>  */}                                               
                         <TextField
                            type="text"
                            name="SocApe"
                            id="standard-basic"
                            onChange={handleChange}
                            value={SocApe || ''}
                            validators={[
                                'required',
                                'minStringLength: 4',                                
                            ]}
                            label="Apellido (Largo min. 4)"
                            errorMessages={['Se requiere este campo']}                                           
                        />                        
                        <TextField
                            type="text"
                            name="SocDom"
                            id="standard-basic"
                            onChange={handleChange}
                            value={SocDom || ''}
                            validators={[
                                'required',                                
                            ]}
                            label="Domicilio"
                            errorMessages={['Se requiere este campo']}                                           
                        />                        
                        <Formcontrol fullWidth>
                            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="SocSex"
                                value={SocSex || ''}
                                displayEmpty
                                label="Sexo"
                                onChange={handleChangeSelect}
                                validators={[
                                    'required',
                                ]}
                                /* errorMessages={['Se requiere este campo']} */
                            >
                                <MenuItem value={1}>Masculino</MenuItem>
                                <MenuItem value={2}>Femenino</MenuItem>                                
                            </Select>
                        </Formcontrol>
                        <TextField
                            type="mail"
                            name="SocMail"
                            id="standard-basic"
                            onChange={handleChange}
                            value={SocMail || ''}
                            /* validators={[
                                'required',                                
                            ]} */
                            label="Correo Electronico"
                            /* errorMessages={['Se requiere este campo']}  */                                          
                        />
                        <TextField
                            type="mail"
                            name="SocMailTutor"
                            id="standard-basic"
                            onChange={handleChange}
                            value={SocMailTutor || ''}
                            /* validators={[
                                'required',                                
                            ]} */
                            label="Correo Electronico Tutor"
                            /* errorMessages={['Se requiere este campo']} */                                           
                        />
                        <Formcontrol>
                            <InputLabel id="demo-simple-select-label">Localidad</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={localidad_id}
                                label="localidad_id"
                                onChange={handleChangeComboLocalidad} 
                                displayEmpty   
                                validators={[
                                'required',                                
                                ]}    
                                /* errorMessages={['Se requiere este campo']} */
                            >
                                <MenuItem key={0} value={0} disabled>{"Seleccione..."}</MenuItem>
                                {listaLocalidades.localidades && listaLocalidades.localidades
                                .map((localidades) => (                                
                                    <MenuItem key={localidades.id} value={localidades.id}>{localidades.locdsc}</MenuItem>
                                ))}    
                            </Select>
                        </Formcontrol>          
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
export default SimpleFormSocio
