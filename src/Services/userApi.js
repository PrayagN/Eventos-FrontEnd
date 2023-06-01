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
export {
    userSignin,
    userSignup,
    userAuth
}