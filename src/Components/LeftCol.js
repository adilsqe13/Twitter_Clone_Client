import React, { useContext, useEffect, useState } from 'react';
import './Styles/LeftCol.css';
import TwitterLogoX from './TwitterLogoX';
import profileContext from '../CONTEXT/Context/profileContext';

export default function LeftCol() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const context = useContext(profileContext);
    const { getProfile } = context;

    // Get LoggedIn User
    const getUserProfile = async () => {
        const response = await fetch(`${apiUrl}/api/user/get-a-user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        });
        const json = await response.json();
        setProfileImage(json[0].image);
        setUsername(json[0].username);
    }


    // Logout
    const handleLogout = () => {
        localStorage.removeItem('token', 'retweetProfilePic', 'userId', 'username', 'profile-img');
        window.location.reload();
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <>
            {/* Left Col */}
            <div className="row position-sticky-10 z-index-100 bg-black">
                <div className="col p-left">
                    <TwitterLogoX height={27} width={27} />
                </div>
            </div>
            <div className="row position-fixed-55 bg-black min-width-25-100">
                <div className="col p-left">
                    <a className='side-bar-btn' href='/home'>
                        <div className="row side-bar-btn-style">
                            <div className="col-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                </svg>
                            </div>
                            <div className="col-10 home px-4 dna750">
                                <span>Home</span>
                            </div>
                        </div>
                    </a>

                    <a className='side-bar-btn' href='/'><div className="row side-bar-btn-style">
                        <div className="col-2 left-box-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-search pb-1" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                        <div className="col-10 left-box-menu px-4 dna750 ">
                            <span>Explore</span>
                        </div>
                    </div></a>

                    <a className='side-bar-btn' href='/'><div className="row side-bar-btn-style">
                        <div className="col-2 left-box-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-bell-fill pb-1" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                            </svg>
                        </div>
                        <div className="col-10 left-box-menu px-4 dna750 ">
                            <span>Notifications</span>
                        </div>
                    </div></a>

                    <a className='side-bar-btn' href='/'><div className="row side-bar-btn-style">
                        <div className="col-2 left-box-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" className="bi bi-envelope pb-1" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                            </svg>
                        </div>
                        <div className="col-10 left-box-menu px-4 dna750">
                            <span>Messages</span>
                        </div>
                    </div></a>

                    <a className='side-bar-btn' href='/'><div className="row side-bar-btn-style">
                        <div className="col-2 left-box-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-file-text pb-1" viewBox="0 0 16 16">
                                <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                            </svg>
                        </div>
                        <div className="col-10 left-box-menu px-4 dna750">
                            <span>Lists</span>
                        </div>
                    </div></a>

                    <a className='side-bar-btn' href='/allUserList'><div className="row side-bar-btn-style">
                        <div className="col-2 left-box-menu ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-people-fill pb-1" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                        </div>
                        <div className="col-10 left-box-menu px-4 dna750">
                            <span>Follow Users</span>
                        </div>
                    </div></a>

                    <a className='side-bar-btn' href='/'><div className="row side-bar-btn-style">
                        <div className="col-2 left-box-menu">
                            <TwitterLogoX height={25} width={25} />
                        </div>
                        <div className="col-10 left-box-menu px-4 dna750">
                            <span>Premium</span>
                        </div>
                    </div></a>

                    <a onClick={() => { getProfile(userId) }} className='side-bar-btn' href='/profile'><div className="row side-bar-btn-style">
                        <div className="col-2 left-box-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                        </div>
                        <div className="col-10 left-box-menu px-4 dna750">
                            <span>Profile</span>
                        </div>
                    </div></a>

                    <a className='side-bar-btn' href='/'><div className="row side-bar-btn-style min-width-100-50">
                        <div className="col-2 left-box-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                        </div>
                        <div className="col-10 left-box-menu px-4 dna750">
                            <span>More</span>
                        </div>
                    </div></a>

                    <div className="row mt-3 dna750 ">
                        <div className="col">
                            <button className='post-btn'>Post</button>
                        </div>
                    </div>
                    <div className="row mt-5 dna750">
                        <div className="col ">
                            <div className="row logout-btn">
                                <div className="col-3 ">
                                    <img className='rounded-circle ' width={45} height={45} src={profileImage} alt='' />
                                </div>
                                <div className="col-7">
                                    <div className="row">
                                        <div className="col d-flex justify-content-left"><a className='text-decoration-none' href='/home'><span className='text-light'>@{username}</span></a></div>
                                    </div>
                                    <div className="row">
                                        <a href='/' onClick={() => { handleLogout() }} className=" d-flex justify-content-left bg-transparent w-50 text-primary bold text-decoration-none">Logout</a>
                                    </div>
                                </div>
                                <div className="col-2 dna750">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots text-light" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-5 logout-icon'>
                        <div className="col">
                            <a href='/' onClick={() => { handleLogout() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right text-danger" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
