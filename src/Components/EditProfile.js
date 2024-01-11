import React, { useContext, useState } from 'react';
import './Styles/Retweet.css';
import retweetContext from '../CONTEXT/Context/retweetContext';
import toastContext from '../CONTEXT/Context/toastContext';
import profileContext from '../CONTEXT/Context/profileContext';
import axios from 'axios';

export default function Retweet() {
    const context1 = useContext(toastContext);
    const context2 = useContext(retweetContext);
    const context3 = useContext(profileContext);
    const { showToast } = context1;
    const { setHomeOpacity } = context2;
    const { setPressEditProfileBtn, profile } = context3;
    const [userCredentials, setuserCredentials] = useState({ name: profile.name, bio: profile.bio, location: profile.location, dob: profile.dob });
    const [image, setImage] = useState(null);
    const token = localStorage.getItem('token');


    const onInputChange = (e) => {
        setImage(e.target.files[0]);
    }
    const onChange = (e) => {
        setuserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    const handleSave = async (e) => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", userCredentials.name);
        formData.append("location", userCredentials.location);
        formData.append("dob", userCredentials.dob);
        formData.append("bio", userCredentials.bio);


        await axios.put(
            "http://localhost:5000/api/user/edit-profile",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": token,
                },
            }
        )
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('userImage', response.data.image);
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
    return (
        <>
            <div className="container retweet-model">
                <div className="row py-2">
                    <div className="col-1">
                        <button onClick={() => { setPressEditProfileBtn(false); setHomeOpacity(1) }} type="button" className="close text-white border-0 fs-4" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="col-9 bolder fs-5 off-bright dfjlac">&nbsp; &nbsp;<span>Edit profile</span></div>
                    <div className="col-2 dfjcac"><button onClick={() => { handleSave() }} style={{ width: '70px', height: '35px' }} className='bg-light text-dark bolder border-radius-15'>Save</button></div>
                </div>

                <div className="row h-72 bg-dark z-index-90"></div>
                <div className="row h-151 z-index-90">
                    <div className='col-4 position-relative'>
                        <img className='rounded-circle epi' width={133} height={133} src={require(`../images/${profile.image}`)} alt='img' />
                        <div className="row h-72 bg-dark"></div>
                        <div className="row h-72 bg-black"></div>
                    </div>
                    <div className='col-8'>
                        <div className="row h-72 bg-dark"></div>
                        <div className="row h-72 bg-black">
                            <div className="col dfjeac"><input onChange={onInputChange} type="file" id="fileInput" accept="image/*" /></div>
                        </div>
                    </div>
                </div>

                <div className="container mt-3">
                    <div className="row text-secondary fs-6">Name</div>
                    <div className="row mt-1">
                        <input onChange={onChange} value={userCredentials.name} name='name' type="text" className='border border-secondary h-55 rounded-1 off-bright fs-5 bg-black' />
                    </div>
                    <div className="row text-secondary fs-6 mt-2">Bio</div>
                    <div className="row mt-1">
                        <textarea onChange={onChange} value={userCredentials.bio} name='bio' type="text" className=' resize-none border border-secondary h-101 rounded-1 off-bright fs-6 bg-black' />
                    </div>

                    <div className="row text-secondary fs-6 mt-2">Location</div>
                    <div className="row mt-1">
                        <input onChange={onChange} value={userCredentials.location} name='location' type="text" className='border border-secondary h-55 rounded-1 off-bright fs-5 bg-black' />
                    </div>

                    <div className="row text-secondary fs-6 mt-2">Date of birth</div>
                    <div className="row mt-1 mb-2">
                        <input className='bg-dark rounded-1 off-bright border border-secondary py-2' onChange={onChange} type="date" name='dob' value={userCredentials.dob} />
                    </div>
                </div>
            </div>
        </>
    )
}
