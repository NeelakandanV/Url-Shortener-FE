import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Url } from '../App';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const UserSchemaValidation = yup.object({
    Email: yup.string().email("!Invalid Email format").required("!Email required"),
    Password: yup.string().min(8,"!Password should be atleast 8 characters").required("!Password required")
})


function Login() {
    const navigate = useNavigate()

    // Clearing session storage
    useEffect(()=>{
        sessionStorage.clear();
        setTimeout(()=>{
            alert("Initial request may take longer time!")
        },1000)
    },[])

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            Email : "",
            Password : ""
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            verifyLogin(data)
            //console.log(data)
        }
    })

    // Checking login credentilals
    const verifyLogin = async(data)=>{
        try{
            const verifyData = await axios.post(`${Url}users/`,data,{
                headers:{
                    "Content-Type":"application/json",
                }
            })
            //console.log(verifyData)
            const token = verifyData.data.token;
            const UserId = verifyData.data.UserId;
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('UserId',UserId)
            navigate(`/FetchUrl/${UserId}`)
            toast.success(verifyData.data.message)
        }
        catch(err){
            //console.log(err.response.data)
            toast.error(err.response.data.message)
        }
    }

  return (
    <div className='MainParent'>
        <div className='LoginCont'>
            <div className='ImageCont'>
                <img src="https://images.hindustantimes.com/auto/img/2021/09/12/600x338/Lotus-Emira-GT4_1_1631437113681_1631437125779.jpg"></img>
            </div>
            <div className='FormCont'>
                <h3>Welcome Back!!</h3>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Email Id"
                        helperText = "Enter Your Email"
                        name = "Email"
                        value = {values.Email}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Email && touched.Email ? <p style={{color:"crimson"}}>{errors.Email}</p>:""}
    
                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Password"
                        helperText = "Enter Your Password"
                        name = "Password"
                        value = {values.Password}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Password && touched.Password ? <p style={{color:"crimson"}}>{errors.Password}</p>:""}
                    <Button type="submit" size="sm">Login</Button>
                    <hr></hr>
                    <label>Verify your Account :{" "}</label>
                    <Link to="/users/UserVerification">Verify now!!</Link><br/>
                    <label>Forgot your Password? :{" "}</label>
                    <Link to="/users/ForgotPassword">Click here!!</Link><br/>
                    <label>Don't have an account yet? :{" "}</label>
                    <Link to="/users/Signup">Register here!!</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login