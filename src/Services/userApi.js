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
export {
    userSignin,
    userSignup,
    userAuth,
    eventList,
    organizerList
}