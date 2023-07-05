import { createSlice } from "@reduxjs/toolkit"

const OrganizerSlice = createSlice({
    name:'organizer',
    initialState:{
        authorized:false,
        organizerName: null
    },
    reducers:{
        organizerLogin(state,actions){
            const newItem =actions.payload
            state.organizerName = newItem.organizerName
            state.authorized = true
        },
        organizerLogout(state){
            state.organizerName =""
            state.authorized =false
        }
    }
})
export const organizerActions = OrganizerSlice.actions
export default OrganizerSlice