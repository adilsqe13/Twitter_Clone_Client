import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import LeftCol from './LeftCol';
import Profile from "./Profile";
import Home from "./Home";
import RightCol from './RightCol';
import Retweet from './Retweet';
import EditProfile from './EditProfile';
import AllUserList from './AllUserList';
import retweetContext from '../CONTEXT/Context/retweetContext';
import profileContext from '../CONTEXT/Context/profileContext';

export default function MainPage(props) {
    const context1 = useContext(retweetContext);
    const context2 = useContext(profileContext);
    const { pressRetweetBtn, homeOpacity } = context1;
    const { pressEditProfileBtn } = context2;

    const opacity = {
        opacity: `${homeOpacity}`
    }
    return (
        <>
            {pressRetweetBtn && <Retweet />}
            {pressEditProfileBtn && <EditProfile />}
            <div className="container-fluid bg-black pb-110 auto-height " style={opacity}>
                <div className="row ">
                    <Navbar />
                    <BrowserRouter>
                    <Navbar2/>
                        <div className="col-3 right-thin-border dna575 bg-black"><LeftCol /></div>
                        <div className="col-lg-5 col-md-9 col-sm-9 wa375 ">
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/home' element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/allUserList" element={<AllUserList />} />
                            </Routes>
                        </div>
                        <div className="col-4 left-thin-border dna991 hv-100 position-fixed-0-right"><RightCol /></div>
                    </BrowserRouter>
                </div>
            </div>
        </>
    )
}
