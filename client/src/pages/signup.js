import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../auth";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #343541;
`;
const Wrapper = styled.div`
  width: 420px;
  color: #fff;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 25px 35px;
`;
const Form = styled.form``;

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
`;
const InputContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  position: relative;
`;
const Input = styled.input`
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  font-size: 16px;
  color: #fff;
  padding: 20px 45px 20px 20px;
  ::placeholder {
    color: white;
    font-weight: 500;
  }
`;
const Button = styled.button`
  width: 100%;
  height: 45px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;
const Register = styled.p`
  font-size: 14.5px;
  text-align: center;
  margin: 20px 0 15px;
`;
const Show = styled.div`
  position: absolute;
  bottom: 4px;
  right: 18px;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibility,setVisibility]=useState(false);
  const navigate=useNavigate();
  const handleShow = () => {
    setVisible(!visible);
  };
  const handleShow1 = () => {
    setVisibility(!visibility);
  };
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
    if (email === "" || password === "" || name === "" || confirmPassword === "") {
      toast.error("Please fill all fields!", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be at least 8 characters long!",
        toastOptions
      );
      return false;
    }
    else if(password !== confirmPassword){
      toast.error(
        "Passwords  do not match!",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const {mutate,isLoading,isError,error}=useMutation(signUpUser,{
    onSuccess:()=>{
      toast.success("User Registered Successfully!",toastOptions);
      setTimeout(()=>{
          navigate("/login");
      },5000);
    },
    onError:(error)=>{
      console.log(error);
      toast.error(error?.message||"Something went wrong!");
    }
  })

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(handleValidation())
    {
      try {
        mutate({
          name,
          email,
          password,
          confirmPassword,
        });
      } catch (error) {
        console.log(error);
        toast.error(error, toastOptions);
      }
    }
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Title>Sign Up</Title>
            <InputContainer>
              <Input
                type="text"
                placeholder="username"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
            <InputContainer>
              <Input
                type={visibility ? "text" : "password"}
                placeholder="confirm password"
                onChange={(e) => setconfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <Show onClick={handleShow1}>
                {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </Show>
            </InputContainer>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "SignUp"}
            </Button>
            {isError && <div>Error: {error.message}</div>}
            <Register>
              Already have an account?
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Register>
          </Form>
        </Wrapper>
        <ToastContainer />
      </Container>
    </>
  );
};

export default SignUp;
