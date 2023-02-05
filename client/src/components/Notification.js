import { Button, Card, Grid } from '@mui/material';
import React, { useContext } from 'react'
import { SocketContext } from '../SocketContent'

function Notification() {
const {answercall ,call,callAccepted}=useContext(SocketContext);
  return (
       <>
       {call.isReceivedCall && !callAccepted && (
        <Card>
            <Grid> {call.name} is calling  </Grid>
            <Button variant='contained' color='primary' onclick={answercall}>
              Answer call
            </Button>
        </Card>
        )}
        </>
  )
}

export default Notification