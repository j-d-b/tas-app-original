import React from 'react';

import { FlexBox, FlexItem } from '../../components/Flex';
import Profile from './Profile';

const Settings = () => (
  <FlexBox justify="center">
    <FlexItem basis="40%">
      <Profile />
    </FlexItem>
  </FlexBox>
);

export default Settings;
