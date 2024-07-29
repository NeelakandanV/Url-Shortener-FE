import React, { useEffect, useState } from 'react'
import BaseApp from '../BaseApp/BaseApp'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Url } from '../App';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';

// Schema Validation
const UserSchemaValidation = yup.object({
    Original_Url:yup.string().required("Url required!"),
    UrlName:yup.string()
})

function CreateMiniUrl() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const [miniUrl,setMiniUrl]=useState("")

        // Logout 
        const logout = ()=>{
            sessionStorage.clear()
            toast.error("!Logged Out")
            navigate("/users/")
        }

        //Finding Token
        useEffect(()=>{
            if(!token){
              logout()
            }
        },[])

        //Formik Validation
        const {values,handleBlur,handleChange,handleSubmit,errors,touched} =useFormik({
            initialValues:{
                Original_Url :"",
                UrlName:""
            },
            validationSchema:UserSchemaValidation,
            onSubmit:(data)=>{
                ShortUrl(data)
            }
        })

        // Posting Data in API
        const ShortUrl = async(data)=>{
            try{
                const MiniUrl = await axios.post(`${Url}CreateMiniUrl`,data,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                toast.success(MiniUrl.data.message)
                setMiniUrl(MiniUrl.data.Short_Url)
            }
            catch(err){
                toast.error(err.response.data.message)
            }
        }

  return (
    <BaseApp>
        <div className='MainParent'>
        <div className='LoginCont'>
            <div className='ImageCont'>
                <img src="https://i0.wp.com/www.asphaltandrubber.com/wp-content/uploads/2021/12/Ducati-MotoE-electric-race-bike-prototype-2-scaled.jpg?fit=2560%2C1707&ssl=1"></img>
            </div>
            <div className='FormCont'>
                <h4>Short your Longer Url</h4>
                <form onSubmit={handleSubmit}>

                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Original Url"
                        helperText = "Enter Url"
                        name = "Original_Url"
                        value = {values.Original_Url}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Original_Url && touched.Original_Url ? <p style={{color:"crimson"}}>{errors.Original_Url}</p>:""}

                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Your Short Url Name"
                        helperText = "Enter Url Name"
                        name = "UrlName"
                        value = {values.UrlName}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                    
                    <Button type="submit" size="sm">Get MiniUrl</Button>
                    <hr></hr>
                </form>
                {miniUrl ? <p>Your Mini Url is <mark>{miniUrl}</mark></p>:""}
            </div>
        </div>
    </div>
    </BaseApp>
  )
}

export default CreateMiniUrl