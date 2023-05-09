import '@mui/material';
import {
  DataGrid,
  esES,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdicionalSociosInscriptosSlice } from 'app/store/reducers/adicionalSociosInscriptosSlice';

const columns = [
  { field: 'socnro', headerName: 'Socio' },
  { field: 'socapenom', headerName: 'Apellido, Nombre', width: 300 },
  { field: 'socnrodni', headerName: 'DNI', width: 120 },
  { field: 'socadifecalt', headerName: 'Fecha Inscripcion', width: 120 },
  { field: 'socadifecbaj', headerName: 'Fecha Baja', width: 120 }
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />

      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const PaginationTableAdicionalsSociosInscriptos = () => {
  const location = useLocation();
  const [tableData, setTableData] = useState([]);
  let dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(25);
  const listaDeadicionales = useSelector(
    (state) => state.adicionalSociosinscriptos.adicionalSociosInscriptos
  );

  useEffect(() => {
    dispatch(fetchAdicionalSociosInscriptosSlice({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listaDeadicionales) {
      const data = listaDeadicionales.map((item) => {
        return {
          ...item,
          socnro: item.Socio.socnro,
          socapenom: item.Socio.socape + ', ' + item.Socio.socnom,
          socnrodni: item.Socio.socnrodni
        };
      });
      setTableData(data);
    }
  }, [listaDeadicionales]);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25]}
        checkboxSelection={false}
        disableSelectionOnClick
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        density="compact"
        components={{ Toolbar: CustomToolbar }}
      />
    </div>
  );
};
export default PaginationTableAdicionalsSociosInscriptos;
