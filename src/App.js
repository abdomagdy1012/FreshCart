import { Toaster } from 'react-hot-toast';
import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import CounterContextProvider from './Context/Context';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';



let router = createBrowserRouter([
  {path:'', element:<Layout/> , children:[
    {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"Cart" , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"Products" , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:"Categories" , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"Brands" , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"ProductDetails/:id" , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:"Login" , element:<Login/>},
    {path:"Register" , element:<Register/>},
    {path:"*" , element:<NotFound/>},
  ]}
])


function App() {
  return <>
  <CartContextProvider>
    
  <UserContextProvider>
  <CounterContextProvider>
  <RouterProvider router={router}></RouterProvider>
  </CounterContextProvider>
  </UserContextProvider>
  <Toaster/>
  </CartContextProvider>

  
  
  </>
 
}

export default App;
