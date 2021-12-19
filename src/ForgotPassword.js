import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from "react";
import { formValidationSchema, url1 } from "./App";

export function ForgotPassword() {

  const [message, setMessage] = useState(null);
  const { handleSubmit, handleChange, handleBlur, errors, touched, values } = useFormik(
    {
      initialValues: { email: '' },
      validationSchema: formValidationSchema,

      onSubmit: (values) => {

        fetch(`${url1}/forgotPassword`, {
          method: 'POST', body: JSON.stringify(values), headers: {
            'Content-Type': 'application/json'
          },
        }).then((data) => data.json())
          .then((data2) => setMessage(data2.message));

      }
    }
  );
  const messageStyle = { paddingLeft: '1rem', marginLeft: '35vw' };
  return <div>

    <form onSubmit={handleSubmit}>
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
        <Button type='submit' variant="contained">Submit</Button>
      </div>
    </form>


    {message ? <p style={messageStyle}>{message}</p> : ''}
  </div>;


}
