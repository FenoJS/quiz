import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import StartingPage from './components/StartingPage';
import Quiz from './components/Quiz';

import './App.css';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  body {
    background: rgb(81,49,207);
background: linear-gradient(45deg, rgba(81,49,207,1) 0%, rgba(252,70,165,1) 100%);
  }

  #root {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

`;

const Wrapper = styled.div`
  width: 464px;
  height: 825px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizRunning: false,
    };

    this.startQuiz = this.startQuiz.bind(this);
  }

  startQuiz() {
    this.setState({
      quizRunning: true,
    });
  }

  render() {
    return (
      <Fragment>
        <GlobalStyles />
        <Wrapper>
          {this.state.quizRunning ? (
            <Quiz />
          ) : (
            <StartingPage startQuiz={this.startQuiz} />
          )}
        </Wrapper>
      </Fragment>
    );
  }
}

export default App;
