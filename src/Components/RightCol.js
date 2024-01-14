import React, { useState, useEffect, useContext } from 'react';
import './Styles/RightCol.css';
import profileContext from '../CONTEXT/Context/profileContext';

export default function RightCol() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { getProfile } = useContext(profileContext);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [allUsers, setAllUsers] = useState([]);

    //Get All Users
    const getAllUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/user/get-all-users`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const json = await response.json();
            setAllUsers(json);
        } catch (error) {
            console.log(error);
        }
    }

    //Follow - Unfollow
    const handleFollow = async (followingId, index) => {
        try {
            const user = allUsers.filter((user) => user._id === followingId);
            const myId = await user[0].followers.filter((id) => id === userId);
            if (myId.length === 0) {
                const updatedUsers = allUsers.map((obj, i) => {
                    return {
                        ...obj,
                        followers: i === index ? [...obj.followers, userId] : obj.followers
                    };
                });
                setAllUsers(updatedUsers);
            } else {
                const updatedUsers = allUsers.map((obj, i) => {
                    return {
                        ...obj,
                        followers: i === index ? obj.followers.filter(id => id !== userId) : obj.followers
                    };
                });
                setAllUsers(updatedUsers);
            }
            const response = await fetch(`${apiUrl}/api/user/following/${followingId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
            });
            const json = await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);
    return (
        <>
            <div className="row position-sticky-0 bg-black">
                <div className="col">
                    <div className="form-outline mt-2" data-mdb-input-init>
                        <input type="search" id="form1" className=" search-box border-0" placeholder='Search' />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div className='subscribe-section border-0'>
                        <h5 className='bolder'>Subscribe to Premium</h5>
                        <p>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
                        <p><button className='subscribe-btn mt-3'>Subscribe</button></p>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col ">
                    <div className='pumf border-0 hv-100'>
                        <h5 className='bolder'>Who to follow</h5>
                        {allUsers.map((item, index) => {
                            return (
                                <div key={index} className="row mt-3 bg-black p-2 rounded-4">
                                    <div className="col-3 dfjcac">
                                        <img className='rounded-circle ' width={45} height={45} src={item.image} alt='' />
                                    </div>
                                    <div className="col-5">
                                        <a onClick={() => { getProfile(item._id) }} href='/profile' className='text-decoration-none text-light'><div className="row bold">{item.name}</div></a>
                                        <div className="row bold text-secondary">@{item.username}</div>
                                    </div>
                                    <div className="col-4 dfjcac">
                                        <button disabled={item._id === userId} onClick={() => { handleFollow(item._id, index) }} style={{ width: '100px', height: '35px' }} className='bg-light text-dark bolder border-radius-15'>
                                            {item._id === userId ? <span>You</span> : item.followers.length === 0 ? 'Follow' : item.followers.includes(userId) ? 'Following' : 'Follow'}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
