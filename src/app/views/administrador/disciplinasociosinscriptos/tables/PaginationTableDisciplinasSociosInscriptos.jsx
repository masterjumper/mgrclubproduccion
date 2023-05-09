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
import { fetchDisciplinaSociosInscriptosSlice } from 'app/store/reducers/disciplinaSociosInscriptosSlice';

const columns = [
  { field: 'id', headerName: 'Linea', hide: 'true', enabled: 'false' },
  { field: 'socnro', headerName: 'Socio' },
  { field: 'socapenom', headerName: 'Apellido, Nombre', width: 300 },
  { field: 'socnrodni', headerName: 'DNI', width: 120 },
  { field: 'socdisfecalt', headerName: 'Fecha Inscripcion', width: 120 },
  { field: 'socdisfecbaj', headerName: 'Fecha Baja', width: 120 },
  { field: 'socmoroso', headerName: 'Moroso', width: 100 }
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />

      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const PaginationTableDisciplinasSociosInscriptos = () => {
  const location = useLocation();

  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  let dispatch = useDispatch();
  const listaDedisciplinas = useSelector(
    (state) => state.disciplinaSociosInscriptos.disciplinaSociosInscriptos
  );

  useEffect(() => {
    dispatch(fetchDisciplinaSociosInscriptosSlice({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listaDedisciplinas) {
      const data = listaDedisciplinas.map((item) => {
        return {
          ...item,
          socnro: item.Socio.socnro,
          socapenom: item.Socio.socape + ', ' + item.Socio.socnom,
          socnrodni: item.Socio.socnrodni,
          socmoroso: [item.Socio.socsal > 0 ? 'SI' : 'NO']
        };
      });
      setTableData(data);
    }
  }, [listaDedisciplinas]);

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
export default PaginationTableDisciplinasSociosInscriptos;
