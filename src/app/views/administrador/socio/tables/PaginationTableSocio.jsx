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

import { GridToolbar } from '@mui/x-data-grid';
import Loading from '../../MatxLoading';
import { esES } from '@mui/material/locale';
import React, { useEffect, useState, Suspense } from 'react';
import { Box, styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSocios,
  deleteSocio,
  reasociarSociobyId,
  dardebajaSociobyId,
  setMessage,
  setFilter,
  setFilterBy
} from 'app/store/reducers/sociosSlice';
import axios from 'axios';
import { Connection } from 'app/utils/Connection';
import { saveAs } from 'file-saver';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@mui/material/InputAdornment';

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

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const Formcontrol = styled(FormControl)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const PaginationTableSocio = () => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [identificador, setidentificador] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [searched, setSearched] = useState('');
  const [mostrar, setMostrar] = useState(3);

  const listaDesocios = useSelector((state) => state.socios.filteredSocios);
  const mensaje = useSelector((state) => state.socios.message.message);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSocios());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (mensaje) {
      if (mensaje === 'success_delete') {
        setPage(0);
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Eliminado',
          showConfirmButton: false,
          timer: 1500
        });
      }
      if (mensaje === 'success_baja') {
        setPage(0);
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Socio se ha dado de Baja',
          showConfirmButton: false,
          timer: 1500
        });
      }

      if (mensaje === 'success_reasociado') {
        setPage(0);
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'Socio Reasociado',
          showConfirmButton: false,
          timer: 1500
        });
      }

      if (mensaje === 'Ya fue Generada la Cuota Para el Socio') {
        MySwal.fire({
          position: 'center',
          icon: 'error',
          title: mensaje,
          showConfirmButton: true
        });
      }
      if (mensaje === 'Socio Dado de Baja') {
        MySwal.fire({
          position: 'center',
          icon: 'error',
          title: mensaje,
          showConfirmButton: true
        });
      }
      if (mensaje === 'Cuotas No Generadas para el MES actual') {
        MySwal.fire({
          position: 'center',
          icon: 'error',
          title: mensaje,
          showConfirmButton: true
        });
      }

      if (mensaje === 'Cuotas No Generadas para el MES actual') {
        MySwal.fire({
          position: 'center',
          icon: 'error',
          title: mensaje,
          showConfirmButton: true
        });
      }

      if (mensaje === 'Cuota Generada para el Socio') {
        MySwal.fire({
          position: 'center',
          title: 'Desea Imprimir la Cuota Individual?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'NO',
          confirmButtonText: 'SI'
        }).then((result) => {
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
                axios
                  .post(Connection + '/gencuota/create-pdf', { socid: identificador })
                  .then(() => {});
              }
            }).then((dismiss) => {
              if (dismiss.dismiss === 'timer') {
                axios
                  .get(Connection + '/gencuota/fetch-pdf', {
                    headers: {
                      accessToken: localStorage.getItem('accessToken')
                    },
                    responseType: 'blob',
                    refereceType: 'blob'
                  })
                  .then((res) => {
                    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                    saveAs(pdfBlob, `Cuota.pdf`);
                    MySwal.fire({
                      title: 'Archivo Generado',
                      icon: 'success',
                      timer: 3000,
                      showConfirmButton: false
                    });
                  });
              }
            });
          }
        });
      }
      dispatch(setMessage(''));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, mensaje]);

  const handleAdd = () => {
    navigate('/socio/i');
  };

  const handleActionClick = (id, event) => {
    setidentificador(id);
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleUpdate() {
    handleClose();
    navigate('/socio/u', {
      state: {
        identificador
      }
    });
  }

  function handleDisciplina() {
    handleClose();
    navigate('/sociodisciplina/', {
      state: {
        identificador
      }
    });
  }

  function handleAdicional() {
    handleClose();
    navigate('/socioadicional/', {
      state: {
        identificador
      }
    });
  }

  function handleMovCta() {
    handleClose();
    navigate('/sociotransaccion/', {
      state: {
        identificador
      }
    });
  }

  function handleAbono() {
    handleClose();
    navigate('/socioabono/', {
      state: {
        identificador
      }
    });
  }

  function handleGenCuo() {
    handleClose();
    navigate('/sociocuotagenerarindividual/', {
      state: {
        identificador
      }
    });
  }

  function handleCarnet() {
    handleClose();
    navigate('/sociocarnet/', {
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
        dispatch(deleteSocio({ id: identificador }));
      }
    });
  }

  function handleImpCuoInd() {
    handleClose();
    navigate('/sociocuotareimprimir/', {
      state: {
        identificador
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
      setSearched(event.target.value);
    }
  };

  const handleSearchChange = (event) => {
    setSearched(event.target.value);
  };

  const handleChangeMostrar = (event) => {
    setMostrar(event.target.value);
  };

  function handleReAsociar() {
    handleClose();
    MySwal.fire({
      position: 'center',
      title: 'Seguro de Reasociar este Socio?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(reasociarSociobyId({ id: identificador }));
        setPage(0);
      }
    });
  }

  function handleDarDeBaja() {
    handleClose();
    MySwal.fire({
      position: 'center',
      title: 'Seguro de Dar de Baja este Socio?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(dardebajaSociobyId({ id: identificador }));
        setPage(0);
      }
    });
  }

  useEffect(() => {
    dispatch(setFilter(searched));
    dispatch(setFilterBy(mostrar));
  }, [searched, mostrar, dispatch]);

  return (
    <Box width="100%" overflow="auto">
      <ValidatorForm onSubmit={handleSearchSubmit} onError={() => null}>
        <Grid container spacing={1}>
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
                <MenuItem key={1} value={1}>
                  Activos
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Inactivos
                </MenuItem>
                <MenuItem key={3} value={3}>
                  Todos
                </MenuItem>
              </Select>
            </Formcontrol>
          </Grid>
        </Grid>
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
            <TableCell>
              <Fab color="primary" size="small" aria-label="Add" onClick={(e) => handleAdd(e)}>
                <Icon>add</Icon>
              </Fab>
            </TableCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<Loading />}>
          <TableBody>
            {listaDesocios &&
              listaDesocios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((socio) => (
                  <TableRow key={socio.id}>
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
                        <MenuItem onClick={(e) => handleDarDeBaja()}>
                          <Icon>thumb_down</Icon>
                          Dar de Baja
                        </MenuItem>
                        <MenuItem onClick={(e) => handleMovCta()}>
                          <Icon>account_balance_wallet</Icon>
                          Mov. de Cuenta
                        </MenuItem>
                        <MenuItem onClick={(e) => handleDisciplina()}>
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
          count={listaDesocios.length}
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
          components={{
            Toolbar: GridToolbar
          }}
        />
      </ThemeProvider>
    </Box>
  );
};
export default PaginationTableSocio;
