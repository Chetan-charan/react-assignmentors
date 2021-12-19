import { useParams } from 'react-router';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import {  url } from "./App";


export function UserFiles() {
  const token = localStorage.getItem("token");
  let [filesContent, setFilesContent] = useState(null);
  const { username } = useParams();
  const [refresh,setRefresh] = useState(false);
 

useEffect(() => {

    fetch(`${url}/userFiles/${username}`, {
      method: 'GET', body: JSON.stringify(), headers: {
        "x-auth-token": token,
      },
    }).then((data) => data.json())
      .then((data2) => setFilesContent(data2))
      .then(() => setRefresh(false));
    
  },[refresh,token,username]);

const [upload, setUpload] = useState("");

function handleChange(event) {
    setUpload(event.target.files[0]);
    console.log(event.target.files[0]);
       
  }

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append('image', upload);
    fetch(`${url}/upload/${username}`,
        {
            method: 'POST',
            body: formData, 
            
        })
        .then(() => setRefresh(!refresh))
        .catch((error) => {
            console.error('Error:', error);
        });
};

 
  return filesContent ? <div>
   <div className="All-files">
       {filesContent.map((file, index) => <FileContentView key={index} file={file.Key} LastModified={file.LastModified} token={token} />)} 
       </div>
    <div className="upload-files"> 
  
      <input onChange={handleChange} type="file" name="image"></input>
      <Button type='submit' onClick={handleSubmission} variant="contained">Upload</Button>
    
      </div>
  </div> : "";

}


function FileContentView({file,LastModified,token}){

   
   const[fileLink,setFileLink] = useState(null);
   const styles = { fontSize: '20px' }
   

   useEffect(() => {
    fetch(`${url}/download/${file}`)
    .then((data) => setFileLink(data.url))
   },[file,token]);

 

  return <div className="one-file">
    <div>
    <p style={styles}>{file}</p>
    <p>Last Modified: {LastModified} </p>
    <div className="btn-grp">
    <Button type='submit'   variant="outlined" size="small"><a className="downloada" rel="noopener noreferrer" target="_blank" href={fileLink}>Download</a></Button>
 
    </div>
    </div>
    
  </div>


}


// export function ViewFile(){
 
//  const [fileView,setFileView] = useState(null);
//  const { file } = useParams();

//  useEffect(() => {

//   fetch(`${url}/fileView/${file}`)
//     .then((response) => setFileView(response)); 

//  });

  

//   return <div>
//   <iframe  width="900" height="506" src={fileView} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//   </div>

// }