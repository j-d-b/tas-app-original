import React from 'react';

import Profile from '../components/Profile';

export default function Settings(props) {
  return (
    <div>
      <Profile />
      <button onClick={props.auth.logout}>Logout</button>
    </div>
  );
}
