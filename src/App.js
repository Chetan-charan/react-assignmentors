import { Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router';
import './App.css';
import { Login } from "./Login";
import { ActivateAccount } from "./ActivateAccount";
import { Signup } from "./Signup";
import { UserFiles } from "./UserFiles";
import * as yup from 'yup';
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";


export const url = 'https://google-drive-app.herokuapp.com'

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
    <Route path="/userFiles/:username">
      <UserFiles />
    </Route>
    <Route path="/forgotPassword">
      <ForgotPassword/>
    </Route>
    <Route path="/ResetPassword/:token">
      <ResetPassword/>
    </Route>
    <Route path="/">
    <Redirect to='/login' />
    </Route>
   </Switch>

   
   </div>
   )
 
}

export const formValidationSchema = yup.object({
  email: yup.string().email('Invalid email').min(4, 'Minimum 4 characters required!!').required('required'),
  
});

export default App;
