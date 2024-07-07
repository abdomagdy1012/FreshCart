import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { useContext, useEffect } from 'react'
import { userContext } from '../../Context/UserContext'
import { Offline } from "react-detect-offline";

export default function Layout(){

    let {setUserToken} = useContext(userContext)
    useEffect(()=>{
        if(localStorage.getItem('userToken') != null){
            setUserToken(localStorage.getItem('userToken'))
        }
    },[])
   
    return <>
    <Navbar/>
        <Outlet></Outlet>

        <div className='network'>
        <Offline><i className='fas fa-wifi'></i> You are Offline</Offline>
        </div>
    <Footer/>
    </>
}