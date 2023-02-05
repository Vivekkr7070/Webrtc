import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext, useState } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard" ;
import { SocketContext } from '../SocketContent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CallEndIcon from '@mui/icons-material/CallEnd';
import PhoneIcon from '@mui/icons-material/Phone';


 function Options({children}) {
    const {me,myVideo,userVideo,call,callAccepted,callEnded,name,setName,stream,answercall,leaveCall,calluser}=useContext(SocketContext);
     const [idTocall,setidTocall]=useState(' ');

  return (
    <Container>
      <Paper>
        <form>
        <Grid container item>
            <Grid item xs={12} sm={12} md={6} lg={6}>
             <Typography>Account info</Typography>
             <TextField  label="name" value={name} onChange={(e)=>{setName(e.target.value)}} />
             <CopyToClipboard text={me}>
              <Button variant='contained' startIcon={<AssignmentIcon /> } >
              Copy your id
              </Button>
             </CopyToClipboard>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
             <Typography>Account info</Typography>
             <TextField  label="idTocall" value={idTocall} onChange={(e)=>{setidTocall(e.target.value)}} />
            {callAccepted && !callEnded ? (
           <Button startIcon={ <CallEndIcon /> } variant='contained' color='error' onClick={leaveCall}>
             End call
           </Button>
            ): (
        <Button startIcon={ <PhoneIcon /> } variant='contained' color="success" onClick={ () =>calluser(idTocall) }>
            Call
        </Button>
          )}
         </Grid>
        </Grid>
        </form>
        {children}
      </Paper>
      </Container>
  )
}
export default Options