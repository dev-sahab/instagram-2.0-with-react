import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Keyboard, Pagination, Navigation } from "swiper";

//images
import logo from "../../img/instagram.svg";
import home from "../../img/home.svg";
import search from "../../img/search.svg";
import explore from "../../img/explore.svg";
import reals from "../../img/reels.svg";
import message from "../../img/message.svg";
import notification from "../../img/notification.svg";
import create from "../../img/create_post.svg";
import profileImg from "../../img/shahab.jpg";
import moreMenu from "../../img/more.svg";
import story1 from "../../img/story1.jpg";
import story2 from "../../img/story2.jpg";
import story3 from "../../img/story3.jpg";
import story4 from "../../img/story4.jpg";
import story5 from "../../img/story5.jpg";
import story6 from "../../img/story6.jpg";
import ali from "../../img/ali.jpg";
import dot from "../../img/dots_dark.svg";
import ali1 from "../../img/ali_post1.jpg";
import liked from "../../img/liked.svg";
import comment from "../../img/comment.svg";
import save from "../../img/save.svg";
import imoji from "../../img/imoji.svg";

// components
import PostModal from '../../Components/PostModal/PostModal';
import { Link } from 'react-router-dom';
import ShowMore from '../../Components/PostModal/ShowMore/ShowMore';



const Home = () => {
    
    // hooks
    const [showModal, setShowModal] = useState(false); // show modal 
    const [posts, setPosts] = useState([]); // get all post data from database


    // function for post time counter
    const postUploadTime = (postTime) => {

        // get a timestamp
        const currentTime = new Date();
        const timeDiff = currentTime.getTime() - postTime;
        const seconds = Math.floor(timeDiff / 1000); // seconds
        const minutes = Math.floor(seconds / 60); // minutes
        const hours = Math.floor(minutes / 60); // hours
        const days = Math.floor(hours / 24); // days

        // return the result
        if (seconds < 60) {
            return `Just now`;
        }
        else if (seconds >= 60 && minutes < 60) {
            return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
        }
        else if (minutes >= 60 && hours < 24) {
            return `${hours} ${hours > 1? "hours" : "hour"} ago`;
        }
        else if (hours >= 24) {
            return `${days} ${days > 1? "days" : "day"} ago`;
        }
        
    }

    // effects
    useEffect(() => {
        axios.get('http://localhost:5050/posts?_sort=id&_order=desc').then(res => {
            setPosts(res.data); // set posts from database
        }).catch(err => {
            console.log(err.message);
        });
    }, [showModal, setPosts]);


    // like handler
    const handleLike = (id) => {

        // get data without updating data
        const postData = posts.find(data => data.id === id);
        // update data for post like
        const updateLike = {
            ...postData,
            likes : postData.likes + 1
        }

        // marge all data
        const updatedData = [...posts.filter(data => data.id!== id), updateLike];
        
        // update database and save to json file
        axios.patch(`http://localhost:5050/posts/${id}`, updateLike).then(res => {
            setPosts(updatedData.sort((a, b) => b.id - a.id)); // set updated data to state
        })

    }

  return (
    <>
        <aside>
            <div className="inner-aside">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>

                <div className="menus">
                    <ul>
                        <li className='menu-list'>
                            <Link to="/"  className="menu-item active">
                                <span className="icon">
                                    <img src={home} alt="" />
                                </span>
                                <span className='mn'>Home</span>
                            </Link>
                        </li>
                        <li className='menu-list'>
                            <Link to="/"  className="menu-item">
                                <span className="icon">
                                    <img src={search} alt="" />
                                </span>
                                <span className='mn'>Search</span>
                            </Link>
                        </li>
                        <li className='menu-list'>
                            <Link to="/"  className="menu-item">
                                <span className="icon">
                                    <img src={explore} alt="" />
                                </span>
                                <span className='mn'>Explore</span>
                            </Link>
                        </li>
                        <li className='menu-list'>
                            <Link to="/"  className="menu-item">
                                <span className="icon">
                                    <img src={reals} alt="" />
                                </span>
                                <span className='mn'>Reals</span>
                            </Link>
                        </li>
                        <li className='menu-list'>
                            <Link to="/"  className="menu-item">
                                <span className="icon">
                                    <img src={message} alt="" />
                                </span>
                                <span className='mn'>Messages</span>
                            </Link>
                        </li>
                        <li className='menu-list'>
                            <Link to="/"  className="menu-item">
                                <span className="icon">
                                    <img src={notification} alt="" />
                                </span>
                                <span className='mn'>Notifications</span>
                            </Link>
                        </li>
                        <li className='menu-list'>
                            <button className="menu-item" onClick={() => setShowModal(true)}>
                                <span className="icon">
                                    <img src={create} alt="" />
                                </span>
                                <span className='mn'>Create</span>
                            </button>
                        </li>
                        <li className='menu-list'>
                            <Link to="/"  className="menu-item">
                                <span className="icon profile">
                                    <img src={profileImg} alt="" />
                                </span>
                                <span className='mn'>Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="more-menus">
                    <div className='menu-list'>
                        <Link to="/"  className="menu-item">
                            <span className="icon">
                                <img src={moreMenu} alt="" />
                            </span>
                            <span className='mn'>More</span>
                        </Link>
                    </div>
                </div>
            </div>
        </aside>

        <div className="main">
            <div className="main-container">
                <div className="content-wrapper">
                    <div className="story-wrapper">
                        <div className="stroy-box">
                            <button>
                                <div className="img">
                                    <img src={story5} alt="" />
                                </div>
                                <div className="auth-name">
                                    <span>anahita_h...</span>
                                </div>
                            </button>
                        </div>
                        <div className="stroy-box">
                            <button>
                                <div className="img">
                                    <img src={story1} alt="" />
                                </div>
                                <div className="auth-name">
                                    <span>anahita_h...</span>
                                </div>
                            </button>
                        </div>
                        <div className="stroy-box">
                            <button>
                                <div className="img">
                                    <img src={story2} alt="" />
                                </div>
                                <div className="auth-name">
                                    <span>anahita_h...</span>
                                </div>
                            </button>
                        </div>
                        <div className="stroy-box">
                            <button>
                                <div className="img">
                                    <img src={story3} alt="" />
                                </div>
                                <div className="auth-name">
                                    <span>anahita_h...</span>
                                </div>
                            </button>
                        </div>
                        <div className="stroy-box">
                            <button>
                                <div className="img">
                                    <img src={story4} alt="" />
                                </div>
                                <div className="auth-name">
                                    <span>anahita_h...</span>
                                </div>
                            </button>
                        </div>
                        <div className="stroy-box">
                            <button>
                                <div className="img">
                                    <img src={story6} alt="" />
                                </div>
                                <div className="auth-name">
                                    <span>anahita_h...</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="post-wrapper">
                        <div className="post-inner">
                            {
                                posts.map((post, index) => {
                                    
                                    return (
                                        <article key={index}>
                                            <div className="article-inner">
                                                <div className="auth-sec">
                                                    <div className="auth-info">
                                                        <div className="auth-img">
                                                            <div className="img">
                                                                <img src={post.profileImg} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="auth-name">
                                                            <div className="name">
                                                                <span className='nm'>{post.username}</span>
                                                                <span className='dot'>•</span>
                                                                <span className='time'>{postUploadTime(post.time)}</span>
                                                            </div>
                                                            {post.location && (
                                                                <div className="desc">
                                                                    <span>{post.location}</span>
                                                                </div>
                                                            )}
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="action">
                                                        <button>
                                                            <img src={dot} alt="" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="post">
                                                    <div className="image-post">
                                                        <div className="img-wrapper">
                                                            <Swiper
                                                                slidesPerView={1}
                                                                spaceBetween={30}
                                                                keyboard={{
                                                                enabled: true,
                                                                }}
                                                                pagination={{
                                                                clickable: true,
                                                                }}
                                                                navigation={true}
                                                                modules={[Keyboard, Pagination, Navigation]}
                                                                className="mySwiper"
                                                            >
                                                            {post.photos.map((photo, index) => {
                                                                return (
                                                                    <SwiperSlide>
                                                                        <img key={index} src={photo.url} alt="" />
                                                                    </SwiperSlide>
                                                                )
                                                            })}
                                                            </Swiper>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content-box">
                                                    <div className="like-sec">
                                                        <ul>
                                                            <li><button onClick={() => handleLike(post.id)}>{post.likes > 0 ? <img src={liked} alt="" /> : <img src={notification} alt="" />}</button></li>
                                                            <li><button><img src={comment} alt="" /></button></li>
                                                            <li><button><img src={message} alt="" /></button></li>
                                                            <li><button><img src={save} alt="" /></button></li>
                                                        </ul>
                                                    </div>
                                                    <div className="like-count">
                                                        <span>{`${post.likes} ${post.likes > 1 ? "likes" : "like"}`}</span>
                                                    </div>
                                                    <div className="post-content">
                                                        <div className="content-wrapper">
                                                            <div className="auth-username">
                                                                <span>{post.username}</span>
                                                            </div>
                                                            
                                                            <div className="content">
                                                                
                                                                {/* <p><ShowFirstLine text={post.post} /></p> */}
                                                                <p>{<ShowMore text={post.post} />}</p>
                                                                {/* <p><HighlightedAndExpandedText text={post.post} /></p> */}
                                                            </div>
                                                        </div>
                                                        <div className="comment-count">
                                                            <span>View all 103 comments</span>
                                                        </div>
                                                        <div className="comment-box">
                                                            <div className="comment-form">
                                                                <form>
                                                                    <textarea placeholder='Add a comment...'></textarea>
                                                                </form>
                                                            </div>
                                                            <div className="icon">
                                                                <button>
                                                                    <img src={imoji} alt="" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })
                            }
                            <article>
                                <div className="article-inner">
                                    <div className="auth-sec">
                                        <div className="auth-info">
                                            <div className="auth-img">
                                                <div className="img">
                                                    <img src={ali} alt="" />
                                                </div>
                                            </div>
                                            <div className="auth-name">
                                                <div className="name">
                                                    <span className='nm'>shuvoalways</span>
                                                    <span className='dot'>•</span>
                                                    <span className='time'>22h</span>
                                                </div>
                                                <div className="desc">
                                                    <span>Place || Original audio</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="action">
                                            <button>
                                                <img src={dot} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="post">
                                        <div className="image-post">
                                            <div className="img-wrapper">
                                                <img src={ali1} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-box">
                                        <div className="like-sec">
                                            <ul>
                                                <li><button><img src={notification} alt="" /></button></li>
                                                <li><button><img src={comment} alt="" /></button></li>
                                                <li><button><img src={message} alt="" /></button></li>
                                                <li><button><img src={save} alt="" /></button></li>
                                            </ul>
                                        </div>
                                        <div className="like-count">
                                            <span>7 likes</span>
                                        </div>
                                        <div className="post-content">
                                            <div className="content-wrapper">
                                                <div className="auth-username">
                                                    <span>shuvoalways</span>
                                                </div>
                                                <div className="content">
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...
                                                    <button>more</button></p>
                                                </div>
                                            </div>
                                            <div className="comment-count">
                                                <span>View all 103 comments</span>
                                            </div>
                                            <div className="comment-box">
                                                <div className="comment-form">
                                                    <form>
                                                        <textarea placeholder='Add a comment...'></textarea>
                                                    </form>
                                                </div>
                                                <div className="icon">
                                                    <button>
                                                        <img src={imoji} alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>

                <div className="right-sidebar">
                    <div className="auth-info">
                        <div className="auth-img">
                            <img src={profileImg} alt="" />
                        </div>
                        <div className="auth-desc">
                            <div className="user-name">
                                <Link to='#'>shahab.insta</Link>
                            </div>
                            <div className="name">
                                <span>Md Shahab Uddin</span>
                            </div>
                        </div>
                        <div className="switch-acc">
                            <button>Switch</button>
                        </div>
                    </div>

                    <div className="suggestion">
                        <div className="header">
                            <span>Suggestions for you</span>
                            <button>See All</button>
                        </div>
                        <div className="list-wrapper">
                            <ul>
                                <li>
                                    <div className="user-img">
                                        <img src={story5} alt="" />
                                    </div>
                                    <div className="user-desc">
                                        <span className='username'>anahita</span>
                                        <span className='quote'>Suggested for you</span>
                                    </div>
                                    <div className="follow-btn">
                                        <button>Follow</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="user-img">
                                        <img src={story5} alt="" />
                                    </div>
                                    <div className="user-desc">
                                        <span className='username'>anahita</span>
                                        <span className='quote'>Suggested for you</span>
                                    </div>
                                    <div className="follow-btn">
                                        <button>Follow</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="user-img">
                                        <img src={story5} alt="" />
                                    </div>
                                    <div className="user-desc">
                                        <span className='username'>anahita</span>
                                        <span className='quote'>Suggested for you</span>
                                    </div>
                                    <div className="follow-btn">
                                        <button>Follow</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="user-img">
                                        <img src={story5} alt="" />
                                    </div>
                                    <div className="user-desc">
                                        <span className='username'>anahita</span>
                                        <span className='quote'>Suggested for you</span>
                                    </div>
                                    <div className="follow-btn">
                                        <button>Follow</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer">
                        <div className="top">
                            <ul className='nav'>
                                <li><Link to="/">About</Link></li>
                                <li><Link to="/">Help</Link></li>
                                <li><Link to="/">Press</Link></li>
                                <li><Link to="/">API</Link></li>
                                <li><Link to="/">Jobs</Link></li>
                                <li><Link to="/">Privacy</Link></li>
                                <li><Link to="/">Terms</Link></li>
                                <li><Link to="/">Locations</Link></li>
                                <li><Link to="/">Language</Link></li>
                            </ul>
                        </div>
                        <div className="bottom">
                            <p className="copyright">© 2023 Instagram from Meta</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showModal && <PostModal action={setShowModal} />}
    </>

  )
}

export default Home