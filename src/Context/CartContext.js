import axios from "axios";
import { createContext } from "react";


export let CartContext = createContext();



export default function CartContextProvider(props){
    let headers = {
        token:localStorage.getItem('userToken')
    }

    function addToCart(id){
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`, 
        {
            productId:id
        },
    {
        headers:headers
    }).then((response) => response)
    .catch((err)=> err);
    }

    function getLoggedCart(){
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`, 
    {
        headers:headers
    }).then((response) => response)
    .catch((err)=> err);
    }
    
    function deleteProductCart(productId){
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, 
    {
        headers:headers
    }).then((response) => response)
    .catch((err)=> err);
    }
    function updateProductCart(productId , count){
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, 
    {
        count:count
    }, 
    {
        headers:headers
    }).then((response) => response)
    .catch((err)=> err);
    }

    return <CartContext.Provider value={{addToCart , getLoggedCart,deleteProductCart,updateProductCart}}>
        {props.children}
    </CartContext.Provider>
}