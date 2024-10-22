import './App.css';
import Body from './components/Body';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Card from './components/Card';
import Login from './components/Login';
import Container from './components/Container';
import Protected from './utils/Protected';
import Sellproducts from './components/Sellproducts';
import { useState } from 'react';
import Product from './components/Product';
function App() {

  
  return (
<RouterProvider router={appRouter}/> 
 );
}
const appRouter=createBrowserRouter([
  
  {
    path:"/",
    element:<Body/>,
    children:[
      {
        path:"/",
        //element:<Container/>
        element: <Protected/>,
        children:[{
          path:"/",
          element:<Container/>
        },
        {
          path:"/sellproduct",
          element:<Sellproducts/>
        },{
          path:"/product/:id",
          element:<Product/>
        }
      
      
      ]
      },
      {
      path:"/signup",
      element:<Card/>
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]
  }
])

export default App;
