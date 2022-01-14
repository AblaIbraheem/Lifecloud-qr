import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import profile from './dummy-profiles.json';
import waze from '../../assets/waze.png';
import wts from '../../assets/wts.png';
import zoom from '../../assets/zoom.png';
import google from '../../assets/google.png';
import map from '../../assets/map.png';
import share from '../../assets/share.png';
import heart from '../../assets/heart.png';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import { Link } from 'react-router-dom';
import './profiledetails.css';
import TopBar from '../../components/topbar/Topbar';
import ProgressBar from '../../components/progressbar/progressBar';
import { Gallery } from '../../components/gallery/gallery';
// import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import Memory from '../../components/memory/Memory';
import Popup from 'reactjs-popup';
// import { useParams } from 'react-router-dom';
export default function Profile() {
  const { dispatch } = useContext(AuthContext);
  const [profiledata, setProfileData] = useState([]);
  const [show, setShow] = useState('wall');
  const id = useParams().id;
  const [memories, setMemories] = useState([]);
  const [next, setnext] = useState(1);
  const handleShowMoreMemories = () => {
    setnext(next + 4);
  };
  console.log(id);
  useEffect(() => {
    fetchuserprofiles();
  }, []);
  const fetchuserprofiles = async () => {
    const res = await axios.get(`/api/profile/getSingleProfileDetails/${id}`);
    setProfileData(res.data);
  };
  console.log(profiledata);
  let pasrseAxios = Object.keys(profiledata).length
    ? JSON.parse(profiledata.lifeAxis)
    : '';
  console.log(pasrseAxios);
  console.log();
  if (Object.keys(profiledata).length > 0) {
    return (
      <div>
        <TopBar />
        <img
          src={`http://localhost:8800/${profiledata.wallImg}`}
          alt=""
          className="profile-cover"
        ></img>
        <div className="profile-details">
          <img
            src={`http://localhost:8800/${profiledata.profileImg}`}
            alt=""
            className="profile-img"
          ></img>
          <div className="deceased-details">
            <h1>{`${profiledata.firstName} ${profiledata.lastName}`}</h1>
            <p>
              {profiledata.birthDate} - {profiledata.deathDate}
            </p>
            {/* <p>{profile[0].city}</p> */}
          </div>
        </div>
        <div className="btns-container">
          <div>
            <Link to={`/editprofiles/${id}`}>
              <span className="small-btn">Update me</span>
            </Link>
            <span className="small-btn">+ Add Friend</span>
            <span className="small-btn">Friends list</span>
          </div>
          <div className="big-btns-container">
            <div
              onClick={() => setShow('bio')}
              className={`${show === 'bio' && 'active'} big-btn`}
            >
              Biography
            </div>
            <div
              onClick={() => setShow('wall')}
              className={`${show === 'wall' && 'active'} big-btn`}
            >
              Wall
            </div>
          </div>
        </div>
        <div className={`${show === 'wall' && 'display'} d-none`}>
          <div className="memorial-container">
            <h1 className="memorial-title">Memorial date</h1>
            <div className="details-and-icons">
              <div className="memorial-details">
                <h3>| {profile[0].memorialDate}</h3>
                <h3>| {profile[0].memorialDate}</h3>
                <h3>| {profile[0].memorialLocation}</h3>
              </div>
              <div className="icons-container">
                <img src={waze} alt="" className="icon"></img>
                <img src={wts} alt="" className="icon"></img>
                <img src={zoom} alt="" className="icon"></img>
              </div>
            </div>
          </div>
          <div className="gallery-container">
            <Gallery profiledata={profiledata} id={id} />
            <div onClick={() => setShow('gallery')} className="full-btn">
              {' '}
              Full Gallery
            </div>
          </div>
          <div className="grave-location-container">
            <h1 className="grave-location-title">Graves location</h1>
            <div className="grave-imgs-container">
              <img src={profile[0].graveImg} alt="" className="grave-img"></img>
              <img src={map} alt="" className="grave-img"></img>
            </div>
            <div className="navigation-btn">
              Tap here for navigation <img src={google} alt=""></img>
            </div>
          </div>
          <div className="">
            <h1 className="memories-title">Memories</h1>
            <div className="memories-container">
              {profiledata.gallery.map(
                (
                  img,
                  index //change to memories
                ) => (
                  <Popup
                    trigger={
                      <div className="memory-container" key={index}>
                        <img
                          src={`http://localhost:8800/${img}`}
                          alt=""
                          className="memory-img"
                        ></img>
                        <div className="icons-container">
                          <div className="memory-heart-container">
                            <div className="heart-div">
                              <img
                                className="heart-icon"
                                src={heart}
                                alt=""
                              ></img>
                            </div>
                          </div>
                          <div className="facebook-container">
                            <div className="heart-div">
                              <img
                                className="heart-icon"
                                src={facebook}
                                alt=""
                              ></img>
                            </div>
                          </div>
                          <div className="instagram-container">
                            <div className="heart-div">
                              <img
                                className="heart-icon"
                                src={instagram}
                                alt=""
                              ></img>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <Memory close={close} memories={profiledata.gallery} /> //change to memories
                    )}
                  </Popup>
                )
              )}
            </div>
            <div className="memory-actions">
              <div
                className={
                  next >= profiledata.gallery.length
                    ? ' hideBtn '
                    : ` full-memory-btn`
                }
                onClick={handleShowMoreMemories}
              >
                + Full Gallery
              </div>
              <div className="full-memory-btn">+ add memory</div>
            </div>
          </div>
        </div>
        <div className={`${show === 'bio' && 'display'} d-none`}>
          <div className="bio-content">
            <h1 className="bio-name">{profile[0].name}.</h1>
            <p className="bio-bio">{profile[0].bio}</p>
          </div>
          <div className="life-axis">
            <h1 className="axis-name">Biography and life axis</h1>
            <p className="axis-desc">{profile[0].axisDescription}</p>
          </div>
          <div>
            {/* {pasrseAxios.map((axis) => (
            <div className="axis-container">
              <div className="axis-sub-container">
                <h1 className="axis-title">{axis.axisTitle}</h1>
                <p className="axis-description2">{axis.axisDescription}</p>
              </div>
              <div className="axis-bubble">
                <span>{axis.axisDate}</span>
              </div>
            </div>
          ))} */}
          </div>
        </div>
        <div
          className={`${show === 'gallery' && 'display'} full-gallery d-none`}
        >
          <div className="full-gallery-container">
            {profiledata.gallery.map((img, index) => (
              <div className="full-gallery-img-container" key={index}>
                <img
                  src={`http://localhost:8800/${img}`}
                  alt=""
                  className="full-gallery-img"
                ></img>
                <div className="heart-container">
                  <div className="heart-div">
                    <img className="heart-icon" src={heart} alt=""></img>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <h1 style={{ textAlign: 'center', paddingTop: '20%' }}>
        <ProgressBar />
      </h1>
    );
  }
}
