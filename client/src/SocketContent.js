import React, { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io('ws://localhost:5000');

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState();
    const [me, setMe] = useState(null);
    const [call, setCall] = useState({})
    const [callAccepted, setcallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        const getUser = async() => {
            try {
                const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                // console.log(currentStream);
                setStream(currentStream)
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream
                }
             }
            catch (err) {
                console.log(err);
            }
        }
        getUser();

        socket.on('me', (id) => setMe(id));

        socket.on('calluser', ({ from, name:callerName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal })
        })
    });

    const answercall = () => {
        setcallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream })

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from });
        })
        peer.on("stream",(currentStream) => {
            userVideo.current.srcObject = currentStream;
        })
        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const calluser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        socket.on('callaccepted', (signal) => {
            setcallAccepted(true);
            peer.signal(signal);
        })
        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{ me, myVideo, userVideo, call, callAccepted, callEnded, name, setName, stream, answercall, leaveCall, calluser }}>
            {children}
        </SocketContext.Provider>
    );
}
export { ContextProvider, SocketContext };