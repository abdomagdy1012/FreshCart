import style from './Register.module.css'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner'

export default function Register(){

    let navigate = useNavigate();
    const [error , setError] = useState(null);
    const [loading, setLoading] = useState(false)

    async function registerSubmit(values){
        setLoading(true)
        let {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
        .catch((err)=>{
            setLoading(false)
            setError(err.response.data.message)
        })
    if(data.message === 'success'){
        setLoading(false)
        navigate('/login')
    }
    }

    // function validate(values){
    // let errors = {}

    // if(!values.name){
    //     errors.name = 'name is required';
    // }
    // else if (values.name.length < 3){
    //     errors.name = 'name minlength is 3';
    // }
    // else if(values.name.length >10)
    // {
    //     errors.name = 'name maxlength is 10';
    // }
    // return errors
    // }
    let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    let validationSchema = yup.object({
        name: yup.string().max(15,'name maxlength is 15').min(4,'name minlength is 4').required('name is required'),
        email:  yup.string().email('email is invalid').required('email is required'),
        password: yup.string().min(8,'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,'password must contain at least one uppercase , one lower cast , one special character and number'  )
        .required('password is required') ,
        rePassword: yup.string().oneOf([yup.ref('password'),null],'Passwords must match')
        .required('Confirm Password'),
        phone: yup.string().matches(phoneRegExp,'phone is invalid').required('phone is required').min(8, "phone min 8"),
    })

    let formik = useFormik({
        initialValues:{
            name: '',
            email:'',
            password:'',
            rePassword:'',
            phone:'',
        }, validationSchema ,
        onSubmit:registerSubmit
    })
    return <>
        <div className='w-75 mx-auto py-4'>
            {error !=null ? <div className='alert alert-danger'>{error}</div>: ''}
            
            <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} type="name" name="name" id="name" />
            {formik.errors.name && formik.touched.name ? <div  className='alert alert-danger mt-2 p-2'>{formik.errors.name}</div>: '' }
            

            <label htmlFor="email">Email: </label>
            <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" />
            {formik.errors.email && formik.touched.email ? <div  className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>: '' }


            <label htmlFor="password">Password: </label>
            <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div> : ''}

            <label htmlFor="repassword">Repassword: </label>
            <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="rePassword" id="repassword" />
            {formik.errors.rePassword && formik.touched.rePassword ? <div  className='alert alert-danger mt-2 p-2'>{formik.errors.rePassword}</div>: '' }

            <label htmlFor="Phone">Phone: </label>
            <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} type="phone" name="phone" id="Phone" />
            {formik.errors.phone && formik.touched.phone ? <div  className='alert alert-danger mt-2 p-2'>{formik.errors.phone}</div>: '' }


            {loading ?<button className='btn bg-main text-white' type='button'><Bars height="30"width="80"color="white"ariaLabel="bars-loading" wrapperStyle={{}}wrapperClass=""visible={true}/> </button> :
            <button disabled={!(formik.isValid &&formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}        
            
        </form>
        </div>
        
    </>
}