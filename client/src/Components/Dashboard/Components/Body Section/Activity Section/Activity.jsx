import React from 'react'
import './activity.css'

//Imported Icons
import { BsArrowRightShort } from "react-icons/bs";

//Imported Images
import user from '../../../Assets/user (1).jpg'
import user1 from '../../../Assets/user (2).jpg'
import user2 from '../../../Assets/user (3).jpg'
import user3 from '../../../Assets/user (4).jpg'
import user4 from '../../../Assets/user (5).jpg'

const Activity = () => {
  return (
    <div className='activitySection'>
        <div className="heading flex">
          <h1>Recent Activity</h1>
          <button className='btn'>
            See All
            <BsArrowRightShort className='icon'/>
          </button>
        </div>

        <div className="secContainer grid">
          <div className="singleCustomer flex">
            <img src={user} alt="Customer Image" />
            <div className="customerDetails">
              <span className="name">Ola Randy</span>
              <small>Requested a file for prediction</small>
            </div>
            <div className="duration">
              10 min ago
            </div>
          </div>

          <div className="singleCustomer flex">
            <img src={user1} alt="Customer Image" />
            <div className="customerDetails">
              <span className="name">Ola Themba</span>
              <small>Requested a file for prediction</small>
            </div>
            <div className="duration">
              15 min ago
            </div>
          </div>

          <div className="singleCustomer flex">
            <img src={user2} alt="Customer Image" />
            <div className="customerDetails">
              <span className="name">Ola Yandani</span>
              <small>Requested a file for prediction</small>
            </div>
            <div className="duration">
              28 min ago
            </div>
          </div>

          <div className="singleCustomer flex">
            <img src={user3} alt="Customer Image" />
            <div className="customerDetails">
              <span className="name">Ola Khulekani</span>
              <small>Requested a file for prediction</small>
            </div>
            <div className="duration">
              32 min ago
            </div>
          </div>
          <div className="singleCustomer flex">
            <img src={user4} alt="Customer Image" />
            <div className="customerDetails">
              <span className="name">Ola Sbusiso</span>
              <small>Requested a file for prediction</small>
            </div>
            <div className="duration">
              10 min ago
            </div>
          </div>
        </div>
    </div>
  )
}

export default Activity