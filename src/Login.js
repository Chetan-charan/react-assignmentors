import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {  useEffect, useState } from "react";
import {  url } from "./App";



export function Login() {
  const history = useHistory();
  const [token, setToken] = useState(null);
  const formValidationSchema = yup.object({
    email: yup.string().min(4, 'Minimum 4 characters required!!').required('required'),
    password: yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.').required("required")
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } = useFormik(
    {
      initialValues: { email: '', password: '' },
      validationSchema: formValidationSchema,

      onSubmit: (values) => {

        fetch(`${url}/login`, {
          method: 'POST', body: JSON.stringify(values), headers: {
            'Content-Type': 'application/json'
          },
        }).then((data) => data.json())
          .then((data) => {
            setToken(data.token)
            localStorage.setItem("token", data.token)
          })
          }
          

      }
    );

    useEffect(() => {
      token ? history.push("/userFiles/"+values.email) : history.push("/login")
    },[token,history,values]);



  return <div className="login-form"  > <form onSubmit={handleSubmit}>
    <div className='add-fields'>

      <TextField name='email'
        onBlur={handleBlur}
        helperText={errors.email && touched.email && errors.email}
        value={values.email}
        error={errors.email && touched.email}
        onChange={handleChange}
        id="email"
        label="email"
        variant="standard" />



      <TextField name='password'
        onBlur={handleBlur}
        type='password'
        value={values.password}
        helperText={errors.password && touched.password && errors.password}
        onChange={handleChange}
        error={errors.password && touched.password}
        id="standard-basic"
        label='password'
        variant="standard" />

      <Button type='submit' variant="outlined">Login</Button>
      <Button type='button' onClick={() => history.push("/forgotPassword") } variant="outlined">Forgot Password</Button>
      <Button type='button' onClick={() => history.push("/signup") } variant="outlined">Sign Up</Button>
    </div>
  </form>
  
  </div>;
  
}
export const formValidationSchema = yup.object({
  email: yup.string().email('Invalid email').min(4, 'Minimum 4 characters required!!').required('required'),
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  password: yup.string().min(8, 'Minimum 8 characters required!!').required("required")
});
