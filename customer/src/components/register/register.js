import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import {useHistory} from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = event => {
        const{name, value} = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { firstName, lastName, email, dateOfBirth, password, confirmPassword} = user

        if(firstName && lastName && email && password && (password === confirmPassword) ) {
           
            axios.post('http://localhost:3001/register', user)
            .then( res => alert(res.data.message))
            history.push('/login')
        } else {
            alert('Please enter correct details')
        }
    }

    return (
        <div>

            <form> 
            <div className='register'>
            <h1>Create New Customer Account</h1>

            <div className='label'> <label>First Name <span className="asterix">*</span></label> </div>
            <input type='text' name="firstName" value={user.firstName} onChange={handleChange}></input>

            <div className='label'> <label>Last Name <span className="asterix">*</span></label> </div>
            <input type='text' name="lastName" value={user.lastName} onChange={handleChange}></input>

            <div className='label'> <label>Email <span className="asterix">*</span></label> </div>
            <input type="email" name="email" value={user.email} onChange={handleChange}></input>

            <div className='label'> <label>Date of Birth</label> </div>
            <input type='date' name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange}></input>
         
            <div className='label'><label>Password <span className="asterix">*</span></label></div>
            <input type='password' name="password" value={user.password} onChange={handleChange}></input> 

            <div className='label'><label>Confirm Password <span className="asterix">*</span></label></div>
            <input type='password' name="confirmPassword" value={user.confirmPassword} onChange={handleChange}></input>         
            
            <div>
            <button type='submit' className='button' onClick={() => history.push('/login')}>Cancel</button>
            <button type='submit' className='button' onClick={register}>Submit</button>
            </div>
        </div>
            </form>
            
        </div>
    )
}
export default Register