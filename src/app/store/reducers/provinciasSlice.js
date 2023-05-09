import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchProvincias = createAsyncThunk('provincias/fetchProvincias', async () => {
    const response = await axios.get(Connection + '/provincia/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOfprovincia;
});

//GET Provincia
export const fetchProvinciasbyId = createAsyncThunk('provincias/fetchProvincia', async ( {id} ) => {
    const response = await axios.get(Connection + '/provincia/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.provincia[0];
});

//ADD Provincia
export const addProvincia = createAsyncThunk('provincias/addProvincia', async ( provinciaData ) => {    
    const response = await axios.post(Connection + '/provincia/', provinciaData);            
    return response.data;
});

//UPDATE Provincia
export const updateProvincia = createAsyncThunk('provincias/updateProvincia', async ({ id, provincia}) => {    
    const response = await axios.put(Connection + '/provincia/' + id, provincia);    
    return response.data;
});

//DELETE
export const deleteProvincia = createAsyncThunk('provincias/deleteProvincia', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/provincia/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

export const provinciasSlice = createSlice({
    name: 'provincias',
    initialState: {
        provincias: [],
        filteredProvincia:[],
        status: 'idle',
        error: null,
        filter: '',
        provId: null,
        provinciaUnique: [],
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredProvincia = state.provincias.filter(provincia => provincia.prvdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchProvincias.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProvincias.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.provincias = action.payload;
                state.filteredProvincia = action.payload;
            })
            .addCase(fetchProvincias.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addProvincia.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addProvincia.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.provincias = action.payload;                                
            })
            .addCase(addProvincia.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateProvincia.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateProvincia.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.provincias = action.payload;
                
            })
            .addCase(updateProvincia.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchProvinciasbyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchProvinciasbyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.provinciaUnique = action.payload;                
                
            })
            .addCase(fetchProvinciasbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deleteProvincia.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteProvincia.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.filteredProvincia = state.filteredProvincia.filter((provincia) => provincia.id !== action.payload);                
                state.provincias = state.provincias.filter((provincia) => provincia.id !== action.payload);                                          
            })
            .addCase(deleteProvincia.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            });
                      
    }
});

//export const { lista } = provinciasSlice.actions;
export const { setFilter } = provinciasSlice.actions;

export default provinciasSlice.reducer;