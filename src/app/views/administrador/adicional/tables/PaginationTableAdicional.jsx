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
  Grid
} from '@mui/material';
import Loading from '../../MatxLoading';
import { esES } from '@mui/material/locale';
import React, { useEffect, useState, Suspense } from 'react';
import { Box, styled, useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdicional,
  deleteAdicional,
  setFilter
} from '../../../../store/reducers/adicionalesSlice';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@mui/material/InputAdornment';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const ITEM_HEIGHT = 48;

const MySwal = withReactContent(Swal);

const Small = styled('small')(({ bgcolor }) => ({
  height: 15,
  width: 50,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)'
}));

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

const PaginationTableAdicional = () => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [identificador, setidentificador] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const { palette } = useTheme();
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const [searched, setSearched] = useState('');

  let dispatch = useDispatch();
  const listaDeAdicionales = useSelector((state) => state.adicionales.filteredAdicionales);

  useEffect(() => {
    dispatch(fetchAdicional());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleAdd = () => {
    navigate('/adicional/i');
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
    navigate('/adicional/u', {
      state: {
        identificador
      }
    });
  }

  function handleSociosAdicionales() {
    handleClose();
    navigate('/adicionalsociosinscriptos', {
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
        dispatch(deleteAdicional({ id: identificador }));
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
      dispatch(setFilter(searched));
    }
  };

  const handleSearchChange = (event) => {
    setSearched(event.target.value);
  };

  useEffect(() => {
    dispatch(setFilter(searched));
  }, [searched, dispatch]);

  return (
    <Box width="100%" overflow="auto">
      <ValidatorForm onSubmit={handleSearchSubmit} onError={() => null}>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
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
      </ValidatorForm>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Descripcion</TableCell>
            <TableCell>Importe</TableCell>
            <TableCell>Excento</TableCell>
            <TableCell>
              <Fab color="primary" size="small" aria-label="Add" onClick={(e) => handleAdd(e)}>
                <Icon>add</Icon>
              </Fab>
            </TableCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<Loading />}>
          <TableBody>
            {listaDeAdicionales &&
              listaDeAdicionales
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((adicional) => (
                  <TableRow key={adicional.id}>
                    <TableCell align="left">{adicional.adidsc}</TableCell>
                    <TableCell align="left">{adicional.adiimp}</TableCell>
                    <TableCell>
                      {adicional.adiexe === 1 ? (
                        <Small bgcolor={bgPrimary}>SI</Small>
                      ) : (
                        <Small bgcolor={bgSecondary}>NO</Small>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        aria-owns={open ? 'long-menu' : undefined}
                        onClick={(e) => handleActionClick(adicional.id, e)}
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
                        <MenuItem onClick={(e) => handleSociosAdicionales()}>
                          <Icon>group</Icon>
                          Socios Ins.
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
          count={listaDeAdicionales.length}
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
export default PaginationTableAdicional;
