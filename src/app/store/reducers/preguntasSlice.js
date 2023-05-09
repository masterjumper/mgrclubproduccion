import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchPreguntas = createAsyncThunk('preguntas/fetchPreguntas', async () => {
    const response = await axios.get(Connection + '/pregunta/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOfpregunta;
});

//GET TipoSocio
export const fetchPreguntabyId = createAsyncThunk('preguntas/fetchPregunta', async ( {id} ) => {
    const response = await axios.get(Connection + '/pregunta/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.pregunta[0];
});

//ADD TipoSocio
export const addPregunta = createAsyncThunk('preguntas/addPregunta', async ( preguntaData ) => {    
    const response = await axios.post(Connection + '/pregunta/', preguntaData);            
    return response.data;
});

//UPDATE TipoSocio
export const updatePregunta = createAsyncThunk('preguntas/updatePregunta', async ({ id, pregunta}) => {    
    const response = await axios.put(Connection + '/pregunta/' + id, pregunta);    
    return response.data;
});

//DELETE
export const deletePregunta = createAsyncThunk('preguntas/deletePregunta', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/pregunta/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

export const preguntasSlice = createSlice({
    name: 'preguntas',
    initialState: {
        preguntas: [],
        filteredPreguntas:[],
        status: 'idle',
        error: null,
        filter: '',
        preid: null,
        preguntaUnique: [],
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredPreguntas = state.preguntas.filter(pregunta => pregunta.predsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchPreguntas.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPreguntas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.preguntas = action.payload;
                state.filteredPreguntas = action.payload;
            })
            .addCase(fetchPreguntas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addPregunta.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addPregunta.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.preguntas = action.payload;                                
            })
            .addCase(addPregunta.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updatePregunta.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updatePregunta.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.preguntas = action.payload;
                
            })
            .addCase(updatePregunta.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchPreguntabyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchPreguntabyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.preguntaUnique = action.payload;                
                
            })
            .addCase(fetchPreguntabyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deletePregunta.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deletePregunta.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.filteredPreguntas = state.filteredPreguntas.filter((pregunta) => pregunta.id !== action.payload);                
                state.preguntas = state.preguntas.filter((pregunta) => pregunta.id !== action.payload);                                          
            })
            .addCase(deletePregunta.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            });
                      
    }
});

//export const { lista } = preguntasSlice.actions;
export const { setFilter } = preguntasSlice.actions;

export default preguntasSlice.reducer;