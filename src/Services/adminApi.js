import { adminAxiosInstance } from "../axios/instance";

export const adminSignin=(values)=>{
    return adminAxiosInstance.post('/signin',values)
}
export const adminAuth =()=>{
    return adminAxiosInstance.get('/isAdminAuth')
}

export const addEvents =(formData)=>{
    return adminAxiosInstance.post('/addEvents',formData)
}
export const eventsLoad =()=>{
    return adminAxiosInstance.get('events')
}
export const eventPhotos =()=>{
    return adminAxiosInstance.get('')
}
export const listOrganizers =()=>{
    return adminAxiosInstance.get('/listOrganizers')
}
export const listCustomers =()=>{
    return adminAxiosInstance.get('/listCustomers')
}