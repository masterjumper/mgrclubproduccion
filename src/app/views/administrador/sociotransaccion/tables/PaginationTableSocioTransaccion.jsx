import { Table, TableHead, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';

import Loading from '../../MatxLoading';
import { esES } from '@mui/material/locale';
import React, { useEffect, Suspense } from 'react';
import { Box, styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
//import { get_ALL_SOCIOTRANSACCION} from '../../../../redux/actions/SocioTransaccionActions'
import { fetchSocioTransaccion } from 'app/store/reducers/sociotransaccionSlice';

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

const PaginationTableSocioTransaccion = () => {
  const location = useLocation();
  let dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  //const [identificador, setidentificador] = useState(location.state.identificador);

  const listOfSocTra = useSelector((state) => state.sociotransaccion.sociotransaccion);

  useEffect(() => {
    dispatch(fetchSocioTransaccion({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <TableCell>Fecha</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Debe</TableCell>
            <TableCell>Haber</TableCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<Loading />}>
          <TableBody>
            {listOfSocTra &&
              listOfSocTra
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((trasoc) => (
                  <TableRow key={trasoc.id}>
                    <TableCell align="left">{trasoc.trafec}</TableCell>
                    <TableCell align="left">{trasoc.traobs}</TableCell>
                    <TableCell align="left">
                      {trasoc.tratipmov === 1 ? trasoc.traimp : ''}
                    </TableCell>
                    <TableCell align="left">
                      {trasoc.tratipmov === 2 ? trasoc.traimp : ''}
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
          count={listOfSocTra.length}
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
export default PaginationTableSocioTransaccion;
