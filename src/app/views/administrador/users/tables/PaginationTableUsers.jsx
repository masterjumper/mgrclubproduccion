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
  Badge,
  Avatar,
  Tooltip
} from '@mui/material';
import Loading from '../../MatxLoading';
import { esES } from '@mui/material/locale';
import React, { useEffect, useState, Suspense } from 'react';
import { Box, styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
//import { get_ALL_USERS, deleteUSER, startUSER, get_FILTRADO_USERS, get_SIN_FILTRADO_USERS } from '../../../../redux/actions/UsersActions'
import { fetchUsers, deleteUser, setFilter } from 'app/store/reducers/usersSlice';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@mui/material/InputAdornment';
//import { styled } from '@mui/material/styles';

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

const PaginationTableUsers = () => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [identificador, setIdentificador] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [searched, setSearched] = useState('');

  const listOfUsers = useSelector((state) => state.users.filteredUsers);

  let dispatch = useDispatch();
  useEffect(() => {
    //dispatch(get_ALL_USERS()) ;
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleAdd = () => {
    //dispatch(startUSER())
    navigate('/appusers/i');
  };

  const handleActionClick = (id, event) => {
    setIdentificador(id);
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleUpdate() {
    //dispatch(startUSER())
    handleClose();
    navigate('/appusers/u', {
      state: {
        identificador
      }
    });
  }

  const handleUpdateassword = (id, event) => {
    //dispatch(startUSER())
    setIdentificador(event.target.value);
    //handleClose()
    navigate('/appusers/up', {
      state: {
        identificador: id
      }
    });
  };

  /* let errores = useSelector(state => state.users.message);    
    useEffect(() => {                                 
        if(errores){            
            if(errores === 'success'){ 
                setPage(0)                                             
                MySwal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Your file has been deleted',
                    showConfirmButton: false,
                    timer: 1500                       
                }); 
            }    
        }        
    },[errores]); */

  function handleDelete(id, usrname) {
    handleClose();
    MySwal.fire({
      position: 'center',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'YES'
    }).then((result) => {
      if (result.isConfirmed) {
        //dispatch(startUSER())
        //dispatch(deleteUSER(id, {username:usrname}))
        dispatch(deleteUser({ id: id }));
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
      //dispatch(get_FILTRADO_USERS(searched))
      dispatch(setFilter(searched));
    }
  };

  const handleSearchChange = (event) => {
    if (event.target.value.length > 0) {
    } else {
      //dispatch(get_SIN_FILTRADO_USERS())
      dispatch(setFilter(searched));
    }
    setSearched(event.target.value);
  };

  useEffect(() => {
    //dispatch(get_FILTRADO_USERS(searched))
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
            <TableCell></TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>
              <Fab color="primary" size="small" aria-label="Add" onClick={(e) => handleAdd(e)}>
                <Icon>add</Icon>
              </Fab>
            </TableCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<Loading />}>
          <TableBody>
            {listOfUsers &&
              listOfUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="left">
                      {/* <IconButton color="primary" component="label">*/}
                      <Badge
                        /* color={ user.online === 1 ? ("primary" ) : ("secondary")} */
                        variant="dot"
                        sx={
                          user.online === 1
                            ? {
                                '& .MuiBadge-badge': {
                                  color: 'lightgreen',
                                  backgroundColor: 'green'
                                }
                              }
                            : {
                                '& .MuiBadge-badge': {
                                  color: 'red',
                                  backgroundColor: 'red'
                                }
                              }
                        }
                      >
                        <Avatar
                          alt={user.username}
                          src={user.avatar}
                          sx={{ width: 50, height: 50 }}
                        />
                      </Badge>
                      {/* </IconButton> */}
                    </TableCell>
                    <TableCell align="left">{user.username}</TableCell>
                    <TableCell align="left">{user.nombre}</TableCell>
                    <TableCell align="left">{user.apellido}</TableCell>
                    <TableCell align="left">{user.rol}</TableCell>
                    <TableCell align="left">
                      <Tooltip title="Password change" arrow>
                        <IconButton
                          color="primary"
                          component="label"
                          onClick={(e) => handleUpdateassword(user.id, e)}
                        >
                          <Icon>cached</Icon>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        aria-owns={open ? 'long-menu' : undefined}
                        onClick={(e) => handleActionClick(user.id, e)}
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
                          Edit
                        </MenuItem>
                        <MenuItem onClick={(e) => handleDelete(user.id, user.username)}>
                          <Icon>delete</Icon>
                          Delete
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
          count={listOfUsers.length}
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
export default PaginationTableUsers;
