import React, { useContext, useState, useEffect } from 'react';
import './Styles/Retweet.css';
import retweetContext from '../CONTEXT/Context/retweetContext';
import axios from 'axios';
import toastContext from '../CONTEXT/Context/toastContext';
import profileContext from '../CONTEXT/Context/profileContext';
import Spinner from './Spinner';


export default function Retweet() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const context1 = useContext(toastContext);
    const context2 = useContext(retweetContext);
    const context3 = useContext(profileContext);
    const { showToast } = context1;
    const { setPressRetweetBtn, setHomeOpacity, tweetUser, tweet } = context2;
    const { getProfile, profile } = context3;
    const retweetProfilePic = localStorage.getItem('retweetProfilePic');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [processing, setProcessing] = useState(false);
    const [uploadPercent, setUploadPercent] = useState('');


    const onInputChange = (e) => {
        setImage(e.target.files[0]);
    }
    const onChange = (e) => {
        setContent(e.target.value);
    }

const handleReply = async () => {
    setProcessing(true);
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
                    setUploadPercent(percentCompleted + '%')
                    
                },
            }
        );
        await axios.post(
            `${apiUrl}/api/tweet/retweet`,
            {
                content: content,
                imageUrl:  response.data.version,
                public_id: response.data.public_id,
                tweetId: tweet._id,
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
                    setProcessing(false);
                } else {
                    setProcessing(false);
                    showToast('Something went wrong', 'danger');
                }
            })
            .catch(error => {
                console.log(error);
                setProcessing(false);
                showToast('Something went wrong', 'warn');
            })

        // If POST not including image
    } else {
        await axios.post(
            `${apiUrl}/api/tweet/retweet`,
            {
                content: content,
                imageUrl: image,
                tweetId: tweet._id,
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
                    window.location.reload();
                    setProcessing(false);
                } else {
                    showToast('Something went wrong', 'danger');
                    setProcessing(false);
                }
            })
            .catch(error => {
                console.log(error);
                setProcessing(false);
                showToast('Something went wrong', 'warn');
            })
    }
}

useEffect(()=>{
    getProfile(userId);
},[]);

    return (
        <>
            <div className="container retweet-model">
                <div className="row py-2">
                    <div className="col-5">
                        <button onClick={() => { setPressRetweetBtn(false); setHomeOpacity(1) }} type="button" className="close text-white border-0 fs-4" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div className="row mt-3 bg-black p-2 rounded-4">
                    <div className="col-3 dfjcac">
                        <img className='rounded-circle ' width={55} height={55} src={retweetProfilePic} alt='' />
                    </div>
                    <div className="col-9">
                        <div className="row bold">{tweetUser.name}</div>
                        <div className="row bold text-secondary">@{tweetUser.username}</div>
                    </div>
                </div>

                <div className="row bg-black p-2 rounded-4">
                    <div className="col-3 dfjcac"></div>
                    <div className="col-9">
                        <span className='text-light fs-5'>{tweet.content}</span>
                    </div>
                </div>

                <div className="row mt-3 bg-black p-2 rounded-4">
                    <div className="col-3 dfjcac"></div>
                    <div className="col-9">
                        <span className='text-secondary'>Replying to&nbsp;<span className='text-info'>@{tweetUser.username}</span></span>
                    </div>
                </div>

                <div className="row  py-4">
                    <div className="col-3 d-flex justify-content-center">
                        <img className='rounded-circle ' width={55} height={55} src={profile.image} alt='' />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col">
                                <textarea  onChange={onChange} value={content} name='tweet' type="text" className=' resize-none border-0 off-bright  input-tweet-text' placeholder='Post your reply' />
                                <div className="col-10 mt-3"><input onChange={onInputChange} type="file" id="fileInput" accept="image/*" /></div>
                                <div className="col d-flex justify-content-end">
                                <span className='px-2 dfjcac text-danger'>{uploadPercent}</span><button disabled={ content === '' && image === null} onClick={() => { handleReply() }} className='reply'>
                                    { processing === true ? <Spinner height={25} width={25}/>:'Reply'}
                                        </button>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
