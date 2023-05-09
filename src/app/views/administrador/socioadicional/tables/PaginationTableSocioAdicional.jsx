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
  Fab
} from '@mui/material';

import Loading from '../../MatxLoading';
import { esES } from '@mui/material/locale';
import React, { useEffect, useState, Suspense } from 'react';
import { Box, styled } from '@mui/system';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
//import { get_ALL_SOCIOADICIONAL, deleteSOCIOADICIONAL, dardebajaSOCIOADICIONAL, startSOCIOADICIONAL } from '../../../../redux/actions/SocioAdicionalActions'
import {
  fetchSocioAdicionales,
  deleteSocioAdicional,
  dardebajaSocioAdicional
} from 'app/store/reducers/socioadicionalesSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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

const PaginationTableSocioAdicional = () => {
  const location = useLocation();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [idSocAdi, setidSocAdi] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [identificador, setIdentificador] = useState(location.state.identificador);

  const listOfSocAdi = useSelector((state) => state.socioadicionales.socioadicionales);
  //const listaDeadicionales = useSelector(state => state.adicionales);

  useEffect(() => {
    //dispatch(get_ALL_SOCIOADICIONAL(location.state.identificador));
    dispatch(fetchSocioAdicionales({ socid: location.state.identificador }));
    setIdentificador(location.state.identificador);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = () => {
    //dispatch(startSOCIOADICIONAL());
    navigate('/socioadicional/i', {
      state: {
        identificador
      }
    });
  };

  const handleActionClick = (id, event) => {
    setidSocAdi(id);
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  /* let errores = useSelector((state) => state.sociosadicionales.message);
  useEffect(() => {
    if (errores) {
      if (errores === 'Existen Registros Relacionados') {
        MySwal.fire({
          position: 'center',
          icon: 'error',
          //title: errores,
          title: 'Existen Cuotas Relacionadas',
          showConfirmButton: false,
          timer: 1500
        });
      }
      if (errores === 'Ya fue Dado de Baja') {
        MySwal.fire({
          position: 'center',
          icon: 'error',
          title: errores,
          showConfirmButton: false,
          timer: 1500
        });
      }
      if (errores === 'success') {
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Eliminado',
          showConfirmButton: false,
          timer: 1500
        });
      }
      if (errores === 'Baja') {
        MySwal.fire({
          position: 'center',
          icon: 'success',
          title: 'Baja Registrada',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  }, [errores]); */

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
        //dispatch(startSOCIOADICIONAL());
        //dispatch(deleteSOCIOADICIONAL(idSocAdi, identificador));
        dispatch(deleteSocioAdicional({ id: idSocAdi }));
      }
    });
  }

  function handleDarDeBaja() {
    handleClose();
    MySwal.fire({
      position: 'center',
      title: 'Seguro de Dar de Baja este Registro?',
      text: 'No se podra Revertir!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        //dispatch(startSOCIOADICIONAL());
        dispatch(dardebajaSocioAdicional({ id: idSocAdi }));
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

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Adicional</TableCell>
            <TableCell>Fecha Alta</TableCell>
            <TableCell>Fecha Baja</TableCell>
            <TableCell>
              <Fab color="primary" size="small" aria-label="Add" onClick={(e) => handleAdd()}>
                <Icon>add</Icon>
              </Fab>
            </TableCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<Loading />}>
          <TableBody>
            {listOfSocAdi &&
              listOfSocAdi
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sociodisciplina) => (
                  <TableRow key={sociodisciplina.id}>
                    <TableCell align="left">{sociodisciplina.Adicionale.adidsc}</TableCell>
                    <TableCell align="left">{sociodisciplina.socadifecalt}</TableCell>
                    <TableCell align="left">{sociodisciplina.socadifecbaj}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        aria-owns={open ? 'long-menu' : undefined}
                        onClick={(e) => handleActionClick(sociodisciplina.id, e)}
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
                        <MenuItem onClick={(e) => handleDelete()}>
                          <Icon>delete</Icon>
                          Eliminar
                        </MenuItem>
                        <MenuItem onClick={(e) => handleDarDeBaja()}>
                          <Icon>thumb_down</Icon>
                          Dar de Baja
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
          count={listOfSocAdi.length}
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
export default PaginationTableSocioAdicional;
