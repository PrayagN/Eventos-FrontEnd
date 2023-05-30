import {userAxiosInstance} from '../axios/instance'

 const userSignin =(values)=>{
    return userAxiosInstance.post('/signin',values)
}
    const userSignup =(values)=>{
        return userAxiosInstance.post('/signup',values)
    }
export {
    userSignin,
    userSignup
}