import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const API_URL = "https://b28-assign-mentor.herokuapp.com"

const formValidationSchema = yup.object({
    name: yup.string().min(4,'Minimum 4 characters required!!').required('required'),                 
    id: yup.string().required('required'),
  });

export function AddMentor() {

    const history = useHistory();

    const {handleSubmit,handleChange,handleBlur,errors,touched,values} = useFormik(    
        {initialValues: {name: '',id: ''},
        validationSchema: formValidationSchema,
        
        onSubmit: (values) => {
    
            fetch(`${API_URL}/mentors`,{method: 'POST',body: JSON.stringify(values),headers: {
              'Content-Type': 'application/json'
            },}).then(() => history.push('/mentors'));
          
        }
    })

    return <form onSubmit={handleSubmit}>
    <div className='add-fields'>

    <TextField   name='name'
    onBlur={handleBlur} 
    helperText={errors.name && touched.name && errors.name} 
    value={values.name}  
    error ={errors.name && touched.name}
    onChange={handleChange} 
    id="name" 
    label="name" 
    variant="standard" />
    
    <TextField name='id'  
    onBlur={handleBlur} 
    value={values.id}
    helperText={errors.id && touched.id && errors.id} 
    onChange={handleChange} 
    error={errors.id && touched.id}
    id="standard-basic"
    label='id'  
    variant="standard" />

    <Button type='submit' variant="outlined">Add Mentor</Button>
    </div>
    </form>

}
