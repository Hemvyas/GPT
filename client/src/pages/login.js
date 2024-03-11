import React, { useState } from 'react'
import {Link} from "react-router-dom"
import styled from "styled-components"
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { logInUser } from '../auth';
import useUserStore from '../store';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #343541;
`;
const Wrapper=styled.div`
width:420px;
color:#fff;
background:transparent;
border:2px solid rgba(255,255,255,0.2);
backdrop-filter:blur(20px);
box-shadow: 0 0 10px rgba(0,0,0,0.2);
border-radius:10px;
padding:30px 40px;
`
const Form = styled.form`
`;

const Title =styled.h1`
font-size:36px;
text-align:center;
`
const InputContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  position: relative;
`;
const Input = styled.input`
height:100%;
background:transparent;
border:none;
outline:none;
border:2px solid rgba(255,255,255,0.2);
border-radius:50px;
font-size:16px;
color:#fff;
padding:20px 45px 20px 20px;
::placeholder{
    color:white;
    font-weight:500;
}
`;
const Button = styled.button`
width:100%;
height:45px;
background:#fff;
border:none;
outline:none;
border-radius:40px;
box-shadow: 0 0 10px rgba(0,0,0,0.1);
cursor:pointer;
font-size:16px;
color:#333;
font-weight:600;
`;
const Register = styled.p`
font-size:14.5px;
text-align:center;
margin:20px 0 15px;
`;
const Show = styled.div`
  position: absolute;
  bottom: 4px;
  right: 18px;
  transition: all 0.5s ease;
  cursor: pointer;
`;



const Login = () => {
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const [visible, setVisible] = useState(false);
  const navigate=useNavigate();
    const handleShow=()=>{
      setVisible(!visible);
    }

     const toastOptions = {
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       theme: "dark",
     };

     const handleValidation = () => {
       if (email === "" || password === "") {
         toast.error("Please fill in all fields!", toastOptions);
         return false;
       } else if (password.length < 8) {
         toast.error(
           "Password should be at least 8 characters long!",
           toastOptions
         );
         return false;
       }
       return true;
     };

     const {mutate,isLoading,isError,error}=useMutation(logInUser,{
      onSuccess:(data)=>{
        useUserStore.getState().setUser(data.userInfo);
        toast.success("Login successful!");
        setTimeout(()=>{
          navigate('/');
        },5000)
      },
      onError:(data)=>{
        toast.error(error.response.data || "Login failed");
        console.log(error.response.data.error);
      }
     })

     const handleSubmit=(e)=>{
      e.preventDefault();
      if (handleValidation()) {
        try {
          mutate({email,password});
        } catch (error) {
          console.log(error);
        }
      }
     }

  return (
    <>
      <Container>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Title>Login</Title>
            <InputContainer>
              <Input
                type="text"
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Input
                type={visible ? "text" : "password"}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Show onClick={handleShow}>
                {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </Show>
            </InputContainer>
            <Button type="submit" disabled={isLoading}>{isLoading?"Signing In...":"Sign In"}</Button>
            {isError && <p>Error: {error.message}</p>}
            <Register>
              Don't have an account?
              <Link
                to="/register"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Register
              </Link>
            </Register>
          </Form>
        </Wrapper>
        <ToastContainer />
      </Container>
    </>
  );
}

export default Login