import React, { Component } from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: #fff;
`;

const Button = styled.button`
  color: fff;
`;

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getQuestion = this.getQuestion.bind(this);
  }

  async getQuestion() {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${
          this.props.categoryID
        }&difficulty=medium&type=multiple`
      );
      const data = await res.json();
      await this.setState({
        question: data.results[0],
      });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    await this.getQuestion();
  }

  render() {
    return (
      <FlexContainer>
        <Header>s</Header>
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
