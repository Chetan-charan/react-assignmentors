import { Switch, Route, useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router';
import './App.css';
import { Students } from "./Students";
import { Mentors } from "./Mentors";
import { AddStudent } from "./AddStudent";
import { AddMentor } from "./AddMentor";
import { ChangeMentor } from "./ChangeMentor";
import { AddNewMentor } from "./AddNewMentor";
import { AddStudents } from "./AddStudents";

function App() {
  const history = useHistory();


  

   return (<div className="App">
   <div>
      <AppBar style={{marginBottom:'24px'}} position="static">
  <Toolbar variant="dense">
  <Button onClick={()=> history.push('/') } variant="text" color='inherit'>Home</Button>
  <Button onClick={()=> history.push('/students') } variant="text" color='inherit'>STUDENTS</Button>
  <Button onClick={()=> history.push('/mentors') } variant="text" color='inherit'>MENTORS</Button>
  <Button onClick={()=> history.push('/addstudent') } variant="text" color='inherit'>ADD STUDENT</Button>
  <Button onClick={()=> history.push('/addMentor') } variant="text" color='inherit'>ADD MENTOR</Button>
  </Toolbar>
</AppBar>
       
      </div>
   
   <Switch>
    <Route path="/students">
      <Students/>
    </Route>
    <Route path="/mentors">
      <Mentors/>
    </Route>
    <Route path="/addstudent">
      <AddStudent/>
    </Route>
    <Route path="/addMentor">
      <AddMentor/>
    </Route>
    <Route path="/changeMentor/:id">
      <ChangeMentor/>
    </Route>
    <Route path="/addNewMentor/:id">
      <AddNewMentor/>
    </Route>
    <Route path="/add-students-to-mentor/:id">
      <AddStudents/>
    </Route>
    <Route path="/">
    <Redirect to='/students' />
    </Route>
   </Switch>

   
   </div>
   )
 
}

export default App;
