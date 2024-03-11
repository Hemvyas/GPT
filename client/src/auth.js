import axios from "axios"
// import useUserStore from "./store";
export const signUpUser=async(registerData)=>{
    try {
       const res = await axios.post("http://localhost:5000/api/auth/register", registerData);
       return res.data; 
    } catch (error) {
     console.log(error);  
      throw error.response.data.error; 
    }
}

export const logInUser=async(loginData)=>{
    try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          loginData,
          {
            withCredentials: true,
          }
        );
      return res.data;
    } catch (error) {
       console.log(error);
       throw error.response.data.error;  
    }
}


