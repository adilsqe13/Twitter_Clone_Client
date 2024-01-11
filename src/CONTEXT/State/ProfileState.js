import React, { useEffect, useState } from 'react';
import profileContext from '../Context/profileContext';

export default function ToastState(props) {
    const token = localStorage.getItem('token');
    const [profile, setProfile] = useState([]);
    const [userTweets, setUserTweets] = useState([]);
    const [pressEditProfileBtn , setPressEditProfileBtn] = useState(false);

    const getProfile = async (userId) => {
        try {
            localStorage.setItem('profile-Id', userId);
            const response = await fetch(`http://localhost:5000/api/user/get-a-user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            });
            const json = await response.json();
            setProfile(json[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const getUserTweets = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tweet/get-user-tweets/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            });
            const json = await response.json();
            setUserTweets(json.reverse());
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const profileId = localStorage.getItem('profile-Id');
        getProfile(profileId);
        getUserTweets(profileId);
    }, []);



    return (
        <>
            <profileContext.Provider value={{
                getProfile,
                profile,
                userTweets,
                setUserTweets,
                setPressEditProfileBtn,
                pressEditProfileBtn

            }}>
                {props.children}
            </profileContext.Provider>
        </>
    )
}
