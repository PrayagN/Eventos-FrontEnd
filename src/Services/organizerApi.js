import { organizerAxiosInstance} from "../axios/instance";

export const organizerSignup =(values)=>{
    return organizerAxiosInstance.post('/signup',values)
}

export const organizerSignin = (values)=>{
    return organizerAxiosInstance.post('/signin',values)
}
export const organizerAuth =()=>{
    return organizerAxiosInstance.get('/isOrganizerAuth')
}

export const viewEvents =()=>{
    return organizerAxiosInstance.get('/viewEvents')
}
export const organizerProfile =()=>{
    return organizerAxiosInstance.get('/profile')
}
export const updateProfile =(values)=>{
    return organizerAxiosInstance.post('/updateProfile',values)
}
export const bookedClients =(activePage,searchQuery)=>{
    return organizerAxiosInstance.get('/booked-clients',{params:{activePage,searchQuery}})
}
export const updatePayment =(id)=>{
    return organizerAxiosInstance.put('/update-payment',{id})
}