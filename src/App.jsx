import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css'
import SideBar from './components/SideBar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Calendar from './pages/Calendar';
import { auth } from "./firebase";
import { useState, useEffect } from "react";

function Layout() {
  const location = useLocation();
  const hideSidebarPaths = ['/LogIn', '/Register', '/']; // Add other paths if needed

  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <div className='min-h-screen bg-white flex flex-col lg:flex-row'>
      {!hideSidebarPaths.includes(location.pathname) && <SideBar />}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/Home" /> : <LogIn />}
        />
        <Route path='/Home' element={<Home />} />
        <Route path='/Tasks' element={<Tasks />} />
        <Route path='/LogIn' element={<LogIn />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Calendar' element={<Calendar />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App
