import './App.css';
import { BrowserRouter as Router,Route,Routes, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './Components/Login/Login';
import StudentHome from './Components/Student/Home/Home';
import CounsellorHome from './Components/Counsellor/Home/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [userData,setUserData] = useState(null)
  useEffect(()=>{
    const sessionId = Cookies.get('userId')
    console.log(sessionId)
    if(sessionId){
      axios.get('http://localhost:3002/getDetailsBySessionId',{withCredentials:true}).then((res)=>{
        setUserData(res.data)
        //store data in redux
      }).catch((err)=>{
        console.log(err)
      })
    }
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={
         <>
          {userData ? userData[0].level === 1 ? <Navigate to='/student' /> : <Navigate to='/counsellor' /> : <Login />}
         </>
        } />
        <Route path="/student" element={<StudentHome/>} />
        <Route path="/counsellor" element={<CounsellorHome />} />
      </Routes>
    </Router>
  );
}

export default App;
