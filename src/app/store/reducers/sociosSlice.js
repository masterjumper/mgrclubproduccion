import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchSocios = createAsyncThunk('Socios/fetchSocios', async () => {
    const response = await axios.get(Connection + '/socio/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOfsocio;
});

//GET Socio
export const fetchSociobyId = createAsyncThunk('Socios/fetchSocio', async ( {id} ) => {
    const response = await axios.get(Connection + '/socio/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.socio[0];
});

//ADD Socio
export const addSocio = createAsyncThunk('Socios/addSocio', async ( socioData ) => {    
    const response = await axios.post(Connection + '/socio/', socioData);            
    return response.data;
});

//UPDATE Socio
export const updateSocio = createAsyncThunk('Socios/updateSocio', async ({ id, socio}) => {    
    const response = await axios.put(Connection + '/socio/' + id, socio);    
    return response.data;
});

//DELETE
export const deleteSocio = createAsyncThunk('Socios/deleteSocio', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/socio/' + id);    
    return id
    } catch (error) {        
        return error.response.data;
      }
  });

//PUT BAJA Socio
export const dardebajaSociobyId = createAsyncThunk('Socios/dardebajaSociobyId', async ( {id} ) => {
    const response = await axios.put(Connection + '/socio/baja/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data;
});
  
//GET SocioCategoria
export const fetchSocioCategoriabyId = createAsyncThunk('Socios/fetchSocioCategoria', async ( {id} ) => {
    const response = await axios.get(Connection + '/socio/categoria/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.sociocategoria;
});

//PUT Reasociar Socio
export const reasociarSociobyId = createAsyncThunk('Socios/reasociarSocio', async ( {id} ) => {
    const response = await axios.put(Connection + '/socio/reasociar/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data;
});

//POST Generar Cuota Individual Socio
export const gencuoindSociobyId = createAsyncThunk('Socios/gencuoindSociobyId', async ( datos ) => {    
    
    const response = await axios.post(Connection + '/socio/gencuosocio/', datos);    
    return response.data;
});

export const SociosSlice = createSlice({
    name: 'Socios',
    initialState: {
        socios: [],
        filteredSocios:[],
        status: 'idle',
        error: null,
        filter: '',
        tipsocId: null,
        socioUnique: [],
        sociocategoria:[],
        message:'',
        filterBy: '3',
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredSocios = state.socios.filter(socio => 
                socio.SocNom.toLowerCase().includes(action.payload.toLowerCase()) || 
                socio.SocApe.toLowerCase().includes(action.payload.toLowerCase()) || 
                socio.SocNro.toLowerCase().includes(action.payload.toLowerCase()) 
            );    
        },
        setFilterBy: (state, action) => {
            state.filterBy = action.payload;            
            state.filteredSocios = state.socios.filter(socio =>
                (socio.SocNom.toLowerCase().includes(state.filter.toLowerCase())||
                socio.SocApe.toLowerCase().includes(state.filter.toLowerCase())||
                socio.SocNro.toLowerCase().includes(state.filter.toLowerCase()) )
                &&
                (state.filterBy === 1 ? socio.SocFecBaj === '1000-01-01' :
                state.filterBy === 2 ?socio.SocFecBaj > '1000-01-01' :
                state.filterBy === 3 ? socio.SocFecBaj >= '1000-01-01' : "")
            );
        },   
        setMessage:(state, action) =>{
            //console.log('action.payload' , action.payload)
            state.message = action.payload;
        }       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchSocios.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSocios.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.socios = action.payload;
                state.filteredSocios = action.payload;
            })
            .addCase(fetchSocios.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addSocio.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addSocio.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.socios = action.payload;
                state.message = action.payload;                                
            })
            .addCase(addSocio.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateSocio.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateSocio.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.socios = action.payload;
                //state.message = action.error.message;
                
            })
            .addCase(updateSocio.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchSociobyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchSociobyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.socioUnique = action.payload;                
                
            })
            .addCase(fetchSociobyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deleteSocio.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteSocio.fulfilled, (state, action) => {
                state.status = 'succeeded';                 
                state.message = 'success_delete';
                state.filteredSocios = state.filteredSocios.filter((socio) => socio.id !== action.payload);                
                state.socios = state.socios.filter((socio) => socio.id !== action.payload);                                          
            })
            .addCase(deleteSocio.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            })
            //PUT DAR DE BAJA SOCIO
            .addCase(dardebajaSociobyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;                
            })
            .addCase(dardebajaSociobyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.message = action.payload;
                //state.filteredSocios = state.filteredSocios.filter((socio) => socio.id !== action.payload);                
                //state.socios = state.socios.filter((socio) => socio.id !== action.payload);                
                
            })
            .addCase(dardebajaSociobyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //GET SOCIO CATEGORIA
            .addCase(fetchSocioCategoriabyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchSocioCategoriabyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.sociocategoria = action.payload;                
                
            })
            .addCase(fetchSocioCategoriabyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //PUT REASOCIAR SOCIO
            .addCase(reasociarSociobyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;                
            })
            .addCase(reasociarSociobyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.message = action.payload;                
                //state.sociocategoria = action.payload;                
                
            })
            .addCase(reasociarSociobyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //POST GENERAR CUOTA INDIVIDUAL SOCIO
            .addCase(gencuoindSociobyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;                
            })
            .addCase(gencuoindSociobyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.message = action.payload;                
                
            })
            .addCase(gencuoindSociobyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                state.message = action.error.message;
            })
            ;
                      
    }
});

//export const { lista } = SociosSlice.actions;
export const { setFilter, setMessage, setFilterBy } = SociosSlice.actions;

export default SociosSlice.reducer;