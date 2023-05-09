import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchFichaInscripciones = createAsyncThunk('fichainscripcion/fetchFichaInscripciones', async () => {
    const response = await axios.get(Connection + '/fichainscripcion/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOffichainscripcion;
});

//GET FichaInscripcion
export const fetchFichaInscripcionbyId = createAsyncThunk('fichainscripcion/fetchFichaInscripcion', async ( {id} ) => {
    const response = await axios.get(Connection + '/fichainscripcion/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data;
});

//ADD FichaInscripcion
export const addFichaInscripcion = createAsyncThunk('fichainscripcion/addFichaInscripcion', async ( fichanscripcionData ) => {    
    const response = await axios.post(Connection + '/fichainscripcion/', fichanscripcionData);            
    return response.data;
});


export const fichainscripcionSlice = createSlice({
    name: 'fichainscripcion',
    initialState: {
        fichainscripcion: [],
        filteredfichaInscripcion:[],
        status: 'idle',
        error: null,
        filter: '',
        /* tipsocId: null,
        fichanscripcionUnique: [], */
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredfichaInscripcion = state.fichainscripcion.filter(fichanscripcion => fichanscripcion.tipsocdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchFichaInscripciones.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFichaInscripciones.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.fichainscripcion = action.payload;
                state.filteredfichaInscripcion = action.payload;
            })
            .addCase(fetchFichaInscripciones.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addFichaInscripcion.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addFichaInscripcion.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //state.fichainscripcion = action.payload;                                
            })
            .addCase(addFichaInscripcion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

           /*  //UPDATE
            .addCase(updateFichaInscripcion.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateFichaInscripcion.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.fichainscripcion = action.payload;
                
            })
            .addCase(updateFichaInscripcion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            }) */

            /* //GET
            .addCase(fetchFichaInscripcionbyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchFichaInscripcionbyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.fichanscripcionUnique = action.payload;                
                
            })
            .addCase(fetchFichaInscripcionbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            }) */
           /*  //DELETE
            .addCase(deleteFichaInscripcion.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteFichaInscripcion.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.fichaInscripcion = state.fichaInscripcion.filter((fichanscripcion) => fichanscripcion.id !== action.payload);                
                state.fichainscripcion = state.fichainscripcion.filter((fichanscripcion) => fichanscripcion.id !== action.payload);                                          
            })
            .addCase(deleteFichaInscripcion.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            }) */
            ;
                      
    }
});

//export const { lista } = fichainscripcionSlice.actions;
export const { setFilter } = fichainscripcionSlice.actions;

export default fichainscripcionSlice.reducer;