import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
/* export const fetchCuotasGeneradas = createAsyncThunk('cuotasgenerada/fetchCuotasGeneradas', async () => {
    const response = await axios.get(Connection + '/tiposocio/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOftiposocio;
}); */

//GET CuotasGenerada
export const fetchCuotasGenerada = createAsyncThunk('cuotasgenerada/fetchCuotasGenerada', async () => {
    const response = await axios.get(Connection + '/cuotas/', { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
//    console.log(response.data[0])
    return response.data.message;
});


export const addSocioCuotaPago = createAsyncThunk('sociocuotapago/addSocioCuotaPago', async (sociocuotapagoData) => {
    const response = await axios.post(Connection + '/cuotas/pagar/', sociocuotapagoData);
    return response.data;       
});

export const fetchMesAnio = createAsyncThunk('mesanio/fetchMesAnio', async(mesanioData)=>{
    const response = await axios.post(Connection + '/cuotas/mesanio/', mesanioData);
    return response.data.message;
})

//ADD CuotasGenerada
/* export const addCuotasGenerada = createAsyncThunk('cuotasgenerada/addCuotasGenerada', async ( tiposocioData ) => {    
    const response = await axios.post(Connection + '/tiposocio/', tiposocioData);            
    return response.data;
}); */

//UPDATE CuotasGenerada
/* export const updateCuotasGenerada = createAsyncThunk('cuotasgenerada/updateCuotasGenerada', async ({ id, tiposocio}) => {    
    const response = await axios.put(Connection + '/tiposocio/' + id, tiposocio);    
    return response.data;
}); */

//DELETE
/* export const deleteCuotasGenerada = createAsyncThunk('cuotasgenerada/deleteCuotasGenerada', async ( {id } ) => {    
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

export const cuotasgeneradaSlice = createSlice({
    name: 'cuotasgenerada',
    initialState: {
        cuotasgenerada: [],
        //filteredTiposocios:[],
        status: 'idle',
        error: null,
        /* filter: '',
        tipsocId: null,
        tiposocioUnique: [], */
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = 'idle';
        }
      /*   setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredTiposocios = state.cuotasgenerada.filter(tiposocio => tiposocio.tipsocdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },   */     
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            /* .addCase(fetchCuotasGeneradas.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCuotasGeneradas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cuotasgenerada = action.payload;
                state.filteredTiposocios = action.payload;
            })
            .addCase(fetchCuotasGeneradas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }) */
            //ADD
             .addCase(addSocioCuotaPago.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addSocioCuotaPago.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //state.cuotasgenerada = action.payload;                                
            })
            .addCase(addSocioCuotaPago.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }) 

            //Mes Anio
            .addCase(fetchMesAnio.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMesAnio.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload;
                //state.cuotasgenerada = action.payload;                                
            })
            .addCase(fetchMesAnio.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //UPDATE
            /* .addCase(updateCuotasGenerada.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateCuotasGenerada.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cuotasgenerada = action.payload;
                
            })
            .addCase(updateCuotasGenerada.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            }) */

            //GET
            .addCase(fetchCuotasGenerada.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
                
            })
            .addCase(fetchCuotasGenerada.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.message = action.payload;
                state.cuotasgenerada = action.payload;
            })
            .addCase(fetchCuotasGenerada.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            /* .addCase(deleteCuotasGenerada.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteCuotasGenerada.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.filteredTiposocios = state.filteredTiposocios.filter((tiposocio) => tiposocio.id !== action.payload);                
                state.cuotasgenerada = state.cuotasgenerada.filter((tiposocio) => tiposocio.id !== action.payload);                                          
            })
            .addCase(deleteCuotasGenerada.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            }) */;    
    }
});

//export const { lista } = cuotasgeneradaSlice.actions;
export const { setStatus } = cuotasgeneradaSlice.actions;

export default cuotasgeneradaSlice.reducer;