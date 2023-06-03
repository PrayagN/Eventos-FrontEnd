import { organizerAxiosInstance} from "../axios/instance";

export const organizerSignup =(values)=>{
    return organizerAxiosInstance.post('/signup',values)
}

export const organizerSignin = (values)=>{
    return organizerAxiosInstance.post('/signin',values)
}

export const viewEvents =()=>{
    return organizerAxiosInstance.get('/viewEvents')
}