import React, { useState, useEffect } from 'react'
import LoginSignupBtn from './LoginSignupBtn';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import TwitterLogoX from './TwitterLogoX';
import Footer from './Footer';
import './Styles/Home.css';

export default function CoverPage() {
    const token = localStorage.getItem('token');
    const [pressLoginBtn, setPressLoginBtn] = useState(false);
    const [pressSignupBtn, setPressSignupBtn] = useState(false);
    const [homeOpacity, setHomeOpacity] = useState(1);

    const opacity = {
        opacity: `${homeOpacity}`
    }

    useEffect(() => {
        if (token) {
            setPressLoginBtn(false);
            setPressSignupBtn(false);
        }
    }, [token]);


    return (
        <>
            {pressSignupBtn && <SignupPage setPressSignupBtn={setPressSignupBtn} setPressLoginBtn={setPressLoginBtn} setHomeOpacity={setHomeOpacity} />}
            {pressLoginBtn && <LoginPage setPressLoginBtn={setPressLoginBtn} setPressSignupBtn={setPressSignupBtn} setHomeOpacity={setHomeOpacity} />}
            <div className="container-fluid bg-black auto-height" style={opacity}>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 big-logo">
                        <TwitterLogoX width={300} height={300} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-left small-logo mt-3">
                        <TwitterLogoX width={60} height={60} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="row heading">
                            <div className="col ">
                                <span className='fs-1 bolder'>Happening now</span>
                            </div>
                        </div>
                        <div className="row jn">
                            <div className="col">
                                <h2><span>Join today.</span></h2>
                            </div>
                        </div>
                        <div className="container p-0">
                            <LoginSignupBtn setPressLoginBtn={setPressLoginBtn} setPressSignupBtn={setPressSignupBtn} setHomeOpacity={setHomeOpacity} />
                        </div>
                    </div>
                </div>
                <div className="row footer dna500">
                    <Footer />
                </div>
            </div>
        </>
    )
}
