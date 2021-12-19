import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from "react";
import { formValidationSchema } from "./Login";
import {  url1 } from "./App";

export function Signup() {

 
  const [message, setmessage] = useState(null);

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } = useFormik(
    {
      initialValues: { lastName: '', firstName: '', email: "", password: "" },
      validationSchema: formValidationSchema,

      onSubmit: (values) => {

        fetch(`${url1}/signup`, {
          method: 'POST', body: JSON.stringify(values), headers: {
            'Content-Type': 'application/json'
          },
        }).then((data) => data.json())
          .then((data2) => setmessage(data2.message));

      }
    });

  const styl = { padding: "20px", color: "green" };

  return <div> <form onSubmit={handleSubmit}>
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

      <TextField name='firstName'
        onBlur={handleBlur}
        value={values.firstName}
        helperText={errors.firstName && touched.firstName && errors.firstName}
        onChange={handleChange}
        error={errors.firstName && touched.firstName}
        id="standard-basic"
        label='firstName'
        variant="standard" />

      <TextField name='lastName'
        onBlur={handleBlur}
        value={values.lastName}
        helperText={errors.lastName && touched.lastName && errors.lastName}
        onChange={handleChange}
        error={errors.lastName && touched.lastName}
        id="standard-basic"
        label='lastName'
        variant="standard" />

      <TextField name='password'
        onBlur={handleBlur}
        value={values.password}
        type='password'
        helperText={errors.password && touched.password && errors.password}
        onChange={handleChange}
        error={errors.password && touched.password}
        id="standard-basic"
        label='password'
        variant="standard" />

      <Button type='submit' variant="outlined">Sign Up</Button>
    </div>
  </form>
    {message ? <p style={styl}>{message} </p> : ""}
  </div>;
}
