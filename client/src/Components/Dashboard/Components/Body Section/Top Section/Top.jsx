import React from 'react'
import './top.css'

// Imported Icons
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle2 } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsArrowRightShort } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";


//Imported Images
import img from '../../../Assets/user (3).jpg'
import img2 from '../../../../../LoginAssets/thinkBot.gif'
import video from '../../../../../LoginAssets/future.mp4'

const Top = () => {
  return (
    <div className='topSection'>
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome to Smart Sale AI</h1>
          <p>Hello Admin, Welcome back!</p>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder='Search Dashboard'/>
          <BiSearchAlt className='icon'/>
        </div>

        <div className="adminDiv flex">
        <TbMessageCircle2 className='icon'/>
        <IoNotificationsOutline className='icon'/>
        <div className="adminImage">
          <img src={img} alt="Admin Image" />
        </div>
        </div>
      </div>

      <div className="cardSection flex">

        <div className="rightCard flex">
          <h1>Predict and Increase company value</h1>
          <p>The world's fast growing prediction website!</p>

          <div className="buttons flex">
            <button className='btn'>Explore More</button>
            <button className='btn transparent'>Top Sellers</button>
          </div>

          <div className="videoDiv">
            <video src={video} autoPlay loop muted></video>
          </div>
        </div>

        <div className="leftCard flex">
          <div className="main flex">


            <div className="textDiv">
              <h1>My Stat</h1>

              <div className="flex">
                <span>
                  Today <br /> <small>4 Orders</small>
                </span>

                <span>
                  This Month <br /> <small>175 Orders</small>
                </span>
              </div>

              <span className="flex link">
                Go to my Orders <BsArrowRightShort className='icon'/>
              </span>

            </div>

          <div className="imgDiv">
            <img src={img2} alt="Image Name" />
          </div>
          {/* We shall use this card later */}
          <div className="sideBarCard">
              <BsQuestionCircle className='icon'/>
              <div className="cardContent">
                <div className="circle1"></div>
                <div className="circle2"></div>

                <h3>Help Center</h3>
                <p>Having trouble in Planti, please contact us for more questions</p>
                <button className='btn'>Go to help center</button>
              </div>
          </div>

          </div>
        </div>


      </div>
    </div>
  )
}

export default Top