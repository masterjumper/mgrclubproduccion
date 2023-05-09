import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchDisciplinas = createAsyncThunk('Disciplinas/fetchDisciplinas', async () => {
    const response = await axios.get(Connection + '/disciplina/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });  
    
    return response.data.listOfdisciplina;
});

//GET Disciplina
export const fetchDisciplinabyId = createAsyncThunk('Disciplinas/fetchDisciplina', async ( {id} ) => {
    const response = await axios.get(Connection + '/disciplina/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.disciplina[0];
});

//ADD Disciplina
export const addDisciplina = createAsyncThunk('Disciplinas/addDisciplina', async ( disciplinaData ) => {    
    const response = await axios.post(Connection + '/disciplina/', disciplinaData);            
    return response.data;
});

//UPDATE Disciplina
export const updateDisciplina = createAsyncThunk('Disciplinas/updateDisciplina', async ({ id, disciplina}) => {    
    const response = await axios.put(Connection + '/disciplina/' + id, disciplina);    
    return response.data;
});

//DELETE
export const deleteDisciplina = createAsyncThunk('Disciplinas/deleteDisciplina', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/disciplina/' + id);
    try{
    await axios.delete(Connection + '/disciplina/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

export const disciplinasSlice = createSlice({
    name: 'Disciplinas',
    initialState: {
        disciplinas: [],
        filteredDisciplinas:[],
        status: 'idle',
        error: null,
        filter: '',
        catId: null,
        disciplinaUnique: [],
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredDisciplinas = state.disciplinas.filter(disciplina => disciplina.disdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder            
            //LIST & FILTER
            .addCase(fetchDisciplinas.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDisciplinas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.disciplinas = action.payload;                
                state.filteredDisciplinas = action.payload;
            })
            .addCase(fetchDisciplinas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addDisciplina.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addDisciplina.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.disciplinas = action.payload;                                
            })
            .addCase(addDisciplina.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateDisciplina.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateDisciplina.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.disciplinas = action.payload;
                
            })
            .addCase(updateDisciplina.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchDisciplinabyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchDisciplinabyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.disciplinaUnique = action.payload;                
                
            })
            .addCase(fetchDisciplinabyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deleteDisciplina.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteDisciplina.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.filteredDisciplinas = state.filteredDisciplinas.filter((disciplina) => disciplina.id !== action.payload);                
                state.disciplinas = state.disciplinas.filter((disciplina) => disciplina.id !== action.payload);                                          
            })
            .addCase(deleteDisciplina.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            });       
    }
});

//export const { lista } = DisciplinasSlice.actions;
export const { setFilter } = disciplinasSlice.actions;

export default disciplinasSlice.reducer;