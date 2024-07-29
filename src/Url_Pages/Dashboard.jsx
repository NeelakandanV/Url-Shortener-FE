import React, { useEffect, useState } from 'react'
import BaseApp from '../BaseApp/BaseApp'
import { Button, Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { Url } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

function FetchUrl() {
    const {id} = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const [urlData,setUrlData] = useState([]);

    // Logout 
    const logout = ()=>{
        sessionStorage.clear()
        toast.error("!Logged Out")
        navigate("/users/")
    }

    // For deleting a Url
    const delUrl = async(Url_id)=>{
        try{
            const response = await axios.delete(`${Url}delete/${Url_id}`,{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            })
            //console.log(response);
            toast.success(response.data.message)
            const UserId =sessionStorage.getItem("UserId")
            navigate(`/FetchUrl/${UserId}`)
        }
        catch(err){
            toast.error(err.response.data.message)
        }
    }

    //Getting Data
    const getUrlData = async()=>{
        try{
            const response = await axios.get(`${Url}FetchUrl/${id}`,{
                headers:{
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json" 
                }
            })
            const Details = await response.data.Created_Urls
            setUrlData(Details)
            toast.success("Data Fetched Successfully!")
        }
        catch(err){
            //console.log(err)
            toast.error("Unauthorized!")
            logout()
        }
      }
    
      //Finding Token
      useEffect(()=>{
          if(token){
            getUrlData()
          }
          else{
            logout()
          }
      },[])

  return (
    <BaseApp>
    <Table responsive striped bordered hover variant="dark">
        <thead>
            <tr>
                <td>Original Url</td>
                <td>Shortened Url</td>
                <td>Url Name</td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {urlData.map((ele,ind)=>(
                <tr key={ind}>
                    <td>{ele.Original_Url}</td>
                    <td>{ele.Short_Url}</td>
                    <td>{ele.UrlName ? ele.UrlName:""}</td>
                    <td><Button variant="primary" onClick={()=>navigate(`/UpdateUrl/${ele.Url_id}`)}>Update</Button></td>
                    <td><Button variant="danger" onClick={()=>delUrl(ele.Url_id)}>Delete</Button></td>
                </tr>
            ))}
        </tbody>
    </Table>
    </BaseApp>
  )
}

export default FetchUrl