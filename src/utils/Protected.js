import { Outlet,Navigate } from "react-router-dom";
import Container from "../components/Container";
import { useContext } from "react";
import userContext from "./usecontext";
const Protected=()=>{
    const islogged=useContext(userContext)
    const user=islogged.isLoggedin
    return user?<Outlet/>:<Navigate to="/login"/>
}
export default Protected