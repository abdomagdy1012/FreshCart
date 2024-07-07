import style from './MainSlider.module.css'
import banner1 from '../../Assets/images/slider-image-3.jpeg'
import banner2 from '../../Assets/images/slider-image-2.jpeg'
import banner3 from '../../Assets/images/slider-image-1.jpeg'
import blog1 from '../../Assets/images/blog-img-2.jpeg'
import blog2 from '../../Assets/images/grocery-banner-2.jpeg'
import Slider from "react-slick";
export default function MainSlider(){

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    return <>

    <div className="row gx-0 py-4">
            <div className="col-md-9">
            <Slider {...settings}>
                <img className='w-100'  height={300} src={banner1} alt="" />
                <img className='w-100' height={300} src={banner2} alt="" />
                <img  className='w-100' height={300} src={banner3} alt="" />
            </Slider>
            </div>
            <div className="col-md-3">
            <img  className='w-100' height={150} src={blog1} alt="" />
            <img  className='w-100' height={150} src={blog2} alt="" />
            </div>
            
        </div>
    </>
}