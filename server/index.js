const express=require("express");
const app=express();
const http=require('http');
const cors=require("cors");
const {Server}=require("socket.io");
app.use(cors());
port=5000;

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});

io.on("connection",(socket)=>{
    socket.emit('me',socket.id);

    socket.on("disconnect",()=>{
        socket.broadcast.emit("callEnded");
    });

     socket.on("calluser",({userToCall,signalData,from,name})=>{
     io.to(userToCall).emit("calluser",{signal:signalData ,from ,name})
     });

     socket.on("answercall",(data)=>{
        io.to(data.to).emit("callAccepted",data.signal)
     })
    
});

app.get("/",(req,res)=>{
    res.send("hello");
})

server.listen(port,()=>{
    console.log("Server is running on port no:"+port)
})

