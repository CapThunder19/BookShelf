import axios from "axios";

export const signup = async (userdata) =>{
    try{
        const res = await axios.post(`http://localhost:3002/api/auth/signup`, userdata);
        return res.data;
    }
    catch(err){
        console.error("signup error", err);
        return {error:true};
    }
}

export const login = async (userdata) =>{
    try{
        const res = await axios.post(`http://localhost:3002/api/auth/login`, userdata);
        return res.data;
    }
    catch(err){
        console.error("login error",err);
        return {error:true};
    }
}