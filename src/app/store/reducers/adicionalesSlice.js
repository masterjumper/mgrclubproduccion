import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchAdicional = createAsyncThunk('adicionales/fetchAdicional', async () => {    
    const response = await axios.get(Connection + '/adicional/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });            
    return response.data.listOfadicional;

});

//GET adicional
export const fetchAdicionalbyId = createAsyncThunk('adicionales/fetchAdicionalbyId', async ( {id} ) => {
    const response = await axios.get(Connection + '/adicional/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.adicional[0];
});

//ADD adicional
export const addAdicional = createAsyncThunk('adicionales/addAdicional', async ( adicionalData ) => {    
    const response = await axios.post(Connection + '/adicional/', adicionalData);            
    return response.data;
});

//UPDATE adicional
export const updateAdicional = createAsyncThunk('adicionales/updateAdicional', async ({ id, adicional}) => {    
    const response = await axios.put(Connection + '/adicional/' + id, adicional);    
    return response.data;
});

//DELETE
export const deleteAdicional = createAsyncThunk('adicionales/deleteAdicional', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/adicional/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

export const adicionalesSlice = createSlice({
    name: 'adicionales',
    initialState: {
        adicionales: [],
        filteredAdicionales:[],
        status: 'idle',
        error: null,
        filter: '',
        adiid: null,
        adicionalUnique: [],       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredAdicionales = state.adicionales.filter(adicional => adicional.adidsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder            
            //LIST & FILTER
            .addCase(fetchAdicional.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAdicional.fulfilled, (state, action) => {
                state.status = 'succeeded';                
                state.adicionales = action.payload;
                state.filteredAdicionales = action.payload;
            })
            .addCase(fetchAdicional.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
             
            .addCase(addAdicional.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addAdicional.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.adicionales = action.payload;                                
            })
            .addCase(addAdicional.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateAdicional.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateAdicional.fulfilled, (state, action) => {
                state.status = 'succeeded';                
                state.adicionales = action.payload;
                
            })
            .addCase(updateAdicional.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;                
            })

            //GET
            .addCase(fetchAdicionalbyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchAdicionalbyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.adicionalUnique = action.payload;                
                
            })
            .addCase(fetchAdicionalbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //DELETE
            .addCase(deleteAdicional.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteAdicional.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.filteredAdicionales = state.filteredAdicionales.filter((adicional) => adicional.id !== action.payload);                
                state.adicionales = state.adicionales.filter((adicional) => adicional.id !== action.payload);                                          
            })
            .addCase(deleteAdicional.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            });       
    }
});

//export const { lista } = adicionalSlice.actions;
export const { setFilter } = adicionalesSlice.actions;

export default adicionalesSlice.reducer;