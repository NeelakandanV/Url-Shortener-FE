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
  First_Name:yup.string().required("!Kindly Enter your First Name"),
  Last_Name:yup.string().required("!Kindly Enter your Last Name"),
  Email: yup.string().email("!Invalid Email format").required("!Email required"),
  Password: yup.string().min(8,"!Password should be atleast 8 characters").required("!Password required")
})


function Signup() {
    const navigate = useNavigate();

  // Clearing session storage
  useEffect(()=>{
      sessionStorage.clear()
  },[])

  // Form Validation
  const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
      initialValues:{
          First_Name:"",
          Last_Name:"",
          Email : "",
          Password : ""
      },
      validationSchema : UserSchemaValidation,
      onSubmit:(data)=>{
          verifySignup(data)
          //console.log(data)
      }
  })

  // Creating New User credentilals
  const verifySignup = async(data)=>{
      try{
          const verifyData = await axios.post(`${Url}users/Signup`,data,{
              headers:{
                  "Content-Type":"application/json",
              }
          })
          //console.log(verifyData)
          toast.success(verifyData.data.message)
          navigate('/users/')
      }
      catch(err){
          //console.log(err)
          toast.error(err.response.data.message)
      }
  }

  return (
    <div className='MainParent'>
        <div className='LoginCont'>
            <div className='ImageCont'>
                <img src="https://hips.hearstapps.com/hmg-prod/images/gub-1608133278.jpg"></img>
            </div>
            <div className='FormCont'>
                <h3>Welcome Back!!</h3>
                <form onSubmit={handleSubmit}>

                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "First Name"
                        helperText = "Enter Your First Name"
                        name = "First_Name"
                        value = {values.First_Name}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.First_Name && touched.First_Name ? <p style={{color:"crimson"}}>{errors.First_Name}</p>:""}
                        
                        <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Last Name"
                        helperText = "Enter Your Last Name"
                        name = "Last_Name"
                        value = {values.Last_Name}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Last_Name && touched.Last_Name ? <p style={{color:"crimson"}}>{errors.Last_Name}</p>:""}

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
                    <Button type="submit" size="sm">Register</Button>
                    <hr></hr>
                    <label>Verify your Account :{" "}</label>
                    <Link to="/users/UserVerification">Verify now!!</Link><br/>
                    <label>Forgot your Password? :{" "}</label>
                    <Link to="/users/ForgotPassword">Click here!!</Link><br/>
                    <label>Already have an account! :{" "}</label>
                    <Link to="/users/">Login!!</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup