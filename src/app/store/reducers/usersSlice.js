import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection } from '../../utils/Connection';
//LIST
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(Connection + '/users/',{
        headers: {
        accessToken: localStorage.getItem("accessToken"),
        }
    });        
    return response.data.listOfUsers;
});

//GET User
export const fetchUserbyId = createAsyncThunk('users/fetchUser', async ( {id} ) => {
    const response = await axios.get(Connection + '/users/' + id, { 
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        }
    });    
    return response.data.user;
});

//ADD User
export const addUser = createAsyncThunk('users/addUser', async ( userData ) => {    
    const response = await axios.post(Connection + '/users/', userData);            
    return response.data;
});

//UPDATE User
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user}) => {    
    const response = await axios.put(Connection + '/users/' + id, user);    
    return response.data;
});

//DELETE
export const deleteUser = createAsyncThunk('users/deleteUser', async ( {id } ) => {    
    //const response = await axios.delete(Connection + '/cat/' + id);
    try{
    await axios.delete(Connection + '/users/' + id);
    //return response.data;
    return id
    } catch (error) {
        //console.log(error.response.data)
        return error.response.data;
      }

  });

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        filteredUsers:[],
        status: 'idle',
        error: null,
        filter: '',
        userid: null,
        userUnique: [],
       
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredUsers = state.users.filter(user => user.username.toLowerCase().includes(action.payload.toLowerCase()) );    
        },       
    },
    extraReducers: (builder) => {
        builder
            
            //LIST & FILTER
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
                state.filteredUsers = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //ADD
            .addCase(addUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;                                
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })

            //UPDATE
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
                
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })

            //GET
            .addCase(fetchUserbyId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                
            })
            .addCase(fetchUserbyId.fulfilled, (state, action) => {                                
                state.status = 'succeeded';
                state.userUnique = action.payload;                
                
            })
            .addCase(fetchUserbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                            })
            //DELETE
            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';                
                state.error = null;                 
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.filteredUsers = state.filteredUsers.filter((user) => user.id !== action.payload);                
                state.users = state.users.filter((user) => user.id !== action.payload);                                          
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';                 
                state.error = action.error;
                
            });
                      
    }
});

//export const { lista } = usersSlice.actions;
export const { setFilter } = usersSlice.actions;

export default usersSlice.reducer;