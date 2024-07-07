import style from './NotFound.module.css'
import eRRor from '../../Assets/images/error.svg'

export default function NotFound(){
    return <>
    <div   className='d-flex justify-content-center' src={eRRor} alt="">
        <img x src={eRRor} alt="" />        
    </div>

    </>
}