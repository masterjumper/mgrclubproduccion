import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchSocioTransaccion = createAsyncThunk('sociotransaccion/fetchSocioTransaccion', async ({id}) => {
    const response = await axios.get(Connection + '/sociotransaccion/'+ id,{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOfsoctra;
});

/* //GET TipoSocio
export const fetchTipoSociobyId = createAsyncThunk('sociotransaccion/fetchTipoSocio', async ( {id} ) => {
    const response = await axios.get(Connection + '/tiposocio/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.tiposocio[0];
});
 */
//ADD TipoSocio
export const addSocioTransaccion = createAsyncThunk('sociotransaccion/addSocioTransaccion', async ( sociotransaccionData ) => {    
    //console.log('sociotransaccionData ', sociotransaccionData);
    const response = await axios.post(Connection + '/sociotransaccion/', sociotransaccionData);            
    return response.data;
});

/* //UPDATE TipoSocio
export const updateTipoSocio = createAsyncThunk('sociotransaccion/updateTipoSocio', async ({ id, tiposocio}) => {    
    const response = await axios.put(Connection + '/tiposocio/' + id, tiposocio);    
    return response.data;
});

//DELETE
export const deleteTipoSocio = createAsyncThunk('sociotransaccion/deleteTipoSocio', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/tiposocio/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  }); */

export const sociotransaccionSlice = createSlice({
    name: 'sociotransaccion',
    initialState: {
        sociotransaccion: [],
        //filteredTiposocios:[],
        status: 'idle',
        error: null,
        //filter: '',
        //tipsocId: null,
        //tiposocioUnique: [],
       
    },
    reducers: {
        /* setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredTiposocios = state.sociotransaccion.filter(tiposocio => tiposocio.tipsocdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        }, */       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchSocioTransaccion.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSocioTransaccion.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sociotransaccion = action.payload;                
            })
            .addCase(fetchSocioTransaccion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addSocioTransaccion.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addSocioTransaccion.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sociotransaccion = action.payload;                                
            })
            .addCase(addSocioTransaccion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            /* .addCase(updateTipoSocio.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateTipoSocio.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sociotransaccion = action.payload;
                
            })
            .addCase(updateTipoSocio.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            }) */

            //GET
            /* .addCase(fetchTipoSociobyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchTipoSociobyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.tiposocioUnique = action.payload;                
                
            })
            .addCase(fetchTipoSociobyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            }) */
            //DELETE
            /* .addCase(deleteTipoSocio.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteTipoSocio.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.filteredTiposocios = state.filteredTiposocios.filter((tiposocio) => tiposocio.id !== action.payload);                
                state.sociotransaccion = state.sociotransaccion.filter((tiposocio) => tiposocio.id !== action.payload);                                          
            })
            .addCase(deleteTipoSocio.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            }); */
                      
    }
});

//export const { lista } = sociotransaccionSlice.actions;
//export const { setFilter } = sociotransaccionSlice.actions;

export default sociotransaccionSlice.reducer;