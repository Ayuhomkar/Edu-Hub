import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from '../Services/peer';
import { useSocket } from "../Context/SocketProvider";
// import { useNavigate } from "react-router-dom";
import './room.css';
import './loader.css';


const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [userName , setUserName] = useState("Someone")
  const [remoteStream, setRemoteStream] = useState();
  const [visible , setVisible] = useState(true);



  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setUserName(email);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    // sendStreams();  // Trying ro join and send stream at same time 
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
      // sendStreams();  // Trying ro join and send stream at same time 
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
    if(visible){
    setVisible(false);
    const temp = document.getElementById('sendvideo');
    temp.style.display = 'none';
    }
  }, [myStream,visible]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);


  const handleEndCall = useCallback(async () => {
    try {
      await peer.close();
      setRemoteStream(null);
      if (myStream) { // Check if myStream exists before stopping it
        myStream.getTracks().forEach(track => track.stop());
        setMyStream(null);
      }
      socket.emit("call:ended", { to: remoteSocketId });
    } catch (error) {
      console.error("Error ending call:", error);
    }
  }, [socket, remoteSocketId, setRemoteStream, setMyStream, myStream]);



  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="room_main">
      {!remoteSocketId ? (<h1 >Waiting for someone to join the call</h1>) : (null)}
      {remoteSocketId  ? (<h2 id="status" style={{display:remoteStream?'none':'block'}}>{userName} joined the room , Start a Call by pressing green Button</h2>) : (<div id="page">
        <div id="container">
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="h3">loading</div>
        </div>
      </div>)}
      {myStream && <button onClick={sendStreams} id="sendvideo" className="endcall" style={{backgroundColor:'crimson',borderRadius:'50%' , zIndex:'99'}}>Connect</button>}
      {remoteSocketId && !myStream  && <button id='callup' onClick={handleCallUser}><svg xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 32 32" height="32" fill="none" className="svg-icon"><path stroke-width="2" stroke-linecap="round" stroke="#fff" fill-rule="evenodd" d="m24.8868 19.1288c-1.0274-.1308-2.036-.3815-3.0052-.7467-.7878-.29-1.6724-.1034-2.276.48-.797.8075-2.0493.9936-2.9664.3258-1.4484-1.055-2.7233-2.3295-3.7783-3.7776-.6681-.9168-.4819-2.1691.3255-2.9659.5728-.6019.7584-1.4748.4802-2.2577-.3987-.98875-.6792-2.02109-.8358-3.07557-.2043-1.03534-1.1138-1.7807-2.1694-1.77778h-3.18289c-.60654-.00074-1.18614.25037-1.60035.69334-.40152.44503-.59539 1.03943-.53345 1.63555.344 3.31056 1.47164 6.49166 3.28961 9.27986 1.64878 2.5904 3.84608 4.7872 6.43688 6.4356 2.7927 1.797 5.9636 2.9227 9.2644 3.289h.1778c.5409.0036 1.0626-.2 1.4581-.569.444-.406.6957-.9806.6935-1.5822v-3.1821c.0429-1.0763-.7171-2.0185-1.7782-2.2046z" clip-rule="evenodd"></path></svg></button>}
      {myStream && (
        <>
          {/* <h1>My Stream</h1> */}
          <ReactPlayer
            playing
            muted
            className="myStream"
            width="20vw"
            height="50vh"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          {/* <h1>Remote Stream</h1> */}
          <ReactPlayer
            playing
            //muted
            className="remoteStream react-player"
            width="70vw"
            height="88vh"
            url={remoteStream}
          />
          <button onClick={handleEndCall} className="endcall">End Call</button>
        </>
      )}
    </div>
  );
};

export default RoomPage;