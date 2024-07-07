import { useFormik } from 'formik'
import style from './Login.module.css'
import * as yup from 'yup'
import { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Bars } from 'react-loader-spinner'
import { userContext } from '../../Context/UserContext'

export default function Login(){
    let navigate = useNavigate();
    let {setUserToken} = useContext(userContext)

    const [error , setError] = useState(null)
    const [loading , setLoading] = useState(false)

   async function loginSubmit(values){
        setLoading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
        .catch((err)=>{
            setLoading(false)
            setError(err.response.data.message);
   })
        if(data.message === 'success'){
            setLoading(false)
            localStorage.setItem('userToken', data.token)
            setUserToken(data.token);
            navigate('/');
        }
    }

    let validationSchema = yup.object({
        email: yup.string().email('Email is invalid').required('Email is required'),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,'password must contain at least one uppercase , one lower cast , one special character and number')
        .min(8,"Password must be at least 8 characters")
        .required('Password is required')
    })

    let formik = useFormik({
        initialValues:{
            email:'',
            password:''
        }, validationSchema ,
        onSubmit: loginSubmit
    })
    return <>
        <div className='w-75 mx-auto py-4'>
            <h2>Login Now</h2>
                        {error ? <div className='alert alert-danger'>{error}</div> : '' } 
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email'/>
            {(formik.errors.email && formik.touched.email) ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}
            

            <label htmlFor="password ">Password: </label>
            <input className='form-control' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password ' name='password'/>
            {(formik.errors.password && formik.touched.password) ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}
            

            {loading ? <button className='btn bg-main text-white' type='button'><Bars height="30"width="80"color="white"ariaLabel="bars-loading" wrapperStyle={{}}wrapperClass=""visible={true}/> </button>
            :<>
            <button type='submit' className='btn bg-main text-white'>Login</button>
            <Link className='btn' to="/Register">Register Now</Link>
            </>}
            
        </form>
            
        </div>
        
    </>
}