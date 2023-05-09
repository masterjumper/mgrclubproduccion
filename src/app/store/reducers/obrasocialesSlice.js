import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchObraSociales = createAsyncThunk('obrasociales/fetchObraSociales', async () => {
    const response = await axios.get(Connection + '/obrasocial/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOfobrasocial;
});

//GET TipoSocio
export const fetchObraSocialbyId = createAsyncThunk('obrasociales/fetchObraSocial', async ( {id} ) => {
    const response = await axios.get(Connection + '/obrasocial/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.obrasocial[0];
});

//ADD TipoSocio
export const addObraSocial = createAsyncThunk('obrasociales/addObraSocial', async ( obrasocialData ) => {    
    const response = await axios.post(Connection + '/obrasocial/', obrasocialData);            
    return response.data;
});

//UPDATE TipoSocio
export const updateObraSocial = createAsyncThunk('obrasociales/updateObraSocial', async ({ id, obrasocial}) => {    
    const response = await axios.put(Connection + '/obrasocial/' + id, obrasocial);    
    return response.data;
});

//DELETE
export const deleteObraSocial = createAsyncThunk('obrasociales/deleteObraSocial', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/obrasocial/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

export const obrasocialesSlice = createSlice({
    name: 'obrasociales',
    initialState: {
        obrasociales: [],
        filteredObraSociales:[],
        status: 'idle',
        error: null,
        filter: '',
        obrid: null,
        obrasocialUnique: [],
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredObraSociales = state.obrasociales.filter(obrasocial => obrasocial.obrdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchObraSociales.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchObraSociales.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.obrasociales = action.payload;
                state.filteredObraSociales = action.payload;
            })
            .addCase(fetchObraSociales.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addObraSocial.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addObraSocial.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.obrasociales = action.payload;                                
            })
            .addCase(addObraSocial.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateObraSocial.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateObraSocial.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.obrasociales = action.payload;
                
            })
            .addCase(updateObraSocial.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchObraSocialbyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchObraSocialbyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.obrasocialUnique = action.payload;                
                
            })
            .addCase(fetchObraSocialbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deleteObraSocial.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteObraSocial.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.filteredObraSociales = state.filteredObraSociales.filter((obrasocial) => obrasocial.id !== action.payload);                
                state.obrasociales = state.obrasociales.filter((obrasocial) => obrasocial.id !== action.payload);                                          
            })
            .addCase(deleteObraSocial.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            });
                      
    }
});

//export const { lista } = obrasocialesSlice.actions;
export const { setFilter } = obrasocialesSlice.actions;

export default obrasocialesSlice.reducer;