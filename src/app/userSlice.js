import { createSlice } from "@reduxjs/toolkit"

const UserSlice = createSlice({
    name:'user',
    initialState:{
        userToken :null,
        userName: null
    },
    reducers:{
        userAddDetails(state,actions){
            const newItem =actions.payload
            state.userName = newItem.userName
            state.userToken = newItem.Utoken
        },
        userLogout(state,actions){
            state.userName =""
            state.userToken=""
        }
    }
})
export const userActions = UserSlice.actions
export default UserSlice