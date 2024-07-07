import { useContext } from 'react'
import style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
export default function Home(){


    return <>
    <div className="container">
        <MainSlider/>
        <CategorySlider/>
        <FeaturedProducts/>
    </div>       
    </>
}