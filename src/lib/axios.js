import axios from "axios"
export const axiosInstance =axios.create({
    baseURL:'https://techmelabackend.onrender.com',
    withCredentials:true,
    
})