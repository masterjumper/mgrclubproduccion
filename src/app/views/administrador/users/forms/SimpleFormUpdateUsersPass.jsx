import {
    Button,
    Icon,
    Grid,   
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from '../../../../components/Typography'
import React, { useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {useDispatch, useSelector} from 'react-redux'
import { get_USER, updateUSER_PasswordChange} from '../../../../redux/actions/UsersActions'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))
const SimpleFormUpdateUsersPass = () => {
    const location          = useLocation();    
    const {user}            = useSelector(state => state.users);    
    const [state, setState] = useState({username: ""})
    const [passwordInput, setPasswordInput]= useState({
        newPassword:'',
        confirmPassword:''
    })

    let navigate            = useNavigate();
    let dispatch            = useDispatch();
    const {username} = state;

    useEffect(() => {            
        dispatch(get_USER(location.state.identificador));
        // eslint-disable-next-line react-hooks/exhaustive-deps   
    },[]);    

    useEffect(() => {            
        if(user){
            setState(user);     
        }
    },[user]);

     const handleSubmit = (event) => {

        if(passwordInput && (passwordInput.confirmPassword.length > 0 || passwordInput.newPassword.length > 0)){
           
            if(passwordInput.confirmPassword === passwordInput.newPassword){
                dispatch(updateUSER_PasswordChange(user.id, passwordInput));
                MySwal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Saved!',
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/appusers/'); 
            }else{
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Password dont match',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } else{
            MySwal.fire({
                position: 'center',
                icon: 'error',
                title: 'Nothing To Change',
                showConfirmButton: false,
                timer: 1500
            });
        }

         /* event.preventDefault();  
         //dispatch(updateUSER(location.state.identificador, state)); 
         dispatch(updateUSER_PasswordChange(user.id, passwordInput)); */
          
     }

     const handleCancel = (event) => {
         navigate('/appusers/');
     }

     const handleInputChangePassword = (e) => {    
        e.persist()        
        setPasswordInput({...passwordInput, [e.target.name]: e.target.value})  
    };
    
     return (
         <div>
             <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
                 <Grid container spacing={6}>
                     <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                          <TextField                             
                             type="text"
                             name="username"
                             id="standard-basic"                             
                             value={username || ''}                             
                             label="Username"                                                          
                         /> 
                         <TextField
                            type="password"
                            name="newPassword"                            
                            value={passwordInput.newPassword || ''}
                            onChange={handleInputChangePassword}                            
                            validators={passwordInput.newPassword.length > 0 ? [
                                //'required',
                                'minStringLength: 8',
                                'maxStringLength: 15',
                            ] : ['minStringLength: 0',]
                            }
                            label="New Password(length min. 8, Length Max. 15)"
                            //errorMessages={['Se requiere este campo']}
                        /> 

                        <TextField
                            type="password"
                            name="confirmPassword"                            
                            value={passwordInput.confirmPassword || ''}
                            onChange={handleInputChangePassword}                                  
                            validators={passwordInput.confirmPassword.length > 0 ? [
                                //'required',
                                'minStringLength: 8',
                                'maxStringLength: 15',                                
                            ] : ['minStringLength: 0',]
                            }
                            label="Confirm Password (length min. 8, Length Max. 15)"                      
                            //errorMessages={['Se requiere este campo']}
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

export default SimpleFormUpdateUsersPass