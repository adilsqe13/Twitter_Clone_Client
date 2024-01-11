import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Styles/LoginPage.css';
import TwitterLogoX from './TwitterLogoX';
import toastContext from '../CONTEXT/Context/toastContext'

export default function SignupPage(props) {
    const context = useContext(toastContext);
    const { showToast } = context;
    const [createAccount, setCreateAccount] = useState(false);
    const [image, setImage] = useState(null);
    const [userCredentials, setuserCredentials] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        location: ''
    });

    const handleSignup = async (e) => {
        const apiUrl = process.env.REACT_APP_API_URL;

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'my-preset'); 
        formData.append('cloud_name', 'digcjdyd3');

        try {
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
            const public_id = await response.data.public_id;
            await axios.post(
                `${apiUrl}/api/auth/user/signup`,
                {
                    ...userCredentials,
                    imageUrl: response.data.secure_url,
                    public_id: public_id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then(response => {
                    if (response.data.success) {
                        localStorage.setItem('token', response.data.authToken);
                        localStorage.setItem('profile-img', response.data.image);
                        localStorage.setItem('userId', response.data.userId);
                        localStorage.setItem('username', response.data.username);
                        window.location.reload();
                    }
                })
                .catch(error => {
                    console.log(error);
                    showToast('Something went wrong', 'warn');
                })
        } catch (err) {
            console.log(err);
        }
    }

    const onChange = (e) => {
        setuserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }
    const onInputChange = (e) => {
        setImage(e.target.files[0]);
    }

    return (
        <>
            <div className="container login-model py-3">
                <div className="row py-2">
                    <div className="col-5">
                        <button onClick={() => { props.setPressSignupBtn(false); props.setHomeOpacity(1) }} type="button" className="close text-white border-0 fs-4" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="col-7 px-4">
                        <TwitterLogoX width={30} height={30} />
                    </div>
                </div>
                <div className="row">
                    <div className="col ">
                        <div className="row jn mt-2 ">
                            <div className="col">
                                <h2 className='sitx'><span>Join X today</span></h2>
                            </div>
                        </div>
                        {!createAccount ? <div>
                            <div className="row mt-4">
                                <div className="col d-flex justify-content-center ">
                                    <button onClick={() => { setCreateAccount(true) }} className='signUpWithGA'>
                                        {/* Google icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-google mb-1" viewBox="0 0 16 16">
                                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                        </svg> Sign up with Google</button>
                                </div>
                            </div>
                            <div className=" row mt-1">
                                <div className="col d-flex justify-content-center">
                                    <button onClick={() => { setCreateAccount(true) }} className='signUpWithGA mt-4'>
                                        {/* Apple icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-apple pb-1" viewBox="0 0 16 16">
                                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                        </svg> Sign up with Apple</button>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-2">

                                </div>
                                <div className="col-8 horizontal-line px-4">
                                    <span>or</span>
                                </div>
                                <div className="col-2">
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col d-flex justify-content-center">
                                    <button onClick={() => { setCreateAccount(true) }} className='createAccountBtn bg-white text-black' href='/'>Create account</button>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col d-flex justify-content-center">
                                    <p className='createAccountCotation w-50'>By signing up, you agree to the <a href='/'>Terms of Service</a> and <a href='/'>Privacy Policy</a>, including <a href='/'>Cookie Use</a>.</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col d-flex justify-content-left ">
                                    <label className='dhaasu'>Have an account already?<button onClick={() => { props.setPressSignupBtn(false); props.setHomeOpacity(0.8); props.setPressLoginBtn(true); }} href='/'>Login</button></label><br />
                                </div>
                            </div>
                        </div>
                            :
                            <div>
                                <div className="row mt-3">
                                    <div className="col d-flex justify-content-center">
                                        <input onChange={onChange} value={userCredentials.name} type="text" id="userInput" name="name" placeholder="Full Name" />
                                    </div>
                                    <div className="col d-flex justify-content-center">
                                        <input onChange={onChange} value={userCredentials.username} type="text" id="userInput" name="username" placeholder="Username" />
                                    </div>
                                    <div className="col d-flex justify-content-center">
                                        <input onChange={onChange} value={userCredentials.email} type="text" id="userInput" name="email" placeholder="E-mail" />
                                    </div>
                                    <div className="col d-flex justify-content-center">
                                        <input onChange={onChange} value={userCredentials.password} type="text" id="userInput" name="password" placeholder="Password" />
                                    </div>
                                    <div className="col d-flex justify-content-center">
                                        <input onChange={onChange} value={userCredentials.location} type="text" id="userInput" name="location" placeholder="Location" />
                                    </div>

                                    <div className="col d-flex justify-content-center mt-4">
                                        <h6 className='text-danger'>Profile picture :</h6> &nbsp; &nbsp; &nbsp;
                                        <input type="file" accept='image/*' onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col d-flex justify-content-center">
                                        <button onClick={() => { handleSignup() }} className='signUpWithGA' href='/'>Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

