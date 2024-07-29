import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();
    return(
        <div className='MainParent'>
            <div className="NoPage">
                <img src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"/><br/>
                <Button onClick={()=>navigate("/users/")}>{" "}Back to Login!</Button>
            </div>
        </div>
    );
}

export default ErrorPage