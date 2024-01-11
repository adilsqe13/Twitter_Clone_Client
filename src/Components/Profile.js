import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import './Styles/Profile.css';
import profileContext from '../CONTEXT/Context/profileContext';
import tweetContext from '../CONTEXT/Context/tweetContext';
import retweetContext from '../CONTEXT/Context/retweetContext';
import AllUserTweets from './AllUserTweets';


export default function Profile() {
  const userId = localStorage.getItem('userId');
  const context1 = useContext(profileContext);
  const context2 = useContext(tweetContext);
  const context3 = useContext(retweetContext);
  const { profile, userTweets, setPressEditProfileBtn } = context1;
  const { handleFollow } = context2;
  const { setHomeOpacity } = context3;

  const handleEditProfile = async () => {
    await setPressEditProfileBtn(true);
    await setHomeOpacity(0.8);
  }

  return (
    <>
      <div className="row position-sticky-0 bg-black z-index-90 ">
        <div className="col-1 dfjlac">
          <Link to='/home'><FontAwesomeIcon className='text-light' icon={faArrowLeft} /></Link>
        </div>
        <div className="col-11 px-4 py-1 ">
          <div className="row bolder fs-5 off-bright"> <span>{profile.name}</span></div>
          <div className="row text-secondary fs-6"> <span>{userTweets.length}  {userTweets.length > 1 ? 'Posts' : 'post'}</span></div>
        </div>
      </div>

      <div className="row h-125 bg-dark z-index-90 "></div>
      <div className="row h-125 z-index-90">
        <div className='col-4 position-relative'>
          {profile.length !== 0 ? <img className='rounded-circle vpi' width={143} height={143} src={require(`../images/${profile.image}`)} alt='img' />
            : 'loading'}
          <div className="row h-72 bg-dark"></div>
          <div className="row h-72 bg-transparent"></div>
        </div>
        <div className='col-8'>
          <div className="row h-72 bg-dark"></div>
          <div className="row h-72 bg-transparent">
            <div className="col-6"></div>
            <div className="col-6 dfjeac">
              {profile.length !== 0 && profile._id === userId ? <button onClick={() => { handleEditProfile() }} style={{ width: '110px', height: '35px' }} className='bg-transparent off-bright bolder rounded-5 border border-secondary fsa365'>Edit Profile</button>
                : <button onClick={() => { handleFollow(profile._id) }} style={{ width: '100px', height: '35px' }} className='bg-light text-dark bolder border-radius-15'>
                  {profile.length !== 0 ? profile.followers.length === 0 ? 'Follow' : profile.followers.includes(userId) ? 'Following' : 'Follow' : ''}
                </button>}
            </div>
          </div>
        </div>
      </div>

      <div className="row bg-black z-index-90 mt-4">
        <span className='fs-5 off-bright bolder px-3'>{profile.name}</span>
        <span className='text-secondary'>@{profile.username}</span>
      </div>

      <div className="row bg-black z-index-90 mt-3">
        {profile.length !== 0 ? <span className='text-secondary'><FontAwesomeIcon icon={faCalendarDays} /> &nbsp;Joined {profile.date.slice(0, 10)}</span> : ''}
      </div>

      <div className="row bg-black z-index-90 mt-2">
        <div className="col-4"><span className='text-secondary'><span className='text-light'>{profile.length !== 0 ? profile.following.length : 0} </span>Following</span></div>
        <div className="col-8"><span className='text-secondary'><span className='text-light'>{profile.length !== 0 ? profile.followers.length : 0} </span>Followers</span></div>
      </div>

      <div className="row bg-black z-index-90 mt-4 border-bottom border-secondary py-2">
        <span className='fs-5 off-bright bold px-3'>Posts</span>
      </div>

      {userTweets.length !== 0 ? <AllUserTweets /> : <div className='text-secondary dfjcac mt-3 pb-110'>No posts</div>}
    </>
  )
}
