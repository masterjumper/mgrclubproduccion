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
  Select
} from '@mui/material';
import Loading from '../../MatxLoading';
import { esES } from '@mui/material/locale';
import React, { useEffect, useState, Suspense } from 'react';
import { Box, styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { get_ALL_LOCALIDADES, deleteLOCALIDAD, startLOCALIDAD, get_FILTRADO_LOCALIDADES, get_SIN_FILTRADO_LOCALIDADES} from '../../../../redux/actions/LocalidadActions'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@mui/material/InputAdornment';
import {
  deleteLocalidad,
  fetchLocalidades,
  setFilter,
  setFilterBy
} from 'app/store/reducers/localidadesSlice';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const ITEM_HEIGHT = 48;

const MySwal = withReactContent(Swal);

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& small': {
    height: 15,
    width: 50,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)'
  },
  '& thead': {
    '& tr': {
      '& th': {
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  },
  '& tbody': {
    '& tr': {
      '& td': {
        paddingLeft: 0,
        textTransform: 'capitalize'
      }
    }
  }
}));

const tema = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' }
    }
  },
  esES
);

const Formcontrol = styled(FormControl)(() => ({
  /* width: 300, */
  width: '100%',
  marginBottom: '16px'
}));

const PaginationTableLocalidad = () => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [identificador, setidentificador] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [searched, setSearched] = useState('');
  const [columna, setColumna] = useState(1);

  let dispatch = useDispatch();
  const listOflocalidad = useSelector((state) => state.localidades.filteredLocalidad);

  useEffect(() => {
    dispatch(fetchLocalidades());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  /* let errores = useSelector((state) => state.localidades.message);
  useEffect(() => {
    if (errores) {
      if (errores === 'success') {
        setPage(0);
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Eliminado',
          showConfirmButton: false,
          timer: 1500
        });
      }
      if (errores === 'Existen Registros Relacionados') {
        MySwal.fire({
          position: 'center',
          icon: 'error',
          title: errores,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  }, [errores]); */

  const handleAdd = () => {
    //dispatch(startLOCALIDAD());
    navigate('/localidad/i');
  };

  const handleActionClick = (id, event) => {
    setidentificador(id);
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleUpdate() {
    //dispatch(startLOCALIDAD());
    handleClose();
    navigate('/localidad/u', {
      state: {
        identificador
      }
    });
  }

  function handleDelete() {
    handleClose();
    MySwal.fire({
      position: 'center',
      title: 'Seguro de Eliminar este Registro?',
      text: 'No se podra Revertir!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        //dispatch(startLOCALIDAD());
        //dispatch(deleteLOCALIDAD(identificador));
        dispatch(deleteLocalidad({ id: identificador }));
      }
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searched) {
      //dispatch(get_FILTRADO_LOCALIDADES(searched));
      dispatch(setFilter(searched));
    }
  };

  const handleSearchChange = (event) => {
    if (event.target.value.length > 0) {
    } else {
      //dispatch(get_SIN_FILTRADO_LOCALIDADES());
    }
    setSearched(event.target.value);
  };

  /* useEffect(() => {
    //dispatch(get_FILTRADO_LOCALIDADES(searched, columna));
  }, [searched, columna, dispatch]); */

  const handleChangeColumna = (event) => {
    setColumna(event.target.value);
    //if (event.target.value.length > 0) {
    //dispatch(get_SIN_FILTRADO_LOCALIDADES());
    dispatch(setFilterBy(event.target.value));
    //}
  };

  useEffect(() => {
    dispatch(setFilter(searched));
    dispatch(setFilterBy(columna));
  }, [searched, columna, dispatch]);

  return (
    <Box width="100%" overflow="auto">
      <ValidatorForm onSubmit={handleSearchSubmit} onError={() => null}>
        <Grid container spacing={1}>
          <Grid item lg={3} md={3} sm={6} xs={6} sx={{ mt: 1 }}>
            <Formcontrol fullWidth>
              <InputLabel id="demo-simple-select-label">Filtrar Por</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="Columna"
                value={columna}
                label="Filtrar Por"
                displayEmpty
                onChange={handleChangeColumna}
              >
                <MenuItem key={1} value={1}>
                  Localidad
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Provincia
                </MenuItem>
                <MenuItem key={3} value={3}>
                  Cod. Postal
                </MenuItem>
              </Select>
            </Formcontrol>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField
              type="text"
              name="buscar"
              id="standard-basic"
              onChange={handleSearchChange}
              value={searched || ''}
              label="Buscar Aqui..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleSearchSubmit}>
                    <Icon>search</Icon>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </ValidatorForm>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Codigo Postal</TableCell>
            <TableCell>Localidad</TableCell>
            <TableCell>Provincia</TableCell>
            <TableCell>
              <Fab color="primary" size="small" aria-label="Add" onClick={(e) => handleAdd(e)}>
                <Icon>add</Icon>
              </Fab>
            </TableCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<Loading />}>
          <TableBody>
            {listOflocalidad &&
              listOflocalidad
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((localidad, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{localidad.loccodpos}</TableCell>
                    <TableCell align="left">{localidad.locdsc}</TableCell>
                    <TableCell align="left">{localidad.Provincia.prvdsc}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        aria-owns={open ? 'long-menu' : undefined}
                        onClick={(e) => handleActionClick(localidad.id, e)}
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
                            width: 200
                          }
                        }}
                      >
                        <MenuItem onClick={() => handleUpdate()}>
                          <Icon>edit</Icon>
                          Editar
                        </MenuItem>
                        <MenuItem onClick={(e) => handleDelete()}>
                          <Icon>delete</Icon>
                          Eliminar
                        </MenuItem>
                      </Menu>
                    </TableCell>
                    <TableCell></TableCell>
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
          count={listOflocalidad.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Pagina Anterior'
          }}
          nextIconButtonProps={{
            'aria-label': 'Pagina Siguiente'
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </Box>
  );
};
export default PaginationTableLocalidad;
