
import React from 'react';
import Up from '../../Images/up.png'
import Down from '../../Images/down_.png';
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { useState } from "react";
import styled from "styled-components";
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router';
import Colors from '../../Colors/Colors';

const Main = styled("div")`
  height:80px;
  z-index:2;
`;

const DropDownContainer = styled("div")`
  width: 8rem;

`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  font-weight: 500;
  font-size: 1.3rem;
  color: white;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  z-index:2;
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: ${Colors.grey};
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: black;
  border-radius:6px;
  &:first-child {
    padding-top: 0.4em;
  }
`;


const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.4em;
`;
const DropDown = (props) => {
  // const RequireAuth = ({ children, redirectTo }) => {
  //   let isAuthenticated = localStorage.getItem('token')
  //   return isAuthenticated ? children : <Navigate to={redirectTo} />;
  // }
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  return (
    <div>
      <head>
        <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
      </head>
      <Main >
        <DropDownContainer style={{ marginTop: "2.5px" }}>
          <DropDownHeader style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }} onClick={toggling}>
            {props.profileImgTag}
            <div style={{ width: "20%" }}>
              {isOpen ? <img
                src={Up}
                alt="Canvas Logo"
              />
                :
                <img
                  src={Down}
                  alt="Canvas Logo"
                />}
            </div>

          </DropDownHeader>
          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                <ListItem className="cursor-pointer hover:text-gray-500" onClick={() => {
                  navigate('/dashboard/home')
                  toggling()
                }}>Dashboard</ListItem>
                <ListItem className="cursor-pointer hover:text-gray-500" onClick={() => {
                  navigate('/dashboard/bookings')
                  toggling()
                }}>Bookings</ListItem>
                <ListItem className="cursor-pointer hover:text-gray-500" onClick={() => {
                  localStorage.clear()
                  navigate('/')
                  toggling()
                }}>Logout</ListItem>
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
      </Main>
    </div>

  );
}

export default DropDown;