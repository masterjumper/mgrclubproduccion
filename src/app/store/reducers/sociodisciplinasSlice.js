import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchSocioDisciplinas = createAsyncThunk('sociodisciplinas/fetchSocioDisciplinas', async ({socid}) => {
    
    const response = await axios.get(Connection + '/sociodisciplina/' + socid,{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOfsocdis;
});

//GET SocioDisciplina
export const fetchSocioDisciplinabyId = createAsyncThunk('sociodisciplinas/fetchSocioDisciplina', async ( {id} ) => {
    const response = await axios.get(Connection + '/sociodisciplina/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.sociosdisciplinas;
});

//ADD SocioDisciplina
export const addSocioDisciplina = createAsyncThunk('sociodisciplinas/addSocioDisciplina', async ( sociodisciplinaData ) => {    
    
    const response = await axios.post(Connection + '/sociodisciplina/', sociodisciplinaData);            
    return response.data;
});

//UPDATE SocioDisciplina
export const updateSocioDisciplina = createAsyncThunk('sociodisciplinas/updateSocioDisciplina', async ({ id, sociodisciplina}) => {    
    const response = await axios.put(Connection + '/sociodisciplina/' + id, sociodisciplina);    
    return response.data;
});

//DELETE
export const deleteSocioDisciplina = createAsyncThunk('sociodisciplinas/deleteSocioDisciplina', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/sociodisciplina/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

//DAR DEBAJA SocioDisciplina
export const dardebajaSocioDisciplina = createAsyncThunk('sociodisciplinas/dardebajaSocioDisciplina', async ({ id }) => {    
    const response = await axios.put(Connection + '/sociodisciplina/' + id );    
    return response.data;
});

export const sociodisciplinasSlice = createSlice({
    name: 'sociodisciplinas',
    initialState: {
        sociodisciplinas: [],
        //filteredsociodisciplinas:[],
        status: 'idle',
        error: null,
        filter: '',
        //tipsocId: null,
        sociodisciplinaUnique: [],
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            //state.filteredsociodisciplinas = state.sociodisciplinas.filter(sociodisciplina => sociodisciplina.disdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchSocioDisciplinas.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSocioDisciplinas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sociodisciplinas = action.payload;
                //state.filteredsociodisciplinas = action.payload;
            })
            .addCase(fetchSocioDisciplinas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addSocioDisciplina.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addSocioDisciplina.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //state.sociodisciplinas = action.payload;                                
            })
            .addCase(addSocioDisciplina.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateSocioDisciplina.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateSocioDisciplina.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sociodisciplinas = action.payload;
                
            })
            .addCase(updateSocioDisciplina.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchSocioDisciplinabyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchSocioDisciplinabyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.sociodisciplinaUnique = action.payload;                
                
            })
            .addCase(fetchSocioDisciplinabyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deleteSocioDisciplina.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteSocioDisciplina.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                //state.filteredsociodisciplinas = state.filteredsociodisciplinas.filter((sociodisciplina) => sociodisciplina.id !== action.payload);                
                state.sociodisciplinas = state.sociodisciplinas.filter((sociodisciplina) => sociodisciplina.id !== action.payload);                                          
            })
            .addCase(deleteSocioDisciplina.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            })
            //DAR DE BAJA
            .addCase(dardebajaSocioDisciplina.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(dardebajaSocioDisciplina.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //state.sociodisciplinas = action.payload;                
            })
            .addCase(dardebajaSocioDisciplina.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })
            ;
                      
    }
});

//export const { lista } = sociodisciplinasSlice.actions;
export const { setFilter } = sociodisciplinasSlice.actions;

export default sociodisciplinasSlice.reducer;