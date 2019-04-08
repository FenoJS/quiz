import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import StartingPage from './components/StartingPage';
import Quiz from './components/Quiz';
import playerAvatar from './img/playerAvatar.png';
import AiAvatarEasy from './img/AiAvatarEasy.png';
import AiAvatarMedium from './img/AiAvatarMedium.png';
import AiAvatarHard from './img/AiAvatarHard.png';

import './App.css';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
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
  width: 46.5rem;
  height: 82.5rem;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizRunning: false,
      aiAvatar: AiAvatarMedium,
      difficultyLevel: 'medium',
    };

    this.startQuiz = this.startQuiz.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }

  startQuiz() {
    this.setState({
      quizRunning: true,
    });
  }
  // https://stackoverflow.com/questions/912596/how-to-turn-a-string-into-a-javascript-function-call
  changeAvatar(event) {
    const targetLevel = event.target.innerText;
    let avatar;
    if (targetLevel === 'Easy') {
      avatar = AiAvatarEasy;
    }
    if (targetLevel === 'Medium') {
      avatar = AiAvatarMedium;
    }
    if (targetLevel === 'Hard') {
      avatar = AiAvatarHard;
    }
    this.setState({
      aiAvatar: avatar,
    });
  }

  changeDifficulty(event) {
    const diffculty = event.target.innerText.toLowerCase();
    this.setState({
      difficultyLevel: diffculty,
    });
  }

  render() {
    return (
      <Fragment>
        <GlobalStyles />
        <Wrapper>
          {this.state.quizRunning ? (
            <Quiz playerAvatar={playerAvatar} aiAvatar={this.state.aiAvatar} />
          ) : (
            <StartingPage
              startQuiz={this.startQuiz}
              playerAvatar={playerAvatar}
              aiAvatar={this.state.aiAvatar}
              changeAvatar={this.changeAvatar}
              changeDifficulty={this.changeDifficulty}
            />
          )}
        </Wrapper>
      </Fragment>
    );
  }
}

export default App;
