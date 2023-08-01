import { Navigate, Route, Routes } from "react-router-dom";
// import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { useState } from "react";
import userService from "./utils/userService";

function App() {

  //This will grab the user from the JWT token in our client local storage and decode it
  //If there is no user logged in, the result will be null
  const [user, setUser] = useState(userService.getUser());


  function handleSignUpOrLogin(){
    setUser(userService.getUser());
  }

  function handleLogout(){
    userService.logout();
    setUser(null);
  }













  if(!user){
    return(
      <Routes>
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>}/>
      <Route path="/*" element={<Navigate to="/login"/>} />
    </Routes>

    )
  }


  return (
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>}/>
    </Routes>
  );
}

export default App;
