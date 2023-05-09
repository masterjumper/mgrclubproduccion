import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchSocioAdicionales = createAsyncThunk('socioadicionales/fetchSocioAdicionales', async ({socid}) => {
    
    const response = await axios.get(Connection + '/socioadicional/' + socid,{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOfsocadi;
});

//GET SocioAdicional
export const fetchSocioAdicionalbyId = createAsyncThunk('socioadicionales/fetchSocioAdicional', async ( {id} ) => {
    const response = await axios.get(Connection + '/socioadicional/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data;
});

//ADD SocioAdicional
export const addSocioAdicional = createAsyncThunk('socioadicionales/addSocioAdicional', async ( socioadicionalData ) => {    
    
    const response = await axios.post(Connection + '/socioadicional/', socioadicionalData);            
    return response.data;
});

//UPDATE SocioAdicional
export const updateSocioAdicional = createAsyncThunk('socioadicionales/updateSocioAdicional', async ({ id, socioadicional}) => {    
    const response = await axios.put(Connection + '/socioadicional/' + id, socioadicional);    
    return response.data;
});

//DELETE
export const deleteSocioAdicional = createAsyncThunk('socioadicionales/deleteSocioAdicional', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/socioadicional/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

//DAR DEBAJA SocioAdicional
export const dardebajaSocioAdicional = createAsyncThunk('socioadicionales/dardebajaSocioAdicional', async ({ id }) => {    
    const response = await axios.put(Connection + '/socioadicional/' + id );    
    return response.data;
});

export const socioadicionalesSlice = createSlice({
    name: 'socioadicionales',
    initialState: {
        socioadicionales: [],
        //filteredsocioadicionales:[],
        status: 'idle',
        error: null,
        filter: '',
        //tipsocId: null,
        socioadicionalUnique: [],
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            //state.filteredsocioadicionales = state.socioadicionales.filter(socioadicional => socioadicional.disdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchSocioAdicionales.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSocioAdicionales.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.socioadicionales = action.payload;
                //state.filteredsocioadicionales = action.payload;
            })
            .addCase(fetchSocioAdicionales.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addSocioAdicional.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addSocioAdicional.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //state.socioadicionales = action.payload;                                
            })
            .addCase(addSocioAdicional.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateSocioAdicional.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateSocioAdicional.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.socioadicionales = action.payload;
                
            })
            .addCase(updateSocioAdicional.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchSocioAdicionalbyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchSocioAdicionalbyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.socioadicionalUnique = action.payload;                
                
            })
            .addCase(fetchSocioAdicionalbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deleteSocioAdicional.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteSocioAdicional.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                //state.filteredsocioadicionales = state.filteredsocioadicionales.filter((socioadicional) => socioadicional.id !== action.payload);                
                state.socioadicionales = state.socioadicionales.filter((socioadicional) => socioadicional.id !== action.payload);                                          
            })
            .addCase(deleteSocioAdicional.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            })
            //DAR DE BAJA
            .addCase(dardebajaSocioAdicional.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(dardebajaSocioAdicional.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //state.socioadicionales = action.payload;                
            })
            .addCase(dardebajaSocioAdicional.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })
            ;
                      
    }
});

//export const { lista } = socioadicionalesSlice.actions;
export const { setFilter } = socioadicionalesSlice.actions;

export default socioadicionalesSlice.reducer;