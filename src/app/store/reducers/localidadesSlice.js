import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchLocalidades = createAsyncThunk('localidades/fetchLocalidades', async () => {
    const response = await axios.get(Connection + '/localidad/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOflocalidad;
});

//GET Provincia
export const fetchLocalidadesbyId = createAsyncThunk('localidades/fetchLocalidad', async ( {id} ) => {
    const response = await axios.get(Connection + '/localidad/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.localidad[0];
});

//ADD Provincia
export const addLocalidad = createAsyncThunk('localidades/addLocalidad', async ( localidadData ) => {    
    const response = await axios.post(Connection + '/localidad/', localidadData);            
    return response.data;
});

//UPDATE Provincia
export const updateLocalidad = createAsyncThunk('localidades/updateLocalidad', async ({ id, localidad}) => {    
    const response = await axios.put(Connection + '/localidad/' + id, localidad);    
    return response.data;
});

//DELETE
export const deleteLocalidad = createAsyncThunk('localidades/deleteLocalidad', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/localidad/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

export const localidadesSlice = createSlice({
    name: 'localidades',
    initialState: {
        localidades: [],
        filteredLocalidad:[],
        status: 'idle',
        error: null,
        filter: '',
        filterBy: '1',
        locId: null,
        localidadUnique: [],
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredLocalidad = state.localidades.filter(localidad => localidad.locdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        }, 
        setFilterBy: (state, action) => {
            state.filterBy = action.payload;            
            state.filteredLocalidad = state.localidades.filter(localidad => 
                state.filterBy === 1 ? localidad.locdsc.toLowerCase().includes(state.filter.toLowerCase()) :
                state.filterBy === 2 ? localidad.Provincia.prvdsc.toLowerCase().includes(state.filter.toLowerCase()) :
                state.filterBy === 3 ? localidad.loccodpos.toLowerCase().includes(state.filter.toLowerCase()) : ""  );            
        },    
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchLocalidades.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLocalidades.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.localidades = action.payload;
                state.filteredLocalidad = action.payload;
            })
            .addCase(fetchLocalidades.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addLocalidad.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addLocalidad.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.localidades = action.payload;                                
            })
            .addCase(addLocalidad.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateLocalidad.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateLocalidad.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.localidades = action.payload;
                
            })
            .addCase(updateLocalidad.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchLocalidadesbyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchLocalidadesbyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.localidadUnique = action.payload;                
                
            })
            .addCase(fetchLocalidadesbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deleteLocalidad.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteLocalidad.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.filteredLocalidad = state.filteredLocalidad.filter((localidad) => localidad.id !== action.payload);                
                state.localidades = state.localidades.filter((localidad) => localidad.id !== action.payload);                                          
            })
            .addCase(deleteLocalidad.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            });
                      
    }
});

//export const { lista } = localidadesSlice.actions;
export const { setFilter, setFilterBy } = localidadesSlice.actions;

export default localidadesSlice.reducer;