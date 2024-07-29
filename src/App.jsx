import { createBrowserRouter as Router , RouterProvider } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './User_Pages/Login';
import Signup from './User_Pages/Signup';
import VerifyUser from './User_Pages/VerifyUser';
import UserVerification from './User_Pages/UserVerification';
import ForgotPassword from './User_Pages/ForgotPassword';
import ResetPassword from './User_Pages/ResetPassword';
import ErrorPage from './User_Pages/ErrorPage';
import BaseApp from './BaseApp/BaseApp';
import CreateMiniUrl from './Url_Pages/CreateMiniUrl';
import FetchUrl from './Url_Pages/Dashboard';
import FindMiniUrl from './Url_Pages/FindMiniUrl';
import UpdateUrl from './Url_Pages/UpdateUrl';
export const Url = "https://miniurl-noru.onrender.com/";


const routes = Router([
  {
    path:"/users/",
    element:<Login/>
  },{
    path:"/users/Signup",
    element:<Signup/>
  },{
    path:"/users/UserVerification",
    element:<VerifyUser/>
  },{
    path:"/users/verifyUser/:id/:pin/:token",
    element:<UserVerification/>
  },{
    path:"/users/ForgotPassword",
    element:<ForgotPassword/>
  },{
    path:"/users/ResetPassword/:id/:pin/:token",
    element:<ResetPassword/>
  },{
    path:"/FetchUrl/:id",
    element:<FetchUrl/>
  },{
    path:"/CreateMiniUrl",
    element:<CreateMiniUrl/>
  },{
    path:"/getMiniUrl",
    element:<FindMiniUrl/>
  },{
    path:"/UpdateUrl/:id",
    element:<UpdateUrl/>
  },{
    path:"*",
    element:<ErrorPage/>
  }
])

function App() {

  return (
    <>
    <RouterProvider router={routes}/>
    <ToastContainer/>
    </>
  )
}

export default App