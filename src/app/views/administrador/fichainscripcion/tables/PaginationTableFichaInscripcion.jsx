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
    Fab,
    Grid,   
    FormControl,
    InputLabel,
    Select,
} from '@mui/material'
import Loading from '../../MatxLoading'
import { esES } from '@mui/material/locale';
import React,{useEffect, useState, Suspense  }  from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createTheme,  ThemeProvider} from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux'
//import { get_ALL_FICHASINSCRIPCIONES, get_FILTRADO_FICHASINSCRIPCIONES, get_SIN_FILTRADO_FICHASINSCRIPCIONES } from '../../../../redux/actions/FichaInscripcionActions'
import { fetchFichaInscripciones } from 'app/store/reducers/fichainscripcionSlice';
import axios from 'axios';
import { saveAs } from 'file-saver';
//import {Connection} from '../../../../redux/Connection'
import { Connection } from 'app/utils/Connection';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import InputAdornment from '@mui/material/InputAdornment';

const ITEM_HEIGHT = 48

const MySwal = withReactContent(Swal)

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

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Formcontrol = styled(FormControl)(() => ({
    /* width: 300, */
    width: '100%',
    marginBottom: '16px',
})) 

const tema = createTheme(
    {
      palette: {
          primary: { main: '#1976d2' },
      },
      },          
    esES,
  );

const PaginationTableFichaInscripcion = () => {
    
    let navigate    = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [identificador, setidentificador] = useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [searched, setSearched] = useState("");
    const [columna, setColumna] = useState(1);
    
    const listaDeFichaInscripciones = useSelector(state => state.fichainscripcion.fichainscripcion);
    
    let dispatch = useDispatch();
    useEffect(() => {             
        //dispatch(get_ALL_FICHASINSCRIPCIONES()) ;            
        dispatch(fetchFichaInscripciones())
         // eslint-disable-next-line react-hooks/exhaustive-deps            
    },[dispatch]); 
     
    const handleAdd = () => {
        navigate('/fichainscripcion/i');
    }
   

    const handleActionClick = (id, event) => {
        setidentificador(id);        
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handlePrint = (event, NewPage) => {        
            handleClose()
                     
            MySwal.fire({                            
                 title:  `Desea Imprimir la Ficha de Inscripcion ?`,       
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
                         title: 'Generando Archivo',
                         showConfirmButton: false,
                         allowEscapeKey: false,
                         allowOutsideClick: false,
                         timer: 10000,
                         didOpen: () => {
                             MySwal.showLoading();                             
                             axios.post(Connection +  '/genficha/create-pdf-ficha/' + identificador)
                                 .then(() => {});                                
                         },
                     }).then(          
                         (dismiss) => {                      
                         if (dismiss.dismiss === 'timer') { 
                             axios.get(Connection + '/genficha/fetch-pdf-ficha',{ 
                                 headers: {
                                     accessToken: localStorage.getItem("accessToken"),
                                 },
                                 responseType: 'blob', 
                                 refereceType: 'blob',          
                             })
                             .then((res) => {
                                 const pdfBlob = new Blob([res.data], { type: 'application/pdf' });                                 
                                 saveAs(pdfBlob, `Ficha.pdf` );
                                 MySwal.fire({ 
                                 title: 'Archivo Generado',
                                 icon: 'success',
                                 timer: 3000,
                                 showConfirmButton: false
                                 }).then(
                                     navigate('/fichainscripcion')
                                     )
                         })
                         }        
                     })                    
                 }else{
                     navigate('/fichainscripcion');  
                 }
             })   
        
    }


    const handleSearchSubmit = (event) => {        
        event.preventDefault();        
        if(searched){
            //dispatch(get_FILTRADO_FICHASINSCRIPCIONES(searched))
        }
    }

    const handleSearchChange = (event) => {
        if(event.target.value.length > 0) {			            
		}else{            
            //dispatch(get_SIN_FILTRADO_FICHASINSCRIPCIONES())
        }
        setSearched(event.target.value)
    }

    useEffect(() => {
        //dispatch(get_FILTRADO_FICHASINSCRIPCIONES(searched, columna))
	}, [searched, columna, dispatch]);

    const handleChangeColumna = (event) => {
        if(event.target.value.length > 0) {			            
		}else{            
            //dispatch(get_SIN_FILTRADO_FICHASINSCRIPCIONES())
        }
        setColumna(event.target.value)
    }


    return (        
        <Box width="100%" overflow="auto">
            <ValidatorForm onSubmit={handleSearchSubmit} onError={() => null} > 
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
                            <MenuItem key={1} value={1}>Inscripto</MenuItem>
                            <MenuItem key={2} value={2}>Encargado</MenuItem>                                
                            <MenuItem key={3} value={3}>Nro. Ficha Ins.</MenuItem>                                
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
            </Grid> 
            </ValidatorForm> 
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Nro Ficha Ins.</TableCell>
                        <TableCell>Inscripto</TableCell>
                        <TableCell>Encargado</TableCell>
                        <TableCell>
                            <Fab color="primary" size="small" aria-label="Add" onClick={(e) => handleAdd(e)}>
                                       <Icon>add</Icon> 
                            </Fab>
                        </TableCell>                        
                    </TableRow>
                </TableHead>
                <Suspense fallback={<Loading />}>
                <TableBody>                    
                    {listaDeFichaInscripciones && listaDeFichaInscripciones
                         .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )                         
                         .map((FichaInscripcion) => ( 
                            <TableRow  key={FichaInscripcion.id} >
                                <TableCell align="left">{FichaInscripcion.FicInsFec}</TableCell>
                                <TableCell align="left">{FichaInscripcion.FicInsNro}</TableCell>
                                <TableCell align="left">{FichaInscripcion.Inscripto.InsNom}</TableCell>
                                <TableCell align="left">{FichaInscripcion.Encargado.EncNom}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        aria-owns={open ? 'long-menu' : undefined}
                                        onClick={(e) => handleActionClick(FichaInscripcion.id, e)}
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
                                            <MenuItem onClick={(e) => handlePrint()}>                                            
                                                <Icon>print</Icon> 
                                                Imprimir
                                            </MenuItem>
                                    </Menu>
                                </TableCell>
                                <TableCell>
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
                    count={listaDeFichaInscripciones.length}                    
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
                />
            </ThemeProvider>
        </Box>
        
    )
}
export default PaginationTableFichaInscripcion
