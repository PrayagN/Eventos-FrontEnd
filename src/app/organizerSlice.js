import { createSlice } from "@reduxjs/toolkit"

const OrganizerSlice = createSlice({
    name:'organizer',
    initialState:{
        organizerToken :null,
        organizerName: null
    },
    reducers:{
        organizerAddDetails(state,actions){
            const newItem =actions.payload
            state.organizerName = newItem.organizerName
            state.organizerToken = newItem.token
        },
        organizerLogout(state,actions){
            state.organizerName =""
            state.organizerToken=""
        }
    }
})
export const organizerActions = OrganizerSlice.actions
export default OrganizerSlice