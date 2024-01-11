import React, { useState, useContext } from 'react';
import tweetContext from '../Context/tweetContext';
import profileContext from '../Context/profileContext';

export default function TweetState(props) {
  const context = useContext(profileContext);
  const { setUserTweets, userTweets } = context;
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [allTweets, setAllTweets] = useState([]);

//Get all Tweets
const getAllTweets = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/tweet/get-all-tweets', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });
        const json = await response.json();
        setAllTweets(json.reverse());
    } catch (error) {
        console.log(error);
    }
}

//Repost Tweet
const handleRepost = async (tweetId) => {
    try {
        await fetch(`http://localhost:5000/api/tweet/repost-tweet/${tweetId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
        });
    } catch (error) {
        console.log(error);
    }
}

//Follow - Unfollow
const handleFollow = async (followingId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/user/following/${followingId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
        });
        const json = await response.json();
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

//Delete Tweet
const handleDelete = async (tweetId, index) => {
    try {
        const updatedAllTweets = allTweets.filter((tweet, i) => i !== index);
        const updatedUserTweets = userTweets.filter((tweet, i) => i !== index);
        setAllTweets(updatedAllTweets);
        setUserTweets(updatedUserTweets);

        await fetch('http://localhost:5000/api/tweet/delete-tweet', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body: JSON.stringify({ tweetId }),
        });
    } catch (error) {
        console.log(error);
    }
}

//Hide Tweet
const handleHide = async (tweetId, index) => {
    const updatedAllTweets = allTweets.filter((tweet, i) => i !== index);
    const updatedUserTweets = userTweets.filter((tweet, i) => i !== index);
    setAllTweets(updatedAllTweets);
    setUserTweets(updatedUserTweets);
}

//Like a Tweet
const handleLike = async (tweetId, index) => {
    try {
        const tweet = allTweets.length>0 ? allTweets : userTweets .filter((tweet) => tweet._id === tweetId);
        const myId = await tweet[0].Likes.filter((id) => id === userId);
        if (myId.length === 0) {
            const updatedAllTweets = allTweets.map((obj, i) => {
                return {
                    ...obj,
                    Likes: i === index ? [...obj.Likes, userId] : obj.Likes
                };
            });
            const updatedUserTweets = userTweets.map((obj, i) => {
                return {
                    ...obj,
                    Likes: i === index ? [...obj.Likes, userId] : obj.Likes
                };
            });
            setAllTweets(updatedAllTweets);
            setUserTweets(updatedUserTweets);
        } else {
            const updatedAllTweets = allTweets.map((obj, i) => {
                return {
                    ...obj,
                    Likes: i === index ? obj.Likes.filter(id => id !== userId) : obj.Likes
                };
            });
            const updatedUserTweets = userTweets.map((obj, i) => {
                return {
                    ...obj,
                    Likes: i === index ? obj.Likes.filter(id => id !== userId) : obj.Likes
                };
            });
            setAllTweets(updatedAllTweets);
            setUserTweets(updatedUserTweets);
        }
        const response = await fetch(`http://localhost:5000/api/tweet/likeTweet/${tweetId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
        });
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }

}


  return (
    <>
      <tweetContext.Provider value={{
        getAllTweets,
        setAllTweets,
        allTweets,
        handleRepost,
        handleFollow,
        handleDelete,
        handleHide,
        handleLike
        }}>
        {props.children}
      </tweetContext.Provider>
    </>
  )
}
