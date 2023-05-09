import { DataGrid, esES, GridToolbarContainer,
    /* GridToolbarColumnsButton, */
    GridToolbarFilterButton,
    GridToolbarExport,
    /* GridToolbarDensitySelector */ } from '@mui/x-data-grid'
//import { DataGridPro } from '@mui/x-data-grid-pro';
//import Loading from '../../MatxLoading'
import React,{useEffect, useState  }  from 'react'
//import React,{useEffect, useState, Suspense  }  from 'react'
//import { useNavigate, useLocation } from 'react-router-dom'
//import { useLocation } from 'react-router-dom'
//import Swal from 'sweetalert2'
import {useDispatch, useSelector} from 'react-redux'
import { get_ALL_SOCIOSACTIVOS } from '../../../../redux/actions/SocioActions'

const columns = [
{ field: 'socnro', headerName: 'Socio' },
{ field: 'socapenom', headerName: 'Apellido, Nombre', width: 300 },
{ field: 'socnrodni', headerName: 'DNI', width: 120 },
{ field: 'catdsc', headerName: 'Categoria', width: 120 },

]

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

const PaginationTableSociosActivos = () => {
    
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
    const listaOfSociosMorosos = useSelector(state => state.socios);

    useEffect(() => { 
        dispatch(get_ALL_SOCIOSACTIVOS()) ; 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 

    useEffect(() => {                
        if(listaOfSociosMorosos.activos) {            
                const data = listaOfSociosMorosos.activos.map(item => {
                return {...item, socnro: item.socnro, 
                    socapenom: item.socape + ', ' + item.socnom,
                    socnrodni: item.socnrodni,
                    catdsc:item.Categoria.catdsc,                    
                }                
              });
            
            setTableData(data) 
        }  
    }, [listaOfSociosMorosos])
  
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
            components={{ Toolbar: CustomToolbar}}            
        />
      </div>
    )
}
export default PaginationTableSociosActivos
