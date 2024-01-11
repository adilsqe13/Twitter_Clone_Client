import React, { useState, useContext, useEffect } from 'react';
import './Styles/Home.css';
import axios from 'axios';
import toastContext from '../CONTEXT/Context/toastContext';
import retweetContext from '../CONTEXT/Context/retweetContext';
import tweetContext from '../CONTEXT/Context/tweetContext';
import profileContext from '../CONTEXT/Context/profileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import AllRetweets from './AllRetweets';


export default function Home() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const context1 = useContext(toastContext);
    const context2 = useContext(retweetContext);
    const context3 = useContext(tweetContext);
    const context4 = useContext(profileContext);
    const { showToast } = context1;
    const { clickRetweetBtn, setPressRetweetBtn, setHomeOpacity } = context2;
    const { getAllTweets, allTweets, handleRepost, handleFollow, handleDelete, handleHide, handleLike } = context3;
    const { getProfile, profile } = context4;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const profileImage = localStorage.getItem('profile-img');
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');
    const [tweetIndex, setTweetIndex] = useState('');

    const onInputChange = (e) => {
        setImage(e.target.files[0]);
    }
    const onChange = (e) => {
        setContent(e.target.value);
    }

    const handlePost = async (e) => {
        // If POST including image
        if (image !== null) {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'my-preset');
            formData.append('cloud_name', 'digcjdyd3');
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/digcjdyd3/image/upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        // setUploadPercent(percentCompleted + '%')
                        console.log(percentCompleted);
                    },
                }
            );

            //  localStorage.setItem('userImage', response.data.secure_url);
            //  localStorage.setItem('profile-img', response.data.secure_url);
            await axios.post(
                `${apiUrl}/api/tweet/post-tweet`,
                {
                    content: content,
                    imageUrl: await response.data.secure_url,
                    public_id: await response.data.public_id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token
                    },
                }
            )
                .then(response => {
                    if (response.data.success) {
                        window.location.reload();
                    } else {
                        showToast('Something went wrong', 'danger');
                    }
                })
                .catch(error => {
                    console.log(error);
                    showToast('Something went wrong', 'warn');
                })

            // If POST not including image
        } else {
            await axios.post(
                `${apiUrl}/api/tweet/post-tweet`,
                {
                    content: content,
                    imageUrl:image,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            )
                .then(response => {
                    if (response.data.success) {
                        //  localStorage.setItem('userImage', response.data.image);
                        window.location.reload();
                    } else {
                        showToast('Something went wrong', 'danger');
                    }
                })
                .catch(error => {
                    console.log(error);
                    showToast('Something went wrong', 'warn');
                })
        }

    }
    // const handlePost = async () => {
    //     const formData = new FormData();
    //     formData.append("image", image);
    //     formData.append("content", content);
    //     formData.append("username", profile.username);
    //     formData.append("profileImage", profile.image);

    // await axios.post(
    //     `${apiUrl}/api/tweet/post-tweet`,
    //     formData,
    //     {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //             "auth-token": token
    //         },
    //     }
    // )
    //         .then(response => {
    //             if (response.data.success) {
    //                 window.location.reload();
    //             } else {
    //                 showToast('Something went wrong', 'warn');
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             showToast('Something went wrong', 'warn');
    //         })
    // }

    const handleRetweet = async (tweetId) => {
        await clickRetweetBtn(tweetId);
        setPressRetweetBtn(true);
        setHomeOpacity(0.8);
    }

    useEffect(() => {
        getAllTweets();
        getProfile(userId);
    }, []);
    return (
        <>
            <div className="row position-sticky-0 bg-black z-index-90 border-bottom border-secondary">
                <div className="col home py-3 px-3">
                    <span>Home</span>
                </div>
            </div>
            <div className="row  py-4 border-bottom border-secondary">
                <div className="col-lg-2 d-flex justify-content-center">
                    <img className='rounded-circle ' width={55} height={55} src={profileImage} alt='img' />
                </div>
                <div className="col-lg-10">
                    <div className="row">
                        <div className="col">
                            <input onChange={onChange} value={content} name='tweet' type="text" className='input-post' placeholder='What is happening?!' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mt-4">
                            <div className="row">
                                <div className="col"><input onChange={onInputChange} type="file" id="fileInput" accept="image/*" /></div>
                                <div className="col d-flex justify-content-end"><button disabled={content === '' && image === null} onClick={() => { handlePost() }} className='post'>Post</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {allTweets.length === 0 ? <div className='text-secondary dfjcac mt-4 pb-296'>No tweets</div> : allTweets.map((item, index) => {
                return (
                    <div key={index} className="container mt-4">
                        <div className="row p-2">
                            <div className="col-lg-2"><img className='rounded-circle' width={45} height={45} src={item.userImage} alt='img' /></div>
                            <div className="col-lg-9 bold fs-5">
                                <div className="row"><a onClick={() => { getProfile(item.userId) }} className='text-decoration-none text-light' href='/profile'><span>{item.name}&nbsp;<span className='text-secondary fs-6'>@{item.username}</span></span></a></div>
                                <div className="row"><span className='fs-6 text-secondary bold-100'>Posted on {item.date.slice(0, 10)}</span></div>
                            </div>
                            <div className="col-lg-1 bold fs-5 dfjeac">
                                <div className="dropdown">

                                    <FontAwesomeIcon className='dropdown-toggle text-secondary cursor-pointer' data-bs-toggle="dropdown" icon={faEllipsis} />
                                    <ul className="dropdown-menu bg-black py-0 box-shadow-light">
                                        {item.userId === userId && <li><button onClick={() => { handleDelete(item._id, index) }} className="dropdown-item text-danger post-dropdown bolder">Delete Post</button></li>}
                                        <li><a onClick={() => { handleRepost(item._id) }} href='/home' className="dropdown-item text-light post-dropdown bolder">Repost</a></li>
                                        <li><a className='text-decoration-none' href='/profile'><button onClick={() => { getProfile(item.userId) }} className="dropdown-item text-light post-dropdown bolder">Profile</button></a></li>
                                        {item.userId !== userId && <li><button onClick={() => { handleFollow(item.userId) }} className="dropdown-item text-light post-dropdown bolder">Follow/Unfollow</button></li>}
                                        <li><button onClick={() => { handleHide(item._id, index) }} className="dropdown-item text-light post-dropdown bolder">Hide post</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-transparent text-light margin-auto" style={{ "width": "70%" }}>
                            <div className="card-body">
                                <p className="card-text fs-5">{item.content}</p>
                            </div>
                            {item.image && <img className='card-img-top rounded-3' src={item.image} alt='img' />}
                        </div>
                        <div className="row mt-2">

                            {/* Retweet */}
                            <div className='col-4 dfjcac'>
                                <div className="col-lg-1 bold fs-5 dfjeac">
                                    <div className="dropdown">
                                        <button data-bs-toggle="dropdown" className='bg-transparent border-0 wx-10 text-secondary' title='Retweet'> <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894m-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                        </svg> <span className='fs-6'>{item.RetweetBy.length}</span></button>
                                        <ul className="dropdown-menu bg-black py-0 box-shadow-light">
                                            <li><button onClick={() => { handleRetweet(item._id); }} className="dropdown-item text-light post-dropdown bolder">Retweet</button></li>
                                            <li><button onClick={() => { setTweetIndex(index) }} className="dropdown-item text-light post-dropdown bolder">View</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Repost */}
                            <div className='col-4 dfjcac'>
                                <a href='/home' onClick={() => { handleRepost(item._id) }} className='wx-10 bg-transparent border-0 text-secondary text-decoration-none' title='Repost'> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
                                </svg> {item.RepostBy.length}</a>
                            </div>

                            {/* Like a post */}
                            <div className='col-4 dfjcac'>
                                {item.Likes.length === 0 ?
                                    <button className='wx-10 bg-transparent border-0 text-secondary' onClick={() => { handleLike(item._id, index) }} title='Like'> <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg> {item.Likes.length}</button>
                                    :
                                    <button className='bg-transparent border-0 text-secondary' onClick={() => { handleLike(item._id, index) }} title={item.Likes.filter((id) => id === userId).length !== 0 ? 'Dislike' : 'Like'}> <svg style={{ color: `${item.Likes.filter((id) => id === userId).length !== 0 ? 'red' : ''}` }} xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg> {item.Likes.length}</button>
                                }
                            </div>
                        </div>
                        <hr />
                        {tweetIndex !== '' ? index === tweetIndex ? <AllRetweets tweet={allTweets[tweetIndex]} /> : '' : ''}
                    </div>
                )
            })}
        </>
    )
}
