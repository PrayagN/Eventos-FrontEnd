import {userAxiosInstance} from '../axios/instance'

 const userSignin =(values)=>{
    return userAxiosInstance.post('/signin',values)
}
    const userSignup =(values)=>{
        return userAxiosInstance.post('/signup',values)
    }
    const userAuth =()=>{
        return userAxiosInstance.get('/isUserAuth')
    }
    const  eventList=()=>{
        return userAxiosInstance.get('/listEvent')
    }
    const eventOrganizers = (id)=>{
        return userAxiosInstance.post('/eventOrganizers',{id})
    }
    const organizerList =(activePage,size,searchQuery,selectedEvent)=>{
        return userAxiosInstance.get('/listOrganizers',{params:{activePage,size,searchQuery,selectedEvent}})
    }
    const organizerView =(id)=>{
        return userAxiosInstance.post('/viewOrganizer',{id})
    }
    const profileGet =()=>{
        return userAxiosInstance.get('/profile')
    }
    const updateProfile =(values)=>{
        return userAxiosInstance.put('/updateProfile',values)
    }
    const checkoutPayment =(values)=>{
        return userAxiosInstance.post('/create-checkout-session',values)
    }
    const bookedEvents =()=>{
        return userAxiosInstance.get('/booked-events')
    }
    
export {
    userSignin,
    userSignup,
    userAuth,
    eventList,
    eventOrganizers,
    organizerList,
    profileGet,
    updateProfile,
    organizerView,
    checkoutPayment,
    bookedEvents

}