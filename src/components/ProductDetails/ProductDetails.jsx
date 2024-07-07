import axios from 'axios'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';

export default function ProductDetails(){
    
    let param = useParams();

    function getProductDetails(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    let {isError , data , isLoading} = useQuery('ProductDetails' , ()=> getProductDetails(param.id) );

    console.log(data?.data.data)
    
    return <>
    {data?.data.data ? 
        <div className="row align-items-center">
            <div className="col-md-4">
                <img src={data?.data.data.imageCover} className='w-100' alt={data?.data.data.title} />
            </div>
            <div className="col-md-8 ">
                <h4 >{data?.data.data.title}</h4>
                <p className='mx-2 fw-lighter'>{data?.data.data.description}</p>

                <span className='fw-bold'>{data?.data.data.category.name}</span>

                <div  className='d-flex justify-content-between py-3'>
                <span>{data?.data.data.price} EGB</span>
                <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
                </div>
                <button className='btn bg-main text-white w-100'>Add to Cart </button>
            </div>
        </div>
    : ''}
    </>
}