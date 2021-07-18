import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import {useHistory} from "react-router-dom"


const Login = ({setLoginUser}) => {

    const history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = event => {
        const{name, value} = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post('http://localhost:3001/login', user)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            history.push('/')
        })
    }   

    return (

            <div className='login'>
            <h1> Customer Login</h1>
            <div className='label'> <label>Email <span className="asterix">*</span></label> </div>
            <input type='text' name='email' value={user.email} onChange={handleChange}></input>
            <br /><br />
            <div className='label' ><label>Password <span className="asterix">*</span></label></div>
            <input type='password' name='password' value={user.password} onChange={handleChange}></input>         
            <br /><br />
            <div>
            <button type='submit' className='button' onClick={() => history.push("/register")}> Register </button>
            <button type='submit' className='button' onClick={login}>Login</button>
            </div>
        </div>
        
    )
}
export default Login