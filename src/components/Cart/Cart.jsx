import { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import { BallTriangle } from 'react-loader-spinner'

export default function Cart(){
    let{getLoggedCart , deleteProductCart ,updateProductCart} = useContext(CartContext); 

    const [cartDetails, setCartDetails] = useState(null)

    async function getCart(){
        let {data} = await getLoggedCart()
        setCartDetails(data);
    }
    async function removeProductCart(id){
        let {data} = await deleteProductCart(id)
        setCartDetails(data);
    }
    async function updateitemCart(id , count){
        let {data} = await updateProductCart(id ,count)
        setCartDetails(data);
    }


    useEffect(()=>{
        getCart();
    },[])
    return <> { cartDetails?  <div className="w-75 mt-4 px-4 py-3 mx-auto bg-main-light">
    <h2 className=''>Shop Cart:</h2>
    <h4 className=' text-main mb-4'>Total card Price: {cartDetails.data.totalCartPrice} EGP</h4>
    {cartDetails.data.products.map((product) => <div key={product.product.id} className='row border-bottom py-2 px-2'>
        <div className="col-md-1">
            <img className='w-100' src={product.product.imageCover} alt="" />
        </div>
        <div className="col-md-11">
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h6 > {product.product.title}</h6>
                    <h6 className='text-main'>Price: {product.price} EGP</h6>
                </div>
                <div>
                    <button onClick={()=> updateitemCart(product.product.id , product.count+1)} className=' brdr-main p-1'>+</button>
                    <span className='mx-2'>{product.count}</span>
                    <button onClick={()=> updateitemCart(product.product.id , product.count-1)} className='brdr-main p-1'>-</button>
                </div>
                
            </div>
            <button onClick={()=> removeProductCart(product.product.id)} className='btn p-0 '><i className='text-danger fas fa-trash-can'></i>  Remove</button>
        </div>
    </div>)}

    </div> : <div className='d-flex justify-content-center w-100'>
    <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
        </div>}
</>
}