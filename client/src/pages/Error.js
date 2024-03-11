import React from 'react'
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
const Container=styled.div`
height:100vh;
display:flex;
justify-content:center;
align-items:center;
width:100vw;
flex-direction:column;
`
const Title=styled.h2`
font-size:52px;
color:#fff;
`
const Button=styled.button`
border:none;
width:150px;
padding:12px 20px;
background:#ff4c79;
cursor:pointer;
border-radius:5px;
color:#fff;
`

const Error = () => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(-1);
    };
  return (
    <Container>
        <Title>Page Not Found</Title>
        <Button onClick={handleClick}>GO BACK</Button>
    </Container>
  )
}

export default Error