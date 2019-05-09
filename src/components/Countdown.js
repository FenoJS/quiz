import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 0.7rem;
  width: 80%;
  border-radius: 5rem;
  bottom: 3rem;
  background-color: black;
  position: absolute;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${({ percent }) => (percent > 0 ? percent + '%' : '0')};
  border-radius: 5rem;
  background-color: ${({ percent }) => (percent > 30 ? '#4cff9d' : '#ff4545')};
  position: relative;
  transition: all 1s linear;
`;

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 100,
    };

    this.startTimer = this.startTimer.bind(this);
  }

  startTimer(sec) {
    this.timer = setInterval(() => {
      if (!this.state.percent < 100 / sec) {
        this.setState({ percent: this.state.percent - 100 / sec });
      }
    }, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.percent !== this.state.percent && this.state.percent < 1) {
      clearInterval(this.timer);
      setTimeout(() => {
        this.props.timeOut();
      }, 1000);
    }
  }

  componentDidMount() {
    this.startTimer(12);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Container>
        <ProgressBar percent={this.state.percent} />
      </Container>
    );
  }
}

export default Countdown;
