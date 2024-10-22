import React from 'react'

const Productform = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="p-3 text-lg outline-none border rounded-md focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Price"
          className="p-3 text-lg outline-none border rounded-md focus:border-blue-500"
        />
       
    
        <input
          type="text"
          placeholder="Description"
          className="p-3 text-lg outline-none border rounded-md focus:border-blue-500"
        />
        <button
          type="button"
          className="w-full p-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300">
          Upload
        </button>
      </form>
    </div>
  </div>
  )
}

export default Productform