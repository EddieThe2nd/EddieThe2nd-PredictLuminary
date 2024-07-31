import React from 'react'
import './listing.css'

//Imported icons
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

//Imported Images
import img from '../../../../../LoginAssets/conversion.png';
import img1 from '../../../../../LoginAssets/weekly sales report.jpg';
import img2 from '../../../../../LoginAssets/listing3.jpg';
import img3 from '../../../../../LoginAssets/listing1.jpg';
import user1 from '../../../Assets/user (6).jpg'
import user2 from '../../../Assets/user (2).jpg'
import user3 from '../../../Assets/user (1).jpg'
import user4 from '../../../Assets/user (5).jpg'

const Listing = () => {
  return (
    <div className='listingSection'>

      <div className="heading flex">
        <h1>My Listings</h1>
        <button className='btn flex'>
          See All <BsArrowRightShort className='icon'/>
        </button>
      </div>
      <div className="secContainer flex">
        <div className="singleItem">
          <AiFillHeart className='icon'/>
          <img src={img} alt="Image" />
          <h3>Predictions</h3>
        </div>

        <div className="singleItem">
          <AiOutlineHeart className='icon'/>
          <img src={img1} alt="Image" />
          <h3>Conversions</h3>
        </div>

        <div className="singleItem">
          <AiOutlineHeart className='icon'/>
          <img src={img2} alt="Image" />
          <h3>Weekly Trends and Sales</h3>
        </div>

        <div className="singleItem">
          <AiFillHeart className='icon'/>
          <img src={img3} alt="Image" />
          <h3>Sales Visual</h3>
        </div>
      </div>


        <div className="sellers flex">
          <div className="topSellers">
            <div className="heading flex">
              <h3>Top Callers</h3>
              <button className='btn flex'>
                See All <BsArrowRightShort className='icon'/>
              </button>
            </div>

            <div className="card flex">
              <div className="users">
                <img src={user1} alt="User Image" />
                <img src={user2} alt="User Image" />
                <img src={user3} alt="User Image" />
                <img src={user4} alt="User Image" />
              </div>
              <div className="cardText">
                <span>
                  14.566 Calls made <br />
                  <small>
                    21 calls <span className="date">7 Days

                    </span>
                  </small>
                </span>
              </div>
            </div>
          </div>

          <div className="featuredSellers">
            <div className="heading flex">
              <h3>Featured Callers</h3>
              <button className='btn flex'>
                See All <BsArrowRightShort className='icon'/>
              </button>
            </div>

            <div className="card flex">
              <div className="users">
                <img src={user2} alt="User Image" />
                <img src={user1} alt="User Image" />
                <img src={user3} alt="User Image" />
                <img src={user4} alt="User Image" />
              </div>
              <div className="cardText">
                <span>
                  28,566 Predictions <br />
                  <small>
                    26 Callers <span className="date">31 Days
                    </span>
                  </small>
                </span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Listing