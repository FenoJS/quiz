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
  max-height: 88.5rem;
  /* background: linear-gradient(
    180deg,
    rgba(90, 80, 145, 1) 4%,
    rgba(18, 15, 24, 1) 98%
  ); */
  background: linear-gradient(
    180deg,
    rgb(63, 51, 128) 10%,
    rgba(18, 15, 24, 1) 64%
  );
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
  }

  startQuiz() {
    this.setState({
      quizRunning: true,
    });
  }

  // https://stackoverflow.com/questions/912596/how-to-turn-a-string-into-a-javascript-function-call
  changeAvatarAndDifficulty(event) {
    const targetLevel = event.target.innerText;
    const difficulty = event.target.innerText.toLowerCase();
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
      difficultyLevel: difficulty,
    });
  }
  //  should be refactored?
  hoverAvatarOn(event) {
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
      aiAvatarHover: avatar,
    });
  }

  hoverAvatarOff() {
    this.setState({
      aiAvatarHover: this.state.aiAvatar,
    });
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
