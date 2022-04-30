import Dashboard from "./components/Dashboard";
import MyLoginPage from './components/MyLoginPage';
import AllDocuments from "./pages/AllDocuments";
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "./firebase";
import React, { useEffect } from "react";
import Settings from "./pages/Settings";
import Shared from "./pages/Shared";
import LeftNavBar from "./components/LeftNavBar";


function App() {

  const logoutHandler = () => {
    logout().then(() => {
      alert("Logout successfull!");
    })
      .catch((err) => { alert("Error : " + err) });
    return false;
  };

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Not Logged In");
    }
    else {
      console.log("Already Logged In");
    }
  }, [user, loading]);

  return (
    <Router>
      {user && <LeftNavBar logoutHandler={logoutHandler} />}
      <Routes>
        <Route exact path='/' element={<Dashboard />}></Route>
        <Route exact path='/login' element={< MyLoginPage />}></Route>
        <Route exact path='/alldocuments' element={< AllDocuments />}></Route>
        <Route exact path='/settings' element={< Settings />}></Route>
        <Route exact path='/shared' element={< Shared />}></Route>
      </Routes>
    </Router >
  );
}

export default App;