import React, { useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function Navbar2() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('home');
    
        const handleLinkClick = (link) => {
            setActiveLink(link);
            window.scrollTo(0, 0);
          };

            // useEffect to update activeLink on route change
  useEffect(() => {
    const pathname = location.pathname.substring(1); // Removing leading '/'
    setActiveLink(pathname || 'home'); // Set 'home' as default if pathname is empty
  }, [location.pathname]);

    return (
        <div className=" position-sticky-50 bg-black z-index-91 bottom-thin-border mb-2 ">
            <div className="row second-navbar mt-1 ">
                <div className={`col-6 dfjcac home py-2 px-3 fs-5 `}><Link onClick={() => handleLinkClick('home')} to='/home' className={`text-decoration-none text-${activeLink === 'home'?'light':'secondary'}`}>Home</Link></div>
                <div className={`col-6 dfjcac home py-2 px-3 fs-5 `}><Link onClick={() => handleLinkClick('allUserList')} to='/allUserList' className={`text-decoration-none text-${activeLink === 'allUserList'?'light':'secondary'}`}>Who to follow</Link></div>
            </div>
        </div>
    )
}
