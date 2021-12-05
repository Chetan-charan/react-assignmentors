import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';

export function Mentor({ name, students, id }) {
  
  const history = useHistory();
  const styles = {display : students.length>0 ? "block" : "none"}
    
  return <div className="details">
    <p>{name}</p>
    <p>{id}</p>
    <div style={styles}>
    <p>Students :</p>
    {students.map((stud) => <StudentList name={stud.name} key={stud._id} />)}
    </div>
    <Button type='submit' onClick={() =>  history.push("/add-students-to-mentor/"+id)
} variant="outlined">Add Students</Button>
  </div>;

}
function StudentList({ name }) {

  return <div>
    <p>{name}</p>
  </div>;

}
