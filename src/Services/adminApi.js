import { adminAxiosInstance } from "../axios/instance";

export const adminSignin=(values)=>{
    return adminAxiosInstance.post('/signin',values)
}
export const adminAuth =()=>{
    return adminAxiosInstance.get('/isAdminAuth')
}
