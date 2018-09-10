import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { FlexBox, FlexItem } from '../../components/Flex';
import Box from '../../components/Box';

const Container = styled.div`
  margin: 2rem;
  border-radius: 6px;
  background-color: #f1eff1;
`;

const Content = styled.div`
  padding: 1rem 1.5rem;
`;

const Title = styled.div`
  font-weight: 300;
  font-size: 2rem;
  margin-bottom: 0.9rem;
`;

const Header = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`;

const Divider = styled.div`
  margin: 0.5rem 0;
  height: 1px;
  background-color: #000;
`;

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

const SearchInput = styled.input`
  max-width: 100%;
  border-radius: 3px;
  border: 1px solid #ddd;
  padding: 0.2rem 1rem;
  height: 30px;
  font-size: 15px;
  width: 100%;
  margin: 0.4rem 0;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #aaa;
  }

  &::placeholder {
    color: #aaa;
  }
`;

// form submit button (<input type="submit">)
const SubmitInput = styled.input`
  text-align: center;
  width: 100%;
  border-radius: 3px;
  border: none;
  margin: 0;
  padding: 0;
  margin: 0.3rem 0;
  height: 40px;
  cursor: pointer;
  color: #fff;
  background-color: ${props => props.theme.accent};

  &:hover {
    background-color: ${props => darken(0.05, props.theme.accent)};
  }
`;

const SelectRow = ({ title, options }) => (
  <FlexBox justify="flex-end" alignItems="center">
    <FlexItem>
      <Box mr="1rem">{title}</Box>
    </FlexItem>
    <FlexItem basis="67%">
      <Select>
        {options.map((opt) => <option key={opt.title} value={opt.value}>{opt.title}</option>)}
      </Select>
    </FlexItem>
  </FlexBox>
);

const SelectSection = ({ selects }) => (
  <div>
    {selects.map((select) => <SelectRow key={select.title} title={select.title} options={select.options} />)}
  </div>
);

const ALL_BLOCKS = gql`
  {
    allBlocks {
      id
    }
  }
`;

const BlockSelect = () => (
  <Query query={ALL_BLOCKS}>
    {({ loading, error, data }) => {
      if (error) return `Error! ${error.message}`;

      const options = loading ? [{ value: 'Loading...' }] : data.allBlocks.map(block => ({ value: block.id, title: block.id }));

      return <SelectRow title="Block" options={options} />;
    }}
  </Query>
);

const Search = () => (
  <div>
    <Header>Search</Header>
    <SearchInput name="search" type="text" placeholder="Customer, Container ID..." />
  </div>
);

function Filter() {
  const filterSelects = [
    {
      title: 'Time Slots',
      options: [
        { value: 'current', title: 'Current' },
        { value: 'next', title: 'Next ' },
        { value: 'upcoming', title: 'Upcoming' },
        { value: 'past', title: 'Past' },
        { value: 'all', title: 'All' }
      ]
    },
    {
      title: 'Type',
      options: [
        { value: 'all', title: 'All' },
        { value: 'import-full', title: 'Import Full' },
        { value: 'export-full', title: 'Export Full' },
        { value: 'import-empty', title: 'Import Empty' },
        { values: 'export-empty', title: 'Export Empty' }
      ]
    }
  ];

  return (
    <div>
      <Header>Filter</Header>
      <SelectSection title="Filter" selects={filterSelects} />
      <BlockSelect />
    </div>
  );
};

function Sort() {
  const sortSelects = [
    {
      title: 'By',
      options: [
        { value: 'time-slot', title: 'Time Slot' },
        { value: 'block', title: 'Block' },
        { value: 'type', title: 'Type' },
        { value: 'customer', title: 'Customer' },
        { value: 'company', title: 'Company' }
      ]
    },
    {
      title: 'Direction',
      options: [
        { value: 'descending', title: 'Descending' },
        { value: 'ascending', title: 'Ascending' }
      ]
    }
  ];

  return (
    <div>
      <Header>Sort</Header>
      <SelectSection title="Sort" selects={sortSelects} />
    </div>
  );
}

const OrganizeBox = () => (
  <Container>
    <Content>
      <Title>Organize</Title>
      <Search />
      <Divider />
      <Filter />
      <Divider />
      <Sort />
      <SubmitInput type="submit" value="Reset" />
    </Content>
  </Container>
);

export default OrganizeBox;
