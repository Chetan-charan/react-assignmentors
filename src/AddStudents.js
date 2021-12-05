import { useParams } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { useState,useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

export function AddStudents() {
    
    const [studentList,setStudentList] = useState(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        fetch("https://b28-assign-mentor.herokuapp.com/students")
          .then((data) => data.json())
          .then((data1) =>  setStudentList( data1.filter((student) => student.mentor === ""||student.mentor === undefined) ) );
        }, []);

 
      let selectedStudents = [];
      const handleChange = (event) => {

          if(event.target.checked){
            selectedStudents = [...selectedStudents, event.target.value];

          }
          else if(event.target.checked === false){
            const index = selectedStudents.indexOf(event.target.checked);
            selectedStudents.splice(index, 1);
        
          }
      
        } 

      return studentList ? <div className="add-students"><FormGroup>
             {studentList.map((student) => <FormControlLabel value={student.name} onChange={handleChange} control={<Checkbox  />} label={student.name} key={student.id} />) }
             </FormGroup>

             <Button type='submit' 
             onClick= {() =>  fetch(`https://b28-assign-mentor.herokuapp.com/mentors/add-multiple-students/${id}`,
             {
              method: 'PUT',body: JSON.stringify({ students:  selectedStudents}),
              headers:  { 'Content-Type': 'application/json'}
            ,})
            .then(() => history.push("/mentors"))
        } variant="outlined">Add Students</Button>

         </div> : "";
}
