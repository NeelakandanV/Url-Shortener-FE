import React, { children } from 'react'
import { Nav } from 'react-bootstrap'

function  BaseApp({children}) {
  const UserId =sessionStorage.getItem("UserId")


  return (
    <div className='BaseParent'>
        <div className='MainTitle'>
            <h3>Mini-Url</h3>
            <p><b>Url Shortening Site</b></p>
        </div>
        <div className='NavCont'>
            <Nav className="justify-content-center">
             <Nav.Item>
               <Nav.Link href={`/FetchUrl/${UserId}`}>Dashboard</Nav.Link>
             </Nav.Item>
             <Nav.Item>
               <Nav.Link href="/CreateMiniUrl">Create MiniUrl</Nav.Link>
             </Nav.Item>
             <Nav.Item>
               <Nav.Link href="/getMiniUrl">Find MiniUrl</Nav.Link>
             </Nav.Item>
             <Nav.Item>
               <Nav.Link disabled>Delete Account</Nav.Link>
             </Nav.Item>
             <Nav.Item>
               <Nav.Link href="/users/" >Logout</Nav.Link>
             </Nav.Item>
            </Nav>
        </div>
        <div className='Content'>{children}</div>
        <div className='Footer'>
            <p>All Rights Reserved@2024</p>
        </div>
    </div>
  )
}

export default  BaseApp