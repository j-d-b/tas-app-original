import React from 'react';

import Profile from '../components/Profile';

const Settings = (props) => (
  <div>
    <Profile />
    <button onClick={props.auth.logout}>Logout</button>
  </div>
);

export default Settings;
