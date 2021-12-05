import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const formValidationSchema = yup.object({
    name: yup.string().min(4,'Minimum 4 characters required!!').required('required'),                 
    id: yup.string().required('required'),
    mentor: yup.string(),
  });
  
  const API_URL = "https://b28-assign-mentor.herokuapp.com"
export function AddStudent() {

    const history = useHistory();

    const {handleSubmit,handleChange,handleBlur,errors,touched,values} = useFormik(    
        {initialValues: {name: '',id: '',mentor: ''},
        validationSchema: formValidationSchema,
        
        onSubmit: (values) => {
          
    
            fetch(`${API_URL}/students`,{method: 'POST',body: JSON.stringify(values),headers: {
              'Content-Type': 'application/json'
            },}).then(() => history.push('/students'));
          
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

    <TextField  name='mentor' 
    onBlur={handleBlur}   
    value={values.mentor}
    helperText={errors.mentor && touched.mentor && errors.mentor}
    onChange={handleChange}
    error={errors.mentor && touched.mentor}
    id="standard-basic" 
    label="mentor" 
    variant="standard" />

    <Button type='submit' variant="outlined">Add Student</Button>
    </div>
    </form>

}
