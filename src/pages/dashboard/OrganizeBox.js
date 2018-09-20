import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import SelectRow from './SelectRow';

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

const ALL_BLOCKS = gql`
  {
    allBlocks {
      id
    }
  }
`;

const BlockSelect = ({ value, action}) => (
  <Query query={ALL_BLOCKS}>
    {({ loading, error, data }) => {
      if (error) return `Error! ${error.message}`;

      const options = loading ? [{ value: 'Loading...' }] : [{ value: 'ALL', title: 'All' }].concat(data.allBlocks.map(block => ({ value: block.id, title: block.id })));

      return <SelectRow title="Block" value={value} action={action} options={options} />
    }}
  </Query>
);

const Search = () => (
  <div>
    <Header>Search</Header>
    <SearchInput name="search" type="text" placeholder="Customer, Container ID..." />
  </div>
);

const OrganizeBox = (props) => (
  <Container>
    <Content>
      <Title>Organize</Title>
      <Search />
      <Divider />

      <Header>Filter</Header>
      <SelectRow
        title="Time Slots"
        options={[
          { value: 'CURRENT', title: 'Current' },
          { value: 'NEXT', title: 'Next ' },
          { value: 'UPCOMING', title: 'Upcoming' },
          { value: 'PAST', title: 'Past' },
          { value: 'ALL', title: 'All' }
        ]}
        value={props.timeSlotsFilter}
        action={props.onTimeSlotsChange}
      />
      <SelectRow
        title="Type"
        options={[
          { value: 'ALL', title: 'All' },
          { value: 'IMPORTFULL', title: 'Import Full' },
          { value: 'IMPORTEMPTY', title: 'Import Empty' },
          { value: 'EXPORTFULL', title: 'Export Full' },
          { value: 'EXPORTEMPTY', title: 'Export Empty' }
        ]}
        value={props.apptTypeFilter}
        action={props.onApptTypeChange}
      />
      <BlockSelect
        title="Block"
        value={props.blockFilter}
        action={props.onBlockChange}
      />
      <Divider />

      <Header>Sort</Header>
      <SelectRow
        title="By"
        options={[
          { value: 'TIME_SLOT', title: 'Time Slot' },
          { value: 'BLOCK', title: 'Block' },
          { value: 'TYPE', title: 'Type' },
          { value: 'CUSTOMER', title: 'Customer' },
          { value: 'COMPANY', title: 'Company' }
        ]}
        value={props.sortField}
        action={props.onSortFieldChange}
      />
      <SelectRow
        title="Direction"
        options={[
          { value: 'DESCENDING', title: 'Descending' },
          { value: 'ASCENDING', title: 'Ascending' }
        ]}
        value={props.sortDirection}
        action={props.onSortDirChange}
      />
      {/* <FlexBox justify="flex-end" alignItems="center">
        <FlexItem>
          <Box mr="1rem">By</Box>
        </FlexItem>
        <FlexItem basis="67%">
          <Select value={this.props.sortField} onChange={(e) => ={this.props.onSortFieldChange}(e.target.value) }>
            <option value="TIME_SLOT">Time Slot</option>
            <option value="BLOCK">Block</option>
            <option value="TYPE">Type</option>
            <option value="CUSTOMER">Customer</option>
            <option value="COMPANY">Company</option>
          </Select>
        </FlexItem>
      </FlexBox> */}

      <SubmitInput type="submit" value="Reset" onClick={props.onResetClick}/>
    </Content>
  </Container>
);

export default OrganizeBox;
