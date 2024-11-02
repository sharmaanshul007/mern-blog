import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser:null,
    loading:false,
    error:null,
}
export const userSlice = createSlice({
    "name":"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess:(state,action)=>{
            state.currentUser= action.payload;
            state.loading= false;
            state.error = null;
        },
        signInFailure:(state,action)=>{
            state.loading = true;
            state.error = action.payload;
        },
        signInStop:(state)=>{
            state.loading = false;
        },
        updateStart:(state)=>{
            state.loading = true,
            state.error = null;
        },
        updateSuccess:(state,action) =>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        updateFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart:(state)=>{
            state.loading = false;
            state.error = null;
        },
        deleteUserSuccess:(state)=>{
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },
        deleteUserFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        signOutSuccess:(state)=>{
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        }
    }
});
export const {signInFailure,signInStart,signInSuccess,signInStop,updateFailure,updateSuccess,updateStart,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutSuccess} = userSlice.actions;
export default userSlice.reducer;