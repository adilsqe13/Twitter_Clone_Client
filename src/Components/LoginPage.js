import React, { useState, useContext } from 'react';
import './Styles/LoginPage.css';
import TwitterLogoX from './TwitterLogoX';
import toastContext from '../CONTEXT/Context/toastContext';
import Spinner from './Spinner';

export default function LoginPage(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const context = useContext(toastContext);
    const { showToast } = context;
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
    const [processing, setProcessing] = useState(false);

    const handleLogin = async (e) => {
setProcessing(true);
        const response = await fetch(`${apiUrl}/api/auth/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: userCredentials.email, password: userCredentials.password })
        });

        try {
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                localStorage.setItem('userId', json.userId);
                localStorage.setItem('profile-img', json.image);
                localStorage.setItem('username', json.username);
                window.location.reload();
                setProcessing(false);
            } else {
                showToast('Invalid Credentials', 'error');
                setProcessing(false);
            }
        } catch (error) {
            console.log(error);
            setProcessing(false);
        }

    }
    const onChange = (e) => {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className="container login-model py-3 position-fixed">
                <div className="row py-2">
                    <div className="col-5">
                        <button onClick={() => { props.setPressLoginBtn(false); props.setHomeOpacity(1) }} type="button" className="close text-white border-0 fs-4" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="col-7 px-4">
                        <TwitterLogoX width={30} height={30} />
                    </div>
                </div>
                <div className="row">
                    <div className="col ">
                        <div className="row jn ">
                            <div className="col">
                                <h2 className='sitx'><span>Sign in to X</span></h2>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col d-flex justify-content-center ">
                            </div>
                        </div>
                        <div className=" row mt-1">
                            <div className="col d-flex justify-content-center">
                                <button className='signUpWithGA mt-4' href='/'>
                                    {/* Apple icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-apple pb-1" viewBox="0 0 16 16">
                                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                    </svg> Sign up with Apple</button>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-2">

                            </div>
                            <div className="col-8 horizontal-line px-4">
                                <span>or</span>
                            </div>
                            <div className="col-2">

                            </div>

                        </div>
                        <div className="row mt-3">
                            <div className="col d-flex justify-content-center">
                                <input onChange={onChange} value={userCredentials.email} type="email" id="userInput" className='rounded-2' autoComplete="username" name="email" placeholder="E-mail" />
                            </div>
                            <div className="col d-flex justify-content-center mt-2">
                                <input type='password' autoComplete="password" onChange={onChange} value={userCredentials.password}  id="userInput" className='rounded-2' name="password" placeholder="Password" />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col d-flex justify-content-center">
                                <button onClick={() => { handleLogin() }} className='signUpWithGA'>
                                { processing === true ? <Spinner height={25} width={25}/>:'Next'}
                                    </button>
                            </div>

                        </div>
                        <div className="row mt-3">
                            <div className="col d-flex justify-content-center">
                                <button className='signInBtn mt-2 text-white' href='/'>Forgot password?</button>
                            </div>

                        </div>

                        <div className="row mt-5">
                            <div className="col d-flex justify-content-left ">
                                <label className='dhaasu'>Don't have an account?<button onClick={() => { props.setPressSignupBtn(true); props.setHomeOpacity(0.8); props.setPressLoginBtn(false); }} href='/'>Sign up</button></label><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
