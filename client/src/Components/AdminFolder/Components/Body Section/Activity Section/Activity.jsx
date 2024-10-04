import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Activity Section/activity.css'

const Activity = ({ entityNumber }) => {
  const [loginActivity, setLoginActivity] = useState([]);

  useEffect(() => {
    fetchLoginActivity();
    if (entityNumber) {
      fetchLoginActivity();
    }
  }, [entityNumber]);

  const fetchLoginActivity = async () => {
    try {
      const response = await axios.get('http://localhost:3002/recent-login-activity', {
        params: { entityNumber }
      });
      console.log('Fetched login activity:', response);
      if (response.data.success) {
        setLoginActivity(response.data.loginActivity);
      } else {
        setLoginActivity([]);
      }
    } catch (error) {
      console.error('Error fetching login activity:', error);
    }
  };

  return (
    <div className="login-activity-container">
      <h2>Recent Login Activity for {entityNumber}</h2>
      <table className="login-activity-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Entity Number</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
          {loginActivity.length === 0 ? (
            <tr>
              <td colSpan="3">No login activity found.</td>
            </tr>
          ) : (
            loginActivity.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td>{activity.entityNumber}</td>
                <td>{new Date(activity.login_time).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Activity;
