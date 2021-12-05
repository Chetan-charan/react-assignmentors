import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';


export function Student({ name, id, mentor }) {

  const history = useHistory();
  const styles = {height : "200px"};

  return <div style={styles} className="details">
    <p className="student-name">Name: {name}</p>
    <p className="student-id">Id: {id}</p>
    {mentor ? <p className="mentor-name">Mentor: {mentor} </p> : " "}
    <Button type='submit' onClick={() => {
        mentor ? history.push("/changeMentor/"+id) : history.push("/addNewMentor/"+id);
    }} variant="outlined">{mentor ? "Change" : "Add"}  Mentor</Button>
  </div>;

}
