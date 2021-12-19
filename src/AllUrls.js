import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavigationBar } from "./App";


export function AllUrls() {

  const [Allurls, SetAllUrls] = useState(null);

  useEffect(() => {

    fetch("https://serene-cove-64204.herokuapp.com/Display/getAllUrls",{
        method : "GET",
        headers: {
          'x-auth-token': sessionStorage.getItem("token")
        },
      })
      .then((data) => data.json())
      .then((data2) => SetAllUrls(data2));

  });


  return <div>
    <NavigationBar />
    {Allurls ? <TableContainer component={Paper} style={{   }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>

            <TableCell style={{fontWeight : 'bold'}}> FULL URL</TableCell>
            <TableCell style={{fontWeight : 'bold'}}>Shortened URL</TableCell>
            <TableCell style={{fontWeight : 'bold'}}>CLICKS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Allurls.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.urlFull}</TableCell>
              <TableCell component="th" scope="row">
              <a style={{ textDecoration : 'none' }} target="_blank"  rel="noreferrer" href={row.shortenedUrl} underline="hover">
              {row.shortenedUrl}
                </a>
              </TableCell>
              <TableCell align="center">{row.clicks ? row.clicks : 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> : " "}

  </div>;

}
