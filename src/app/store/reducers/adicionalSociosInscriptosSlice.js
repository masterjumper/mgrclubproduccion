import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchAdicionalSociosInscriptosSlice = createAsyncThunk('AdicionalSociosInscriptosSlice/fetchAdicionalSociosInscriptosSlice', async ({id}) => {
    const response = await axios.get(Connection + '/adicionalSociosinscriptos/'+id ,{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });

    return response.data.listOfAdiSocIns;
});

export const adicionalSociosinscriptosSlice = createSlice({
    name: 'adicionalSociosinscriptos',
    initialState: {
        adicionalSociosInscriptos: [],
        status: 'idle',
        error: null,        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder            
            //LIST & FILTER
            .addCase(fetchAdicionalSociosInscriptosSlice.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAdicionalSociosInscriptosSlice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.adicionalSociosInscriptos = action.payload;
            })
            .addCase(fetchAdicionalSociosInscriptosSlice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });            
    }
});

export default adicionalSociosinscriptosSlice.reducer;