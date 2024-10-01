import React from 'react'
//import './Css/Topbar.css'
import { TopBarData } from '../Functions/TopBarData'

function Topbar() {
  return (
    <div className="Topbar">
        <ul className="TopbarList">
            {TopBarData.map((value, key) => (
                <li 
                    key={key}
                    className="ListColumn"
                >
                    <div id='TopbarTitle'>{value.title}</div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Topbar