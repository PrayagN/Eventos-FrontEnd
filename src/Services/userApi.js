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
    const organizerList =()=>{
        return userAxiosInstance.get('/listOrganizers')
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
export {
    userSignin,
    userSignup,
    userAuth,
    eventList,
    organizerList,
    profileGet,
    updateProfile,
    organizerView,
    checkoutPayment

}