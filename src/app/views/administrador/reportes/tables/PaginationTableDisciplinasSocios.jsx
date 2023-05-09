import {
  DataGrid,
  esES,
  GridToolbarContainer,
  /* GridToolbarColumnsButton, */
  GridToolbarFilterButton,
  GridToolbarExport
} from /* GridToolbarDensitySelector */ '@mui/x-data-grid';
import { fetchSocioDisciplinas } from 'app/store/reducers/sociodisciplinasSlice';
//import { DataGridPro } from '@mui/x-data-grid-pro';
//import Loading from '../../MatxLoading'
import React, { useEffect, useState } from 'react';
//import React,{useEffect, useState, Suspense  }  from 'react'
//import { useNavigate, useLocation } from 'react-router-dom'
//import { useLocation } from 'react-router-dom'
//import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
//import { get_ALL_DISCIPLINASOCIOS } from '../../../../redux/actions/DisciplinaSociosInscriptosActions'

const columns = [
  { field: 'disdsc', headerName: 'Disciplina', width: 120 },
  { field: 'socnro', headerName: 'Socio' },
  { field: 'socapenom', headerName: 'Apellido, Nombre', width: 300 },
  { field: 'socnrodni', headerName: 'DNI', width: 120 }
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      {/* <GridToolbarColumnsButton /> */}
      <GridToolbarFilterButton />
      {/*<GridToolbarDensitySelector /> */}
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const PaginationTableDisciplinasSocios = () => {
  //let navigate    = useNavigate();
  //const location  = useLocation();
  /*
    const [anchorEl, setAnchorEl] = React.useState(null);
     const open = Boolean(anchorEl);
    const [identificador, setidentificador] = useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0); */

  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(25);

  let dispatch = useDispatch();
  const listaOfDisciplinaSocios = useSelector((state) => state.disciplinaSociosInscriptos);

  useEffect(() => {
    //dispatch(get_ALL_DISCIPLINASOCIOS()) ;
    dispatch(fetchSocioDisciplinas());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listaOfDisciplinaSocios) {
      const data = listaOfDisciplinaSocios.map((item) => {
        return {
          ...item,
          socnro: item.Socio.socnro,
          socapenom: item.Socio.socape + ', ' + item.Socio.socnom,
          socnrodni: item.Socio.socnrodni,
          disdsc: item.Disciplina.disdsc
        };
      });

      setTableData(data);
    }
  }, [listaOfDisciplinaSocios]);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.socnro}
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
export default PaginationTableDisciplinasSocios;
