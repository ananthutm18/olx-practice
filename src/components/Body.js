import React, { useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import userContext from '../utils/usecontext'
import NeedLogin from './NeedLogin'
import productContext from '../utils/productContext'
import Protected from '../utils/Protected'

const Body = () => {
    const[user,setUser]=useState("")
    const[neddlogin,setneedlogin]=useState(false)
    const [product,setProduct]=useState(null)
    const[isLoggedin,setLoggedIn]=useState(null)
    const [showproduct,setShowproduct]=useState([])


    const[search,setsearch]=useState("")
  return (
    <userContext.Provider value={{showproduct,setShowproduct,search,setsearch,product:product,setProduct,user:user,setUser,neddlogin:neddlogin,setneedlogin,isLoggedin:isLoggedin,setLoggedIn}}>
 <div>
    <Header/>
   { (neddlogin)&&<div>
        <NeedLogin/>
    </div>}
    
    <productContext.Provider value={{showproduct,setShowproduct,product:product,setProduct,search,setsearch}}>
    <Outlet/>
    </productContext.Provider>
 </div>
 </userContext.Provider>
  )
}

export default Body