import Notification from "./components/Notification";
import Options from "./components/Options";
import VideoPlayer from "./components/VideoPlayer";
import {AppBar,Toolbar,Typography} from "@mui/material"
import {makeStyles} from "@mui/styles";

const useStyles =makeStyles((theme)=>({
  appBar:{
    borderRadius:15,
    margin:"30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width:'600px',
    border:"2px solid black",
    //   [theme.breakpoints.down('xs')]:{
    //   width:'90%'
    // },
  },
  image :{
    marginLeft:'15px'
  },
  wrapper :{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width:'100%',
  }
}))
function App() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar}  position="static" >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>Video chat</Typography>
          </Toolbar>
      </AppBar>
      <VideoPlayer />

      <Options>
        <Notification />
      </Options>

    </div>
  );
}

export default App;