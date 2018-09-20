import React from 'react';
import styled from 'styled-components';

import Box from '../../components/Box';
import { FlexBox, FlexItem } from '../../components/Flex';

const Select = styled.select`
  border-radius: 3px;
  border: 1px solid #ddd;
  width: 100%;
  padding: 0.2rem 1rem;
  height: 30px;
  font-size: 15px;
  margin: 0.4rem 0;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #aaa;
  }
`;

const SelectRow = ({ title, options, value, action }) => (
  <FlexBox justify="flex-end" alignItems="center">
    <FlexItem>
      <Box mr="1rem">{title}</Box>
    </FlexItem>
    <FlexItem basis="67%">
      <Select value={value} onChange={e => action(e.target.value)}>
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.title}</option>)}
      </Select>
    </FlexItem>
  </FlexBox>
);

export default SelectRow;
