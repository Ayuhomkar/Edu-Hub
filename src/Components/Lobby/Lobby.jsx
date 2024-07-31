import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './lobby.css';
import { useSocket } from '../Context/SocketProvider';
import Doubts from '../assets/doubts1.svg';



function Lobby() {

    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');
    const subjects = ['Java',"Python",'HTML' ,'CSS' , "React","Cybersecurity" ,"Data Science","Other"]
    const socket = useSocket();
    // console.log(socket);
    const navigate = useNavigate();


    const handleSubmit = () => {
        console.log(`Email : ${email}`);
        console.log(`Room : ${room}`);
        socket.emit('room:join', { email, room });
    }


    const handleJoinRoom = useCallback((data) => {
        const { email, room } = data;
        console.log("Data From Handle Room");
        console.log(email, room);
        navigate(`/room/${room}`);

    }, [navigate])

    useEffect(() => {
        socket.on('room:join', handleJoinRoom);
        return () => {
            socket.off("room:join")
        }
    }, [socket, handleJoinRoom])



    const GetSubject = (val) =>{
        alert(`Confirm ${subjects[val]} ?`)
        const setSubject = document.getElementById('room');
        setSubject.value = val;
        setRoom(subjects[val]);
    }

    const goTOMAPS = () =>{
        navigate('/maps');
    }

    return (
        <div className='lobby'>
            <h1> Having Doubts in studies Connect With us anytime.. </h1>
            <h2>Get your question answerd by a call </h2>
            <div className="doubtform">
                <div className="join">
                    <div>
                        <h3>Enter Your Name</h3>
                        <input type="text" id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <h3>Subject</h3>
                        <input type="text" id='room' value={room} disabled onChange={(e) => { setRoom(e.target.value) }} /> <br />
                        <button onClick={() => { handleSubmit() }}>Request Call<i className="ri-phone-line"></i></button>
                        <h3>Select Subject</h3>
                        <div className="subjects">
                        {subjects.map((val,index)=>{
                            return(
                                <h3 onClick={()=>{GetSubject(index)}}>{val}</h3>
                            )
                        })}
                        </div>
                        
                    </div>
                  
                </div>
                <img src={Doubts} alt="" />
                <button id="buddies" style={{position:'absolute', top:'10%' ,right:'10%' ,}} onClick={goTOMAPS}><i class="ri-user-location-line" style={{color: 'aliceblue' , fontWeight:'500'}}></i>Find Buddies</button>
            </div>
        </div>
    )
}

export default Lobby