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

    @media (max-width: 600px) {
      font-size: 50%; /* 1rem = 8px */
    }
  }

  body {
    background: linear-gradient(45deg, rgba(81,49,207,1) 0%, rgba(252,70,165,1) 100%);

}


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
    margin: 0;
    padding: 0;
  }

`;

const Wrapper = styled.div`
  width: 46.5rem;
  height: 100%;
  height: 88.5rem;
  background: linear-gradient(
    180deg,
    rgb(63, 51, 128) 10%,
    rgba(18, 15, 24, 1) 64%
  );

  @media (max-width: 500px) {
    height: 100vh;
    width: 100%;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizRunning: false,
      aiAvatar: AiAvatarMedium,
      aiAvatarHover: null,
      difficultyLevel: 'medium',
    };

    this.startQuiz = this.startQuiz.bind(this);
    this.changeAvatarAndDifficulty = this.changeAvatarAndDifficulty.bind(this);
    this.hoverAvatarOn = this.hoverAvatarOn.bind(this);
    this.hoverAvatarOff = this.hoverAvatarOff.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.setAvatarByLevel = this.setAvatarByLevel.bind(this);
  }

  startQuiz() {
    this.setState({
      quizRunning: true,
    });
  }

  startNewGame() {
    this.setState({
      quizRunning: false,
    });
  }

  changeAvatarAndDifficulty(event) {
    const difficulty = event.target.innerText.toLowerCase();
    const avatar = this.setAvatarByLevel(event);
    this.setState({
      aiAvatar: avatar,
      difficultyLevel: difficulty,
    });
  }

  hoverAvatarOn(event) {
    const avatar = this.setAvatarByLevel(event);
    this.setState({
      aiAvatarHover: avatar,
    });
  }

  hoverAvatarOff() {
    this.setState({
      aiAvatarHover: this.state.aiAvatar,
    });
  }

  // https://stackoverflow.com/questions/912596/how-to-turn-a-string-into-a-javascript-function-call
  setAvatarByLevel(event) {
    const targetLevel = event.target.innerText;
    let avatar;
    switch (targetLevel) {
      case 'Easy':
        avatar = AiAvatarEasy;
        break;
      case 'Medium':
        avatar = AiAvatarMedium;
        break;
      case 'Hard':
        avatar = AiAvatarHard;
        break;
      default:
        console.log('error');
    }
    return avatar;
  }

  render() {
    return (
      <Fragment>
        <GlobalStyles />
        <Wrapper>
          {this.state.quizRunning ? (
            <Quiz
              playerAvatar={playerAvatar}
              aiAvatar={this.state.aiAvatar}
              difficulty={this.state.difficultyLevel}
              startNewGame={this.startNewGame}
            />
          ) : (
            <StartingPage
              startQuiz={this.startQuiz}
              playerAvatar={playerAvatar}
              aiAvatar={this.state.aiAvatar}
              aiAvatarHover={this.state.aiAvatarHover}
              changeAvatarAndDifficulty={this.changeAvatarAndDifficulty}
              hoverAvatarOn={this.hoverAvatarOn}
              hoverAvatarOff={this.hoverAvatarOff}
            />
          )}
        </Wrapper>
      </Fragment>
    );
  }
}

export default App;
