import React, { useState, useEffect } from "react"
import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import axios from 'axios';
import * as L from 'leaflet';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';



function GetMaps() {
    const [getLocation, setLocation] = useState(null);
    const [center, setCenter] = useState([0, 0]);
    const [nearByUsers, setNearbyUsers] = useState(['Chinmay', 'Ayusha', 'Vaishnavi', 'Chinmay', 'Ayusha', 'Vaishnavi', 'Chinmay', 'Ayusha', 'Vaishnavi'])
    const [getCoord , setCoord] = useState(null);


    useEffect(() => {
        async function getData(){
            const CollectionData = await axios.get('http://localhost:8000/nearByUsers')
            const data = CollectionData.data;
            setCoord(data);
            console.log("Long Lat Get : ")
            console.log(data);
        }
        getData();
      }, []);

    const handleLocationChange = (e) => {
        const loc = e.target.value;
        setLocation(loc);
    }

    const latLong = async () => {
        const loc = document.getElementById('location');
        const data = loc.value;
        console.log("cjancjnjnajncjncjnajcbjbcabchbhcvhjvcjavcjvacv")
        console.log(getCoord)
        if (data.length !== null) {
            await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${getLocation}&country=india`, {
                headers: {
                    'X-Api-Key': 'lLHBQHMjPVAddlu2PEH1Ug==zF4Ox2g6instKmFb'
                }
            }).then((data) => {
                const res = data.data[0];
                // setLat(res.latitude);
                // setLong(res.longitude);
                setCenter([res.latitude, res.longitude]);
                console.log(center);
            })

        }
        else {
            alert("Must Enter a value")
        }
    }


    function MyMapComponent() {
        const map = useMap()
        console.log('map center:', map.getCenter())
        useEffect(() => {
            map.setView(center, map.getZoom());
        }, [map]);
        return (
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        )
    }

    const coordinates = [
        [18.531428, 73.8544541],
        [18.521428, 73.8544541],
        [18.541428, 73.8544541],
    ];

    const customIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [20, 30],
        iconAnchor: [25, 50],
    });

    return (
        <div className="mapsPage">
            <h1>Find Your Nearby Study Buddies </h1>
            <h2>Gather For Planed Group Studies</h2>
            <div className="getinfo">


                <input type="text" placeholder="Location" required value={getLocation} onChange={handleLocationChange} id="location" />

                <button onClick={latLong} id="getloc">
                    Get Buddies
                </button>
            </div>
            <div className="maps">
                <div className="friends">
                    <h2>Get To Know Your Nearby Friends</h2>
                    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }} className="userList">
                        {
                            nearByUsers.map((e) => (
                                <>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1715966966827-25a227141ee9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={e}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Experties
                                                    </Typography>
                                                    {" — Java , C++ , DSA"}
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        <i class="ri-message-2-fill" style={{ marginLeft: '50%', fontSize: '25px', cursor: 'pointer', color: 'gray' }}></i>
                                                    </Typography>

                                                </React.Fragment>
                                            }

                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </>
                            ))
                        }
                    </List>
                </div>
                <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: "450px", width: "50%", borderRadius: '20px', marginRight: '5%' }} >
                    <MyMapComponent />
                    {getCoord && getCoord.map((e) => (
                        <Marker position={[e.latitude , e.longitude]} icon={customIcon}>
                            <Popup>
                                <Stack direction="row" spacing={1}>
                                    <Chip
                                        avatar={<Avatar alt="Natacha" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhY2V8ZW58MHx8MHx8fDA%3D" />}
                                        label={e.userName}
                                        variant="outlined"
                                    />
                                </Stack>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="groupStudies">
                <h1>Next Group Study Sessions Arrenged At </h1>
            </div>
        </div>
    )
}

export default GetMaps