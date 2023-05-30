
import axios from "axios";

const userBaseUrl = import.meta.env.VITE_UserBaseUrl;
const adminBaseUrl = import.meta.env.VITE_AdminBaseUrl;
const organizerBaseUrl = import.meta.env.VITE_OrganizerBaseUrl;

const createAxiosClient =(baseURL)=>{
    
    const client = axios.create({
        baseURL,
        timeout:4000,
        timeoutErrorMessage:"Request timeout... Please Try Again!!!"
    })
    return client
}

const attachToken = (req, token ='token')=>{
    let authToken = localStorage.getItem(token)
    if(authToken){
        req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
}

const organizerAxiosInstance = createAxiosClient(organizerBaseUrl)

organizerAxiosInstance.interceptors.request.use(async(req)=>{
    const modifiedReq = attachToken(req,'organizertoken')
    return modifiedReq
})


const userAxiosInstance = createAxiosClient(userBaseUrl)
userAxiosInstance.interceptors.request.use(async(req)=>{
    console.log(userBaseUrl);
    const modifiedReq = attachToken(req)
    return modifiedReq
})

const adminAxiosInstance = createAxiosClient(adminBaseUrl)
adminAxiosInstance.interceptors.request.use(async(req)=>{
    const modifiedReq = attachToken(req,'admintoken')
    return modifiedReq
})

export {organizerAxiosInstance,userAxiosInstance,adminAxiosInstance}