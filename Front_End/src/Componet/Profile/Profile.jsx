import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Profile() {
    const id = localStorage.getItem("user");
    const [data, setData] = useState({}); // Initialize as an object

    useEffect(() => {
        axios.get(`http://localhost:2000/getuser/${id}`)
            .then(response => {
                setData(response.data.user || {}); // Ensure data is set correctly
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [id]);

    return (
        <div className='prof'>
            <h1>{data.name || 'User'}</h1>
            <div className="apply">

            {Array.isArray(data.applications) && data.applications.length > 0 ? (
                data.applications.map((app, index) => (
                    <div className='item' key={index}>
                    
                        <p style={{borderBottom:'solid 1px gray ', marginBottom:'10px'}} >Experience: {app.experience}</p>
                        <p>Description: {app.description}</p>
                    </div>
                ))
            ) : (
                <p>No applications found.</p>
            )}
            </div>
            <div className=''>
                <button className='' onClick={() => window.location.href = '/home'}>Home</button>
            </div>
        </div>
    );
}

export default Profile;