import {
    Button,
    Icon,
    Grid,        
    Avatar,    
    IconButton,
    Badge,        
} from '@mui/material'

import { styled } from '@mui/system'
import { Span } from '../../../../components/Typography'
import React, { useState, useEffect} from 'react'
//import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
//import useAuth from '../../hooks/useAuth'
//import { get_PERFIL, updatePERFIL } from '../../../../redux/actions/PerfilActions'
import { get_PERFIL, updatePERFIL, updatePERFIL_NOImageChange, updatePERFIL_PasswordChange } from '../../../../redux/actions/PerfilActions'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

/* const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '"+"',
        //content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  })); */
  
const SimpleFormUpdatePerfil= () => {
    
    //const location          = useLocation(); 
    let dispatch            = useDispatch();   
    let navigate            = useNavigate();
    const {perfil}            = useSelector(state => state.perfil);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selImage, setSelImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [ImageChanged, setImageChanged] = useState(false);

    const [passwordInput, setPasswordInput]= useState({
        newPassword:'',
        confirmPassword:''
    })

    const [user, setUser] = useState({
    username : "",
    //password : "",
    email : "",
    avatar : "",
    nombre : "",    
    apellido : "",    
    });

    const {username,  
        //password,
        email,
        avatar,
        nombre,
        apellido,         
    } = user 

    useEffect(() => {            
        dispatch(get_PERFIL());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 
    
    useEffect(() => {            
        if(perfil){
            setUser(perfil);              
        }
    },[perfil]);

    useEffect(() => {
        if (selImage) {
            //console.log(URL.createObjectURL(selImage));
          setImageUrl(URL.createObjectURL(selImage));                  
        }       
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [selectedImage]); 
   

    const handleInputChange = (e) => {    
        e.persist()
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });    
    };

    const handleInputChangePassword = (e) => {    
        e.persist()        
        setPasswordInput({...passwordInput, [e.target.name]: e.target.value})  
    };

    const handleSubmit = (event) => {   
        if(passwordInput && (passwordInput.confirmPassword.length > 0 || passwordInput.newPassword.length > 0)){
           
            if(passwordInput.confirmPassword === passwordInput.newPassword){
                dispatch(updatePERFIL_PasswordChange(user.id, passwordInput));
            }else{
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Las Contraseñas NO coinciden',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }   

        if (ImageChanged){
            const imaselected = { image: selectedImage, imagename: selImage.name, username: user.username}
            const imanameselected = {imagename: selImage.name }        
            const usernameselected = {username: user.username}
            dispatch(updatePERFIL(user.id, user, imaselected, imanameselected, usernameselected)); 
            MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se Guardo con Exito',
            showConfirmButton: false,
            timer: 1500
        });
        }else{
            dispatch(updatePERFIL_NOImageChange(user.id, user)); 
            MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se Guardo con Exito',
            showConfirmButton: false,
            timer: 1500
        });
        }
        navigate('/perfil/u');   
    }
   
    const handleCancel = (event) => {
        navigate('/');
    }
        
    const onFileUpload = (e) => {        
        //setSelectedImage(e.target.files[0])
        setSelImage(e.target.files[0])
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]); 
        
        fileReader.onload = (event) => {            
            setSelectedImage(event.target.result)
            setImageChanged(true);
            //setUser({avatar:event.target.result.name})            
        }
      }

    return (
        <div>            
            <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
                <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                                
                        
                        <TextField
                            label="Nombre "
                            type="text"
                            name="nombre"
                            value={nombre || '' }
                            onChange={handleInputChange}                            
                            errorMessages={['Se requiere este campo']}
                        />

                        <TextField
                            label="Apellido "
                            type="text"
                            name="apellido"
                            value={apellido || '' }
                            onChange={handleInputChange}                            
                            errorMessages={['Se requiere este campo']}
                        /> 

                        <TextField
                            label="Correo Electronico"
                            type="email"
                            name="email"
                            value={email || '' }
                            onChange={handleInputChange}                            
                            errorMessages={['Se requiere este campo']}
                        />    

                        <TextField
                            type="password"
                            name="newPassword"                            
                            value={passwordInput.newPassword || ''}
                            onChange={handleInputChangePassword}                            
                            validators={passwordInput.newPassword.length > 0 ? [
                                //'required',
                                'minStringLength: 4',
                                'maxStringLength: 15',
                            ] : ['minStringLength: 0',]
                            }
                            label="Contraseña Nueva(Largo min. 8, Largo Maximo 15)"
                            //errorMessages={['Se requiere este campo']}
                        /> 

                        <TextField
                            type="password"
                            name="confirmPassword"                            
                            value={passwordInput.confirmPassword || ''}
                            onChange={handleInputChangePassword}                                  
                            validators={passwordInput.confirmPassword.length > 0 ? [
                                //'required',
                                'minStringLength: 4',
                                'maxStringLength: 15',                                
                            ] : ['minStringLength: 0',]
                            }
                            label="Confirmar Contraseña (Largo min. 8, Largo Maximo 15)"                      
                            //errorMessages={['Se requiere este campo']}
                        />
                
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        
                        <IconButton color="primary" component="label">
                            <input accept="image/*" id="icon-button-file" type="file" name= "myFile" hidden 
                            onChange={onFileUpload}                            
                            />
                            <Badge color="primary" badgeContent={<Icon>autorenew</Icon>}>
                                <Avatar alt={username} src={
                                    (imageUrl && selectedImage && selImage && (imageUrl)) || (avatar)
                                    } sx={{ width: 150, height: 150 }}/>                                      
                            </Badge>
                        </IconButton>
                        
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
export default SimpleFormUpdatePerfil
