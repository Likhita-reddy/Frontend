import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import Header from '../Header/Header'
function Login() {
    const navigate = useNavigate()
    const [formData,setformData] = useState({
        'username':'',
        'password':''
    })
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const result = await axios.post('http://localhost:3002/login',formData,{withCredentials:true})
        const userData = result.data
        console.log(userData)
        if(userData[0]?.level){
            //store userData in redux
            switch(userData[0]?.level){
                case 1:
                    navigate("/student")
                    alert('Navigating to student')
                    break;
                case 2:
                    navigate("/counsellor")
                    alert('Navigating to counselor')
                    break;
                default:
                    alert("Navigating to no dashboard")
                    navigate("/")
                
            }
        }else{
            alert("Unable to access the level")
            navigate("/")
        }

    }
  return (
    <div className='container'>
        <Header />
        <div className='title'>GVPCE(A)-COUNSELING MANAGEMENT SYSTEM</div>
        <div  className='login-container'>
            <p style={{fontSize:'1.2rem',color:'rgb(93, 178, 232)'}}>Login to your account</p>
            <input type='text' placeholder='Username' className='input-container' onChange={(e)=>setformData({...formData,username:e.target.value})}/>
            <input type='password' placeholder='Password' className='input-container' onChange={(e)=>setformData({...formData,password:e.target.value})}/>
            <button className='login-button' onClick={handleSubmit}>Login</button>
        </div>
    </div>
  )
}

export default Login