import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchTipoSocios = createAsyncThunk('tiposocios/fetchTipoSocios', async () => {
    const response = await axios.get(Connection + '/tiposocio/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOftiposocio;
});

//GET TipoSocio
export const fetchTipoSociobyId = createAsyncThunk('tiposocios/fetchTipoSocio', async ( {id} ) => {
    const response = await axios.get(Connection + '/tiposocio/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.tiposocio[0];
});

//ADD TipoSocio
export const addTipoSocio = createAsyncThunk('tiposocios/addTipoSocio', async ( tiposocioData ) => {    
    const response = await axios.post(Connection + '/tiposocio/', tiposocioData);            
    return response.data;
});

//UPDATE TipoSocio
export const updateTipoSocio = createAsyncThunk('tiposocios/updateTipoSocio', async ({ id, tiposocio}) => {    
    const response = await axios.put(Connection + '/tiposocio/' + id, tiposocio);    
    return response.data;
});

//DELETE
export const deleteTipoSocio = createAsyncThunk('tiposocios/deleteTipoSocio', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/tiposocio/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

export const tiposociosSlice = createSlice({
    name: 'tiposocios',
    initialState: {
        tiposocios: [],
        filteredTiposocios:[],
        status: 'idle',
        error: null,
        filter: '',
        tipsocId: null,
        tiposocioUnique: [],
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredTiposocios = state.tiposocios.filter(tiposocio => tiposocio.tipsocdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchTipoSocios.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTipoSocios.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tiposocios = action.payload;
                state.filteredTiposocios = action.payload;
            })
            .addCase(fetchTipoSocios.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addTipoSocio.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addTipoSocio.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tiposocios = action.payload;                                
            })
            .addCase(addTipoSocio.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateTipoSocio.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateTipoSocio.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tiposocios = action.payload;
                
            })
            .addCase(updateTipoSocio.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchTipoSociobyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchTipoSociobyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.tiposocioUnique = action.payload;                
                
            })
            .addCase(fetchTipoSociobyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deleteTipoSocio.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteTipoSocio.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.filteredTiposocios = state.filteredTiposocios.filter((tiposocio) => tiposocio.id !== action.payload);                
                state.tiposocios = state.tiposocios.filter((tiposocio) => tiposocio.id !== action.payload);                                          
            })
            .addCase(deleteTipoSocio.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            });
                      
    }
});

//export const { lista } = tiposociosSlice.actions;
export const { setFilter } = tiposociosSlice.actions;

export default tiposociosSlice.reducer;