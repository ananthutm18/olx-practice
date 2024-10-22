import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({product}) => {
  const navigate=useNavigate()
  const handleClk=(id)=>{
    navigate("/product/"+id)

  }
  return (
   <div className='rounded-md shadow-md relative' onClick={()=>{
    handleClk(product.id)
   }}>
    <div className="w-full h-64 bg-white rounded-md shadow-md"> 
    <img src={product.image} className="w-full h-full object-contain" alt={product.title} /> 
   
  </div>
  <h1 className="text-xl font-bold mb-2">₹{product.price}</h1>
      <h4 className="text-lg">{product.title}</h4> 
      <h5 className="text-sm">{product.address}</h5> 
      <p className="text-sm  absolute bottom-0 right-0">{product.dateposted}</p> {/* Title */}

      

  </div>
  )
}

export default Card