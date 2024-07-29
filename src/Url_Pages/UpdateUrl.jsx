import React, { useEffect } from 'react'
import BaseApp from '../BaseApp/BaseApp'
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Url } from '../App';

// Schema Validation
const UserSchemaValidation = yup.object({
    Original_Url:yup.string().required("Url required!"),
})

function UpdateUrl() {
    const navigate = useNavigate();
    const {id} = useParams();
    const token = sessionStorage.getItem('token');
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
                const MiniUrl = await axios.put(`${Url}UpdateUrl/${id}`,data,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                toast.success(MiniUrl.data.message)
                const UserId =sessionStorage.getItem("UserId")
                navigate(`/FetchUrl/${UserId}`)
            }
            catch(err){
                console.log(err)
                toast.error(err.response.data.message)
            }
        }

  return (
    <BaseApp>
        <div className='MainParent'>
        <div className='LoginCont'>
            <div className='ImageCont'>
                <img src="https://loughtec.com/wp-content/uploads/2020/09/Update-Your-Systems.jpg"></img>
            </div>
            <div className='FormCont'>
                <h4>Update the Original Url for the same MiniUrl.</h4>
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
                    
                    <Button type="submit" size="sm">Update New Url</Button>
                    <hr></hr>
                </form>
            </div>
        </div>
    </div>
    </BaseApp>
  )
}

export default UpdateUrl