import axios from 'axios'
import React, { useEffect } from 'react'
import { Url } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


function UserVerification(){
    const {id,pin,token} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const verify = async()=>{
            try{
                const verifyUser = await axios.get(`${Url}users/verifyUser/${id}/${pin}/${token}`)
                toast.success(verifyUser.data.message)
                navigate("/users/")
            }
            catch(err){
                toast.error(`Already Verified or ${err.response.data.message}`)
                navigate("/users/")
            }
        }
        verify()
    },[])
    
  return (
    <div className='MainParent'></div>
  )
}

export default UserVerification