import React, { useContext, useEffect, useState } from 'react';
import TwitterLogoX from './TwitterLogoX';
import profileContext from '../CONTEXT/Context/profileContext';

export default function Navbar() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const { getProfile } = useContext(profileContext);
    const [userProfileImage, setUserProfileImage] = useState('');

    //Get User Details
    const getUser = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/user/get-a-user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            });
            const json = await response.json();
            setUserProfileImage(json[0].image);
        } catch (error) {
            console.log(error);
        }
    }
    //Logout
    const handleLogout = () => {
        localStorage.removeItem('token', 'retweetProfilePic', 'userId', 'profile-img', 'username');
        window.location.reload();
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-black position-sticky-0 z-index-100">
                <div className="container-fluid  p-0">
                    <div className="row w-100 m-0">
                        <div className="col-4 dfjlac">
                            <img className='rounded-circle' width={35} height={35} src={userProfileImage} alt='' />
                        </div>
                        <div className="col-4 dfjcac">
                            <a className="navbar-brand" href="/">
                                <TwitterLogoX width={25} height={25} />
                            </a>
                        </div>
                        <div className="col-4 dfjeac p-0">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav my-4">
                            <li className="nav-item rounded-2 border border-secondary mx-1 px-2">
                                <a className="nav-link off-bright" href="/home">
                                    <div className="row w-100">
                                        <div className="col-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                            </svg>
                                        </div>
                                        <div className="col-10 home px-3 dfjlac">
                                            <span className='bold'>Home</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item rounded-2 border border-secondary mx-1 px-2">
                                <a onClick={() => { getProfile(userId) }} className="nav-link off-bright" href="/profile">
                                    <div className="row w-100">
                                        <div className="col-2 p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                            </svg>
                                        </div>
                                        <div className="col-10 home px-3 dfjlac">
                                            <span className='bold'>Profile</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="nav-item rounded-2 border border-secondary mx-1 px-2">
                                <a onClick={() => { handleLogout() }} className="nav-link off-bright" href="/">
                                    <div className="row w-100">
                                        <div className="col-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right text-danger" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                            </svg>
                                        </div>
                                        <div className="col-10 home px-3 dfjlac">
                                            <span className='text-danger bold'>Logout</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
