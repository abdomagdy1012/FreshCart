import { useQuery } from 'react-query'
import style from './CategorySlider.module.css'
import axios from 'axios';
import Slider from "react-slick";

export default function CategorySlider(){

    function getCategorySlider(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let {data , isError , isLoading} = useQuery('CategorySlider' , getCategorySlider);
    console.log(data?.data.data)
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1
      };
    return <>
        <h4>Shop Popular Categories</h4>
        {data?.data.data ?  <div>
            <Slider {...settings}>
            {data?.data.data.map((category) => <img height={150}  src={category.image} alt=''/>)}
            </Slider>
        </div> :'' }
    </>
}