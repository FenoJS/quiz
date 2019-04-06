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

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <FlexContainer>
        <Header>Question</Header>
        <ul>
          <li>
            <Button> Answer 1 </Button>
          </li>
          <li>
            <Button> Answer 2 </Button>
          </li>
          <li>
            <Button> Answer 3 </Button>
          </li>
        </ul>
      </FlexContainer>
    );
  }
}

export default Question;
