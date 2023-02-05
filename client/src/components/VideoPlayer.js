import { Grid, Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { SocketContext } from '../SocketContent'

function VideoPlayer() {
 const {me,myVideo,userVideo,call,callAccepted,callEnded,name,setName,stream,answercall,leaveCall,calluser}=useContext(SocketContext)
    return (
           <Grid container spacing={2}>
             {/* own video */ }
                { stream && (
                  <Grid item xs={12} sm={6} md={6} >
                        <Paper>
                            <Typography variant="h5">{name || 'Name'}</Typography>
                            <video playsInline muted ref={myVideo} autoPlay />
                        </Paper>
                    </Grid>
            )}

           {/* Users video */}
            { callAccepted && !callEnded && (
                <Grid item xs={12} sm={6} md={6} >
                <Paper>
                    <Typography variant="h5">{call.name || 'Name' } </Typography>
                    <video playsInline ref={userVideo} autoPlay />
                </Paper>
            </Grid>
            )}
           

        </Grid>
    
  )
}

export default VideoPlayer