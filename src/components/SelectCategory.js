import React, { Component } from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.h1`
  font-size: 21px;
  color: #fff;
`;

const Button = styled.button`
  color: fff;
`;

class SelectCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.SelectCategory = this.SelectCategory.bind(this);
  }

  SelectCategory() {
    console.log(this.props);
    this.props.addCategory('test');
  }

  render() {
    return (
      <FlexContainer>
        <Header>Select Category</Header>
        <ul>
          <li>
            <Button onClick={this.SelectCategory}> Cat 1 </Button>
          </li>
          <li>
            <Button> Cat 2 </Button>
          </li>
          <li>
            <Button> Cat 3 </Button>
          </li>
        </ul>
      </FlexContainer>
    );
  }
}

export default SelectCategory;
