import { Switch, Route, useHistory } from "react-router-dom";
import { Redirect } from 'react-router';
import './App.css';
import { Login } from "./Login";
import { ActivateAccount } from "./ActivateAccount";
import { Signup } from "./Signup";
// import { UserFiles } from "./UserFiles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as yup from 'yup';
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { AllUrls } from "./AllUrls";
import { URLShortener } from "./URLShortener";
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';

export const url1 = 'https://serene-cove-64204.herokuapp.com'


function App() {
  
  

   return (<div className="App">
       
   
   <Switch>
    <Route path="/login">
      <Login/>
    </Route>
    <Route path="/signup">
      <Signup/>
    </Route>
    <Route path="/activate/:token">
      <ActivateAccount/>
    </Route>
    <Route path="/forgotPassword">
      <ForgotPassword/>
    </Route>
    <Route path="/ResetPassword/:token">
      <ResetPassword/>
    </Route>
    <Route path="/urlStats">
      <URLStats/>
    </Route>
    <Route path='/urlShortener'>
      <URLShortener/>
    </Route>
    <Route path="/allUrls">
     <AllUrls/>
    </Route>
    <Route path="/">
    <Redirect to='/login' />
    </Route>
   </Switch>

   
   </div>
   )
 
}

export const formValidationSchema = yup.object({
  url: yup.string().url('Invalid url').min(4, 'Minimum 4 characters required!!').required('required'),
  
});

export function NavigationBar(){

  const history = useHistory();

  return <AppBar style={{marginBottom:'24px'}} position="static">
  <Toolbar variant="dense">
  <Button onClick={()=> history.push('/urlShortener') } variant="text" color='inherit'>Home</Button>
  <Button onClick={()=> history.push('/urlStats') } variant="text" color='inherit'>URL stats</Button>
  <Button onClick={()=> history.push('/urlShortener') } variant="text" color='inherit'>URL Shortener</Button>
  <Button onClick={()=> history.push('/allUrls') } variant="text" color='inherit'>All Urls</Button>
  <Button style={{marginLeft: 'auto'}}  onClick={()=>{ 
    history.push('/login');
    sessionStorage.removeItem('token');
   }  } variant="text" color='inherit'><LogoutIcon/></Button>
  </Toolbar>
</AppBar>

}


function URLStats(){

  const [dateAggregate,setDateAggregate] = useState(null);
  const [monthAggregate,setMonthAggregate] = useState(null);
 

  useEffect(() => {
   

      fetch("https://serene-cove-64204.herokuapp.com/Display/urlStats", {
        method : "GET",
        headers: {
          'x-auth-token': sessionStorage.getItem("token")
        },
      })
        .then((data) => data.json())
        .then((data2) => {

          setDateAggregate(data2.dateAggegate);
          setMonthAggregate(data2.monthAggregate);

        })
  

  },[])

console.log(monthAggregate)

return <div>
  <NavigationBar/>
  <h1 style={{ padding: '37px' }} >Dash Board</h1>
  {monthAggregate  ? <MonthStats monthAggregate = {monthAggregate[0].count} />  : '' }
  <h4 style={{ paddingLeft: '37px' }} >Day Wise URls Generated this Month : </h4>
  <div className="stats">
  { dateAggregate ? dateAggregate.map((date,index) =>  <Stats key={index} date={date._id} count={date.count} />  ) : '' }

  </div>
  
  </div>

}

function MonthStats({monthAggregate}){

  return <Card sx={{ width: '300px', marginLeft : '37px' ,marginTop : '30px' }}>
  <CardContent>
  <Typography variant="body2">
    Total Urls generated this month : 
    </Typography>
    <Typography variant="h5" component="div">
   
    {monthAggregate}
     
    </Typography>
  </CardContent>
 
</Card>

}

function Stats({date,count}){

  return <Card sx={{ width: '300px', marginLeft : '37px' }}>
  <CardContent>
    
  <Typography variant="body2">
    {date}
    </Typography>
  

    <Typography variant="h5" component="div">
    {count}
     
    </Typography>
  </CardContent>
 
</Card>

}

export default App;
