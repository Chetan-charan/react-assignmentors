import { useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';

export function ChangeMentor() {

    const { id } = useParams();
    const [mentor,setMentor] = useState("");
    const [mentorList,setMentorList] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetch("https://b28-assign-mentor.herokuapp.com/mentors")
          .then((data) => data.json())
          .then((data1) => setMentorList(data1));
    
      }, []);

      useEffect(() => {
        fetch(`https://b28-assign-mentor.herokuapp.com/students/${id}`)
          .then((data) => data.json())
          .then((data1) => setMentor(data1.mentor))
    
      },[id]);

      const handleChange = (event) => {
        setMentor(event.target.value);
      };  



    return mentorList && mentor  ? <div className="form-mentor"><FormControl sx={{ m: 1, minWidth: 120 }}>

    <InputLabel id="demo-simple-select-helper-label">Mentor</InputLabel>

    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={mentor}
      label="Mentor"
      onChange={handleChange}>
      
      { mentorList ? mentorList.map((ment,idx) => <MenuItem key={idx} value={ment.name}>{ment.name}</MenuItem> ) : ""}
      
      
    </Select>
    
  </FormControl> <Button type='submit' onClick={() => {
    fetch(`https://b28-assign-mentor.herokuapp.com/students/changementor/${id}`,
     {
         method: 'PUT',body: JSON.stringify({ mentor: mentor }),
         headers: 
         {
        'Content-Type': 'application/json'
         }
      ,})
    .then(() => history.push("/students"))
}} variant="outlined">Save Mentor</Button></div>
  
  : " ";

}




