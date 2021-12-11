import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState } from "react";


const url = 'http://localhost:9000'

export function ActivateAccount() {
  const { token } = useParams();
  const history = useHistory();
  const [message, setmessage] = useState(null);
  try {
    fetch(`${url}/activateAccount`, {
      method: 'POST', body: JSON.stringify({ token: token }), headers: {
        'Content-Type': 'application/json'
      },
    }).then((data) => data.json())
      .then((data2) => setmessage(data2.message));
  } catch (err) {
    console.log(err);
  }


  return <div>
    <p>{message} </p>
    <Button onClick={() => history.push("/login")} type='submit' variant="outlined">Login</Button>
  </div>;

}
