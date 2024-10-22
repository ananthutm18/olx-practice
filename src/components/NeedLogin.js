import React, { useContext } from 'react'
import userContext from '../utils/usecontext'
import { useNavigate } from 'react-router-dom'

const NeedLogin = () => {
    const navigate=useNavigate()
    const  user=useContext(userContext)
    const toggleneedLogin=()=>{
        user.setneedlogin(false)

    }

    const directLogin=()=>{
        user.setneedlogin(false)
        navigate("/login")
        
    }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 ">
    <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
      <div className="flex justify-center mb-6 relative">
        <div className='absolute top-0 right-0 your-button-styles cursor-pointer' onClick={toggleneedLogin}>❌</div>
        <img
          src="https://statics.olx.in/external/base/img/loginEntryPointFavorite.webp"
          alt="OLX Login"
          className="w-24 h-24"
        />
      </div>
      <h1 className="text-xl font-semibold mb-6 text-center">
        Close deal from the comfort <br /> of your home
      </h1>
      <form className="flex flex-col space-y-4">
        
       
        <button
          type="button"
          className="w-full p-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300"
         onClick={directLogin}>
          Login to sell your product
        </button>
      </form>
      
    </div>
  </div>
  )
}

export default NeedLogin