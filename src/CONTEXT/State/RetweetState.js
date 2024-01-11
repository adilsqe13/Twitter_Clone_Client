import React, { useState, useContext } from 'react';
import retweetContext from '../Context/retweetContext';
import tweetContext from '../Context/tweetContext';
import profileContext from '../Context/profileContext';

export default function ToastState(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const { allTweets, setAllTweets } = useContext(tweetContext);
  const { userTweets, setUserTweets } = useContext(profileContext);
  const [homeOpacity , setHomeOpacity] = useState(1);
  const [pressRetweetBtn , setPressRetweetBtn] = useState(false);
  const [tweetUser , setTweetUser] = useState('');
  const [tweet , setTweet] = useState('');

  //Click Retweet Button
  const clickRetweetBtn = async(tweetId) =>{
    try {
      const response = await fetch(`${apiUrl}/api/tweet/get-tweet-details/${tweetId}`, {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'auth-token' : token
        },
      });
      const result = await response.json();
      setTweetUser(result.user);
      setTweet(result.tweet);
      localStorage.setItem('retweetProfilePic', result.user.image);
    } catch (error) {
      console.log(error);
    }
  }

  //Retweet Repost
const retweetRepost = async (tweetId, retweetId) => {
    try {
        const response = await fetch(`${apiUrl}/api/retweet/retweet-repost`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body: JSON.stringify({tweetId, retweetId})
        });
        const json = await response.json();
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

//Delete Retweet
const deleteRetweet = async (tweetId, retweetId, index) => {
    try {
        const updatedAllTweets = await allTweets.map(tweet => {
            if (tweet._id === tweetId) {
              const updatedRetweetBy = tweet.RetweetBy.filter(retweet => retweet._id !== retweetId);
              return { ...tweet, RetweetBy: updatedRetweetBy };
            }
            return tweet;
          });
        const updatedUserTweets = await userTweets.map(tweet => {
            if (tweet._id === tweetId) {
              const updatedRetweetBy = tweet.RetweetBy.filter(retweet => retweet._id !== retweetId);
              return { ...tweet, RetweetBy: updatedRetweetBy };
            }
            return tweet;
          });
          setAllTweets(updatedAllTweets);
          setUserTweets(updatedUserTweets);

        await fetch(`${apiUrl}/api/retweet/delete-retweet`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body: JSON.stringify({ tweetId, retweetId })
        });
    } catch (error) {
        console.log(error);
    }
}



  return (
    <>
      <retweetContext.Provider value={{
        homeOpacity, 
        setHomeOpacity, 
        pressRetweetBtn, 
        setPressRetweetBtn, 
        clickRetweetBtn,
        tweetUser,
        tweet,
        retweetRepost,
        deleteRetweet
        }}>
        {props.children}
      </retweetContext.Provider>
    </>
  )
}
