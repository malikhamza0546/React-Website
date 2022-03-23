import React, { useEffect } from 'react';
import './App.css';
import BookingPage from './BookingPage/BookingPage';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import SignUp from './SignUp/SignUp';
import Landing from './Landing/Landing';
import SignIn from './SignIn/SignIn';
import Listing from './Listing/Listing';
import Profile from './Profile/Profile';
import Dashboard from './Dashboard/DashboardRoutes/Dashboard';
import VideoChat from './VideoCall/videoChat';
import Done from './BookingPage/BookingMainContent/MainContent/Done/Done';
import CookieConsent from "react-cookie-consent";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
const App = () => {
  const RequireAuth = ({ children, redirectTo }) => {
    let isAuthenticated = localStorage.getItem('token')
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
  return (
    <div style={{ fontFamily: 'Cerebri Sans Book' }}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/listing' element={<Listing />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/request-a-call/:id' element={<BookingPage />} />
        <Route path='/booking-confirm' element={<Done />} />
        <Route exact path="/linkedin" component={LinkedInCallback} />
        <Route
          path='/dashboard/*'
          element={
            <RequireAuth redirectTo="/">
              <Dashboard />
            </RequireAuth>

          } >
        </Route>
        <Route
          path='/dashboard/booking/call/:name/:roomid'
          element={
            <RequireAuth redirectTo="/">
              <VideoChat />
            </RequireAuth>

          } >
        </Route>
        <Route path="*" element={<div className="absolute top-0 left-0 bg-black w-screen h-screen flex items-center justify-center" style={{ zIndex: '1000' }}><div>
          <img src="/notfound.gif" />
        </div></div>} />
      </Routes>
      <CookieConsent
        // debug={true}
        location="bottom"
        buttonText="Accept cookies"
        // cookieName="myAwesomeCookieName2"
        style={{ background: 'black', margin: '50px', padding: '20px', paddingTop: '20px', paddingBottom: '20px', width: '50%' }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      // expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}
        <p>If you want to save cookies then you click on button</p>
        {/* <p className='absolute top-0 right-0 m-2'>X</p> */}
      </CookieConsent>
    </div>
  );
}




export default App;
