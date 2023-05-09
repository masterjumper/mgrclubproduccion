import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchCategorias = createAsyncThunk('categorias/fetchCategorias', async () => {
    const response = await axios.get(Connection + '/cat/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOfcategoria;
});

//GET Categoria
export const fetchCategoriabyId = createAsyncThunk('categorias/fetchCategoria', async ( {id} ) => {
    const response = await axios.get(Connection + '/cat/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.categoria;
});

//ADD Categoria
export const addCategoria = createAsyncThunk('categorias/addCategoria', async ( categoriaData ) => {    
    const response = await axios.post(Connection + '/cat/', categoriaData);            
    return response.data;
});

//UPDATE Categoria
export const updateCategoria = createAsyncThunk('categorias/updateCategoria', async ({ id, categoria}) => {    
    const response = await axios.put(Connection + '/cat/' + id, categoria);    
    return response.data;
});

//DELETE
export const deleteCategoria = createAsyncThunk('categorias/deleteCategoria', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/cat/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

export const categoriasSlice = createSlice({
    name: 'categorias',
    initialState: {
        categorias: [],
        filteredCategorias:[],
        status: 'idle',
        error: null,
        filter: '',
        catId: null,
        categoriaUnique: [],
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredCategorias = state.categorias.filter(categoria => categoria.catdsc.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchCategorias.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCategorias.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categorias = action.payload;
                state.filteredCategorias = action.payload;
            })
            .addCase(fetchCategorias.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addCategoria.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addCategoria.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categorias = action.payload;                                
            })
            .addCase(addCategoria.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateCategoria.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateCategoria.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categorias = action.payload;
                
            })
            .addCase(updateCategoria.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchCategoriabyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchCategoriabyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.categoriaUnique = action.payload;                
                
            })
            .addCase(fetchCategoriabyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deleteCategoria.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteCategoria.fulfilled, (state, action) => {
                state.status = 'succeeded';                 
                state.filteredCategorias = state.filteredCategorias.filter((categoria) => categoria.id !== action.payload);
                state.categorias = state.categorias.filter((categoria) => categoria.id !== action.payload);                                          
            })
            .addCase(deleteCategoria.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            });
                      
    }
});

//export const { lista } = categoriasSlice.actions;
export const { setFilter } = categoriasSlice.actions;

export default categoriasSlice.reducer;