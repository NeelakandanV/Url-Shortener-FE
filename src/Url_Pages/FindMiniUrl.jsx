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
})

function FindMiniUrl() {
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
                Original_Url :""
            },
            validationSchema:UserSchemaValidation,
            onSubmit:(data)=>{
                ShortUrl(data)
            }
        })

        // Posting Data in API
        const ShortUrl = async(data)=>{
            try{
                const MiniUrl = await axios.post(`${Url}getMiniUrl`,data,{
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
                <img src="https://darvideo.tv/wp-content/uploads/2021/04/what-is-web-animation-1.jpg"></img>
            </div>
            <div className='FormCont'>
                <h4>Find already Shortened Url of the longer one.</h4>
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
                    
                    <Button type="submit" size="sm">Find MiniUrl</Button>
                    <hr></hr>
                </form>
                {miniUrl ? <p>Your Mini Url is <mark>{miniUrl}</mark></p>:""}
            </div>
        </div>
    </div>
    </BaseApp>
  )
}

export default FindMiniUrl