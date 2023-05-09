import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Menu,
    MenuItem,
    /* Fab, */
    Grid,   
    FormControl,
    InputLabel,
    Select, 
    /* Checkbox,
    FormControlLabel, */
} from '@mui/material'

import { GridToolbar} from '@mui/x-data-grid'
import Loading from '../../MatxLoading'
import { esES } from '@mui/material/locale'
import React,{useEffect, useState, Suspense }  from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
//import Swal from 'sweetalert2'
//import withReactContent from 'sweetalert2-react-content'
import { createTheme,  ThemeProvider} from '@mui/material/styles'
import {useDispatch, useSelector} from 'react-redux'
import { get_ALL_SOCIOSMUTUAL,  startSOCIOMUTUAL, get_FILTRADO_SOCIOSMUTUAL } from '../../../../redux/actions/SocioMutualActions'
//errorSOCIOMUTUAL, deleteSOCIOMUTUAL, startSOCIOMUTUAL, gencuoSOCIOMUTUAL, get_FILTRADO_SOCIOSMUTUAL, 
//reasociarSOCIOMUTUAL, dardebajaSOCIOMUTUAL } from '../../../../redux/actions/SocioMutualActions'


import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import InputAdornment from '@mui/material/InputAdornment';

const ITEM_HEIGHT = 48

//const MySwal = withReactContent(Swal)

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',    
    '& small': {
        height: 15,
        width: 50,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const tema = createTheme(
    {
      palette: {
          primary: { main: '#1976d2' },
      },
      },          
    esES,
  );

  const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Formcontrol = styled(FormControl)(() => ({
    /* width: 300, */
    width: '100%',
    marginBottom: '16px',
})) 

const PaginationTableSocioMutual = () => {
    //let filtrado;
    let navigate    = useNavigate();
    const [anchorEl, setAnchorEl]           = React.useState(null);
    const open = Boolean(anchorEl);
    const [identificador, setidentificador] = useState(null);
    const [rowsPerPage, setRowsPerPage]     = React.useState(5);
    const [page, setPage]                   = React.useState(0);    
    const [searched, setSearched] = useState("");
    const [columna, setColumna] = useState(1);
    const [mostrar, setMostrar] = useState(3);
    //const [quitar, setQuitar] = useState(1);
    
    const listaDesocios = useSelector(state => state.sociomutual);    

    let dispatch = useDispatch();    
    useEffect(() => {         
        dispatch(get_ALL_SOCIOSMUTUAL());         
        // eslint-disable-next-line react-hooks/exhaustive-deps                
    },[dispatch]);     
    
    /*
    let errores = useSelector(state => state.sociosmutual.message);    
    useEffect(() => {
        if(errores){ 
            if(errores === 'success_baja'){  
                setPage(0)                           
                MySwal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'El Socio se ha dado de Baja',
                    showConfirmButton: false,
                    timer: 1500                       
                });     
            }       

            if(errores === 'success_reasociado'){  
                setPage(0)                           
                MySwal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Socio Reasociado',
                    showConfirmButton: false,
                    timer: 1500                       
                });     
            }       
             
            if(errores === 'success'){  
                setPage(0)                           
                MySwal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registro Eliminado',
                    showConfirmButton: false,
                    timer: 1500                       
                }); 
    
            }
            if(errores === 'Existen Registros Relacionados'){
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: errores,
                    showConfirmButton: true,                    
                    //timer: 1500
                });                
            }
            if(errores === 'Ya fue Generada la Cuota Para el Socio'){
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: errores,
                    showConfirmButton: true,
                    //timer: 1500
                });                
            }
            if(errores === 'Cuotas No Generadas para el MES actual'){
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: errores,
                    showConfirmButton: true,
                    //timer: 1500
                });                
            }
            if(errores === 'Socio Dado de Baja'){
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: errores,
                    showConfirmButton: true,
                    //timer: 1500
                });                
            }

            if(errores === 'Cuota Generada para el Socio'){                               
                MySwal.fire({
                    position: 'center',
                    title: 'Desea Imprimir la Cuota Individual?',
                    //text: "No se podra Revertir!",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'NO',
                    confirmButtonText: 'SI',}).then((result) => {
                        if (result.isConfirmed) {
                            MySwal.fire({
                                position: 'center',        
                                title: 'Generando Archivo de Cuota',
                                showConfirmButton: false,
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                timer: 10000,
                                didOpen: () => {
                                    MySwal.showLoading();
                                    axios.post(Connection + '/gencuota/create-pdf', {socid:identificador} )
                                        .then(() => {});                                
                                },
                            }).then(          
                                (dismiss) => {                      
                                if (dismiss.dismiss === 'timer') { 
                                    axios.get(Connection +'/gencuota/fetch-pdf',{ 
                                        headers: {
                                            accessToken: localStorage.getItem("accessToken"),
                                        },
                                        responseType: 'blob', 
                                        refereceType: 'blob',          
                                    })
                                    .then((res) => {
                                        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });                        
                                        saveAs(pdfBlob, `Cuota.pdf` );
                                        MySwal.fire({ 
                                        title: 'Archivo Generado',
                                        icon: 'success',
                                        timer: 3000,
                                        showConfirmButton: false
                                        })
                                })
                                }        
                            })
                        }
                    }
                )                    
            }
            if(errores === 'Archivo Generado'){
                MySwal.fire({
                    position: 'center',
                    icon: 'success',
                    title: errores,
                    showConfirmButton: false,
                    timer: 1500
                }); 
            }
            dispatch(startSOCIO())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[errores]);
    */
    
/*     const handleAdd = () => {
        dispatch(startSOCIOMUTUAL())
        navigate('/sociomutual/i');
    } */

    const handleActionClick = (id, event) => {
        dispatch(startSOCIOMUTUAL())
        setidentificador(id);        
        setAnchorEl(event.currentTarget);        
    }

    function handleClose() {
        setAnchorEl(null)
    }
/*
    function handleUpdate () {      
        handleClose()            
            navigate('/sociomutual/u',
            {
              state: {
                identificador,
              }
            });        
    }
     
     function handleDisciplina () {      
        handleClose()
        navigate('/sociodisciplina/',
        {
            state: {
            identificador,
            }
        });        
    }   */

    /* function handleAdicional() {      
        handleClose()
        navigate('/socioadicional/',
        {
            state: {
            identificador,
            }
        });        
    }  */ 

    function handleMovCta () {      
        handleClose()
        navigate('/sociotransaccion/',
        {
            state: {
            identificador,
            }
        });        
    }  

    /* function handleAbono () {      
        handleClose()
        navigate('/socioabono/',
        {
            state: {
            identificador,
            }
        });        
    } */
    
    /* function handleGenCuo () {      
        handleClose()
        MySwal.fire({
            position: 'center',
            title: 'Seguro de Generar la Cuota Individual?',
            text: "No se podra Revertir!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'NO',
            confirmButtonText: 'SI',}).then((result) => {
                if (result.isConfirmed) { 
                    dispatch(startSOCIOMUTUAL())                       
                    dispatch(gencuoSOCIOMUTUAL(identificador))   
                    MySwal.fire({
                        position: 'center',        
                        title: 'Generando Archivo de Cuota',
                        showConfirmButton: false,
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        timer: 3000,
                        didOpen: () => {
                            MySwal.showLoading();                            
                        }});
                }
            }
        )      
    } */

    /* function handleCarnet () {
        handleClose()
        navigate('/sociocarnet/',
        {
            state: {
            identificador,
            }
        });
    } */

    /* function handleDelete () { 
        handleClose()        
        MySwal.fire({
            position: 'center',
            title: 'Seguro de Eliminar este Registro?',
            text: "No se podra Revertir!",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'NO',
            confirmButtonText: 'SI',}).then((result) => {
                if (result.isConfirmed) { 
                        dispatch(startSOCIOMUTUAL())                       
                        dispatch(deleteSOCIOMUTUAL(identificador))
                }
            }
        )             
    } */
    
    /* function handleImpCuoInd () {
        handleClose()  
        MySwal.fire({
            position: 'center',        
            title: 'Generando Archivo de Cuota',
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 10000,
            didOpen: () => {
                MySwal.showLoading();
                axios.post(Connection + '/gencuota/create-pdf', {socid:identificador} )
                    .then(() => {});                                
            },
        }).then(          
            (dismiss) => {                      
            if (dismiss.dismiss === 'timer') { 
                axios.get(Connection +'/gencuota/fetch-pdf',{ 
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                    responseType: 'blob', 
                    refereceType: 'blob',          
                })
                .then((res) => {
                    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });                        
                    saveAs(pdfBlob, `Cuota.pdf` );
                    MySwal.fire({ 
                    title: 'Archivo Generado',
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false
                    })
            })
            }        
        })                   
    } */    

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }    
    
    const handleSearchSubmit = (event) => {        
        event.preventDefault();         
        if(searched){
            dispatch(get_FILTRADO_SOCIOSMUTUAL(searched, columna, mostrar))
        }
    }
    
    const handleSearchChange = (event) => {
        /* if(event.target.value.length > 0) {			            
            //console.log('searched ', searched, ' columna ', columna, ' mostrar ', mostrar, ' quitar ', quitar);       
		}else{            
        //dispatch(get_SIN_FILTRADO_SOCIOSMUTUAL())        
        // dispatch(get_FILTRADO_SOCIOSMUTUAL(searched, columna, mostrar, quitar))
        } */
        setSearched(event.target.value)
    }    

    useEffect(() => {
        dispatch(get_FILTRADO_SOCIOSMUTUAL(searched, columna, mostrar)) 
	}, [searched, columna, mostrar, dispatch]);

    const handleChangeColumna = (event) => {
        /* 
        if(event.target.value.length > 0) {			            
		}
        else{            
            //dispatch(get_SIN_FILTRADO_SOCIOSMUTUAL())
        } */
        setColumna(event.target.value)
    }

    const handleChangeMostrar = (event) => {
        if(event.target.value.length > 0) {			            
		}else{            
            //dispatch(get_SIN_FILTRADO_SOCIOSMUTUAL())
        }
        setMostrar(event.target.value)
    }


    /* function handleReAsociar () {
        MySwal.fire({
            position: 'center',
            title: 'Seguro de Reasociar este Socio?',            
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'NO',
            confirmButtonText: 'SI',}).then((result) => {
                if (result.isConfirmed) { 
                        dispatch(startSOCIO())                       
                        dispatch(reasociarSOCIO(identificador)) 
                        setPage(0)                       
                }
            }
        )                 
    } */

    
    /* function handleDarDeBaja () {
        MySwal.fire({
            position: 'center',
            title: 'Seguro de Dar de Baja este Socio?',            
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'NO',
            confirmButtonText: 'SI',}).then((result) => {
                if (result.isConfirmed) { 
                        dispatch(startSOCIO())                       
                        dispatch(dardebajaSOCIO(identificador))
                }
            }
        )                 
    } */

    return (        
        <Box width="100%" overflow="auto">
            <ValidatorForm onSubmit={handleSearchSubmit} onError={() => null} > 
                            {/* <FormControlLabel
                                control={<Checkbox
                                name="quitar"                                        
                                onClick={(e) =>handleChangeCheckBox(e)}
                                inputProps={{ 'aria-label': 'controlled'}}
                                defaultChecked
                            />}
                            label="Quitar Soc. Mut."
                            /> */} 
                             <Grid container spacing={1}>
                                <Grid item lg={3} md={3} sm={6} xs={6} sx={{ mt: 1 }}>                                        
                                    <Formcontrol fullWidth>
                                        <InputLabel id="demo-simple-select-label">Filtrar por</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="Columna"
                                            value={columna}
                                            label="Filtrar por"
                                            displayEmpty
                                            onChange={handleChangeColumna}                                                                           
                                        >
                                            <MenuItem key={1} value={1}>Nombre</MenuItem>
                                            <MenuItem key={2} value={2}>Apellido</MenuItem>                                
                                            <MenuItem key={3} value={3}>Nro. Socio</MenuItem>                                
                                        </Select>
                                    </Formcontrol> 
                                </Grid>        
                                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 1 }}>
                                        <TextField
                                            type="text"
                                            name="buscar"
                                            id="standard-basic"
                                            onChange={handleSearchChange}
                                            value={searched || ""}                                            
                                            label="Buscar Aqui..."    
                                            InputProps={{
                                                endAdornment:<InputAdornment position="end" onClick={handleSearchSubmit}>
                                                <Icon>search</Icon>    
                                                </InputAdornment>
                                            }}                
                                        />  
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} xs={6} sx={{ mt: 1 }}>
                                <Formcontrol fullWidth>
                                        <InputLabel id="demo-simple-select-label">Mostrar</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="Mostrar"
                                    value={mostrar}
                                    label="Mostrar"
                                    displayEmpty
                                    onChange={handleChangeMostrar}
                                >
                                    <MenuItem key={1} value={1}>Activos</MenuItem>
                                    <MenuItem key={2} value={2}>Inactivos</MenuItem>                                      
                                    <MenuItem key={3} value={3}>Todos</MenuItem>
                                </Select>
                                </Formcontrol>
                                </Grid>
                            </Grid>
{/*                             </AccordionDetails>
                        </Accordion>                       
                </AccordionRoot>    */}
            </ValidatorForm>  
            <StyledTable>                                                          
                <TableHead>                    
                    <TableRow>
                        <TableCell>Socio</TableCell>
                        <TableCell>Nombre</TableCell>                        
                        <TableCell>Apellido</TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell>Saldo</TableCell>                        
                        <TableCell>Telefono/Celular</TableCell>                        
                        <TableCell>Localidad</TableCell>
                       {/*  <TableCell>
                            <Fab color="primary" size="small" aria-label="Add" onClick={(e) => handleAdd(e)}>
                                       <Icon>add</Icon> 
                            </Fab> 
                        </TableCell> */}          
                    </TableRow>
                </TableHead>
                <Suspense fallback={<Loading />}>
                <TableBody>
                    {listaDesocios.sociosmutual && listaDesocios.sociosmutual                        
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )                         
                        .map((socio) => (                                                        
                            <TableRow  key={socio.id} >
                                <TableCell align="left">{socio.SocNro}</TableCell>
                                <TableCell align="left">{socio.SocNom}</TableCell>
                                <TableCell align="left">{socio.SocApe}</TableCell>
                                <TableCell align="left">{socio.Categoria.catdsc}</TableCell>
                                <TableCell align="left">{socio.SocSal}</TableCell>                                
                                <TableCell align="left">{socio.SocTelCel}</TableCell>                                
                                <TableCell align="left">{socio.Localidade.locdsc}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        aria-owns={open ? 'long-menu' : undefined}
                                        onClick={(e) => handleActionClick(socio.id, e)}
                                    >
                                        <Icon>more_vert</Icon>
                                    </IconButton>                                  
                                        <Menu
                                            id="long-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: ITEM_HEIGHT * 4.5,
                                                    width: 200,
                                                },
                                            }}
                                        > 
                                            {/*<MenuItem  onClick={() => handleUpdate()} >
                                                <Icon>edit</Icon>
                                                Editar 
                                            </MenuItem>
                                            <MenuItem onClick={(e) => handleDelete()}>                                            
                                                <Icon>delete</Icon> 
                                                Eliminar
                                            </MenuItem>
                                            <MenuItem onClick={(e) => handleDarDeBaja()}>                                            
                                                <Icon>thumb_down</Icon> 
                                                Dar de Baja
                                            </MenuItem> */}
                                            <MenuItem onClick={(e) => handleMovCta()}>                                            
                                                <Icon>account_balance_wallet</Icon> 
                                                Mov. de Cuenta
                                            </MenuItem>
                                            {/* <MenuItem onClick={(e) => handleDisciplina()}>                                            
                                                <Icon>pool</Icon> 
                                                Disciplinas
                                            </MenuItem>
                                            <MenuItem onClick={(e) => handleAdicional()}>                                            
                                                <Icon>dns</Icon> 
                                                Adicionales
                                            </MenuItem>
                                            <MenuItem onClick={(e) => handleAbono()}>                                            
                                                <Icon>attach_money</Icon> 
                                                Abono/Credito
                                            </MenuItem>
                                            <MenuItem onClick={(e) => handleGenCuo()}>                                            
                                                <Icon>settings</Icon> 
                                                Gen. Cuota Indiv.
                                            </MenuItem>
                                            <MenuItem onClick={(e) => handleCarnet()}>                                            
                                                <Icon>portrait</Icon> 
                                                Imprimir Carnet
                                            </MenuItem>
                                            <MenuItem onClick={(e) => handleImpCuoInd()}>                                            
                                                <Icon>print</Icon> 
                                                Imprimir Cuo.Indiv.
                                            </MenuItem>
                                            <MenuItem onClick={(e) => handleReAsociar()}>                                            
                                                <Icon>low_priority</Icon> 
                                                Reasociar
                                            </MenuItem> */}
                                    </Menu>
                                </TableCell>                                
                            </TableRow>
                        ))}
                </TableBody>
                </Suspense>
            </StyledTable>
            <ThemeProvider theme={tema}>
                <TablePagination 
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={listaDesocios.sociosmutual.length}
                    rowsPerPage={rowsPerPage}                   
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Pagina Anterior',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Pagina Siguiente',
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    components={{
                        Toolbar: GridToolbar,
                      }}
                />
            </ThemeProvider>            
        </Box>
    )
}
export default PaginationTableSocioMutual
