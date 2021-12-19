import * as yup from 'yup';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { url1, NavigationBar } from "./App";

export function URLShortener() {
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const formValidationSchema = yup.object({
    url: yup.string().required('required'),
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } = useFormik(
    {
      initialValues: { url: '' },
      validationSchema: formValidationSchema,

      onSubmit: (values) => {

        fetch(`${url1}/generateUrl`, {
          method: 'POST', body: JSON.stringify(values), headers: {
            'Content-Type': 'application/json',
            'x-auth-token': sessionStorage.getItem("token")
          },
        }).then((data) => data.json())
          .then((data2) => {
            setGeneratedUrl(data2.shortenedUrl);
          });
      }
    }
  );

  return <div> <NavigationBar /> <div className="login-form"> <form onSubmit={handleSubmit}>
    <div className='add-fields'>

      <TextField name='url'
        onBlur={handleBlur}
        helperText={errors.url && touched.url && errors.url}
        value={values.url}
        error={errors.url && touched.url}
        onChange={handleChange}
        id="url"
        label="Enter url"
        variant="standard" />

      <Button type='submit' variant="outlined">GENERATE URL</Button>
    </div>
  </form>
  </div>
    {generatedUrl ? <p style={{ color: 'green', marginLeft: '500px',marginTop: '30px' }}> URL Generated : {generatedUrl}</p> : ''}
  </div>;

}
