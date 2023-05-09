import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchDisciplinaSociosInscriptosSlice = createAsyncThunk('DisciplinaSociosInscriptosSlice/fetchDisciplinaSociosInscriptosSlice', async ({id}) => {
    const response = await axios.get(Connection + '/disciplinasociosinscriptos/'+ id,{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });

    return response.data.listOfDisSocIns;
});

export const disciplinaSociosInscriptosSlice = createSlice({
    name: 'disciplinaSociosInscriptos',
    initialState: {
        disciplinaSociosInscriptos: [],
        status: 'idle',
        error: null,        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder            
            //LIST & FILTER
            .addCase(fetchDisciplinaSociosInscriptosSlice.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDisciplinaSociosInscriptosSlice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.disciplinaSociosInscriptos = action.payload;
            })
            .addCase(fetchDisciplinaSociosInscriptosSlice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });            
    }
});

export default disciplinaSociosInscriptosSlice.reducer;