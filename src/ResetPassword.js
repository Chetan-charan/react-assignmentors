import { useParams } from 'react-router';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from "react";
import { url1 } from "./App";

export function ResetPassword() {
  const history = useHistory();
  const { token } = useParams();

  const [message, setMessage] = useState(null);
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

        fetch(`${url1}/resetPassword/${token}`, {
          method: 'POST', body: JSON.stringify(values), headers: {
            'Content-Type': 'application/json'
          },
        }).then((data) => data.json())
          .then((data2) => setMessage(data2.message));

      }
    }
  );

  const messageStyle = { paddingLeft: '1rem', margin: '20px' };

  return <div className="login-form"> <form onSubmit={handleSubmit}>
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
        id="password"
        label='password'
        variant="standard" />

      <Button type='submit' variant="outlined">Reset Password</Button>

      {message ? <Button type='button' onClick={() => history.push("/login")} variant="outlined">Login</Button> : ''}
      {message ? <p style={messageStyle}>{message}</p> : ''}
    </div>
  </form>
    
  </div>;

}
