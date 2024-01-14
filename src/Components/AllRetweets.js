import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import tweetContext from '../CONTEXT/Context/tweetContext';
import retweetContext from '../CONTEXT/Context/retweetContext';
import profileContext from '../CONTEXT/Context/profileContext';

export default function AllRetweets(props) {
    const userId = localStorage.getItem('userId');
    const context1 = useContext(tweetContext);
    const context2 = useContext(retweetContext);
    const context3 = useContext(profileContext);
    const { tweet } = props;
    const retweets = [...tweet.RetweetBy].reverse();
    const { handleFollow } = context1;
    const { retweetRepost, deleteRetweet } = context2;
    const { getProfile } = context3;

    return (
        <>
            {tweet.RetweetBy.length === 0 ? <h6 className='dfjcac text-secondary mt-3'>No Retweets</h6> : retweets.map((item, index) => {
                return (
                    <div key={index} className="container px-0 my-4  ">
                        <div className="row ">
                            <div className="col-1"><img className='rounded-circle ' width={40} height={40} src={item.profileImage} alt='' /></div>
                            <div className="col-10 rwfsmsc rwfbsc bold fs-5 pl-575 retweets-bg-clr rounded-top ">
                                <div className="row"><a onClick={() => { getProfile(item.userId) }} className='text-decoration-none text-light' href='/profile'><span className='text-black bolder fs-6'>{item.name}&nbsp;<span className='text-secondary fs-6'>@{item.username}</span></span></a></div>
                                <div className="row"><span className='text-dark fs-6'>Replying to&nbsp;<a onClick={() => { getProfile(tweet.userId) }} href='/profile' className='text-primary bolder text-decoration-none'>@{tweet.username}</a></span></div>
                            </div>

                            <div className="col-1 bold fs-5 dfjcat">
                                <div className="dropdown">

                                    <FontAwesomeIcon className='dropdown-toggle text-dark' data-bs-toggle="dropdown" icon={faEllipsis} />
                                    <ul className="dropdown-menu bg-black py-0 box-shadow-light">
                                        {item.userId === userId && <li><button onClick={() => { deleteRetweet(tweet._id, item._id, index) }} className="dropdown-item text-danger post-dropdown bolder">Delete Retweet</button></li>}
                                        <li><a href='/home' onClick={() => { retweetRepost(tweet._id, item._id) }} className="dropdown-item text-light post-dropdown bolder">Repost</a></li>
                                        {item.userId !== userId && <li><button onClick={() => { handleFollow(item.userId) }} className="dropdown-item text-light post-dropdown bolder">Follow/Unfollow</button></li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className=" text-black bold margin-auto mt-0" >
                            <div className="row">
                                <div className="col-1"></div>
                                <div className=" py-1 rwfsmsc rwfbsc retweets-bg-clr col-10 pl-min-575 pl-max-575">
                                    <p className="fs-6 px-2 mt-1 ">{item.content}</p>
                                </div>
                                <div className="col-1"></div>
                            </div>
                            <div className="row">
                                <div className="col-1"></div>
                                <div className="col-10 retweets-bg-clr rwfsmsc rwfbsc py-2" >
                                    {item.image && <img className=' rounded-3' width={150} height={200} src={`${process.env.REACT_APP_CLOUDINARY_API}/q_40/v${item.image}/${item.public_id}.jpg`} alt='' />}
                                </div>
                                <div className="col-1"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10 rwfsmsc rwfbsc">
                                <div className="row  pb-1 retweets-bg-clr rounded-bottom">
                                    {/* Retweet */}
                                    <div className='col-4 dfjcac'>
                                        <button className='bg-transparent border-0 text-dark' title='Retweet'> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894m-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                        </svg> 0</button>
                                    </div>

                                    {/* Repost */}
                                    <div className='col-4 dfjcac'>
                                        <a href='/home' onClick={() => { retweetRepost(tweet._id, item._id) }} className='bg-transparent border-0 text-dark text-decoration-none' title='Repost'> <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
                                        </svg> {item.RepostBy.length}</a>
                                    </div>

                                    {/* Like a post */}
                                    <div className='col-4 dfjcac'>
                                        <button className='bg-transparent border-0 text-dark' title='Like'> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                        </svg> 0</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                )
            })}

        </>
    )
}
