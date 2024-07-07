import axios from 'axios'
import style from './FeaturedProducts.module.css'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';



export default function FeaturedProducts(){

    let {addToCart} = useContext(CartContext);
    
    async function productCart(productId){
        let response =  await addToCart(productId);
        if(response.data?.status === 'success'){
            toast.success('Product added successfully')
        }
        else{
            toast.error("Product failed to add")
        }
    }
    
    function featuredProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)   
    }
    let {isLoading , data , isError , isFetching} = useQuery('FeaturedProducts' , featuredProducts)
    console.log(data?.data.data);
    
    
    
    return <>
            {isLoading  ? <div className='d-flex justify-content-center w-100'><BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        /></div> 
        :
        <div className="container mt-3">
        <h2>FeaturedProducts</h2>
        <div className="row">
        {data?.data.data.map((product)=> <div key={product.id} className='col-md-2'>
            
            
            <div className='product cursor-pointer py-3 px-2'>
            <Link to={`/ProductDetails/${product.id}`}>
                <img className='w-100' src={product.imageCover} alt={product.title} /> 

                <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                <h3 className='h6'>{product.title.split(" ").slice(0,2).join(' ')}</h3>
                
                <div className='d-flex justify-content-between mt-3'>
                    <span>{product.price} EGB</span>

                    <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
                </div>
                </Link>
                <button onClick={()=> productCart(product.id)} className='btn bg-main text-white w-100 '>add to cart</button>

            </div>
        </div>
        )}
    </div>
    </div>}
    </>
}