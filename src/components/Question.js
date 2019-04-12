import React, { Component } from 'react';
import styled from 'styled-components';
import { shuffle } from '../utils/shuffle';
import QuestionView from './QuestionView';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      questionAnswered: false,
    };

    this.getQuestionData = this.getQuestionData.bind(this);
    this.getAnswersList = this.getAnswersList.bind(this);
    this.getSelectedAnswer = this.getSelectedAnswer.bind(this);
    this.showCorrectAnswer = this.showCorrectAnswer.bind(this);
  }

  async getQuestionData() {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${
          this.props.categoryID
        }&difficulty=${this.props.difficulty}&type=multiple`
      );
      const data = await res.json();
      await this.setState({
        question: data.results[0],
        correctAnswer: data.results[0].correct_answer,
        selectedAnswer: null,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    await this.getQuestionData();
    await this.getAnswersList();
    await this.setState({
      dataLoaded: true,
    });
  }

  async getAnswersList() {
    try {
      const answersList = [
        this.state.question.correct_answer,
        ...this.state.question.incorrect_answers,
      ];
      this.setState({ answers: shuffle(answersList) });
    } catch (err) {
      console.log(err);
    }
  }

  getSelectedAnswer(event) {
    const answer = event.target.innerText;
    this.setState({
      selectedAnswer: answer,
      questionAnswered: true,
    });
  }

  showCorrectAnswer(item) {
    if (this.state.questionAnswered) {
      if (this.state.correctAnswer !== this.state.selectedAnswer) {
        if (item === this.state.selectedAnswer) {
          return 'answerWrong';
        }
        if (item === this.state.correctAnswer) {
          return 'answerWrongShowCorrect';
        }
      }
      if (this.state.correctAnswer === item) {
        return 'answerCorrect';
      }
    }
  }

  render() {
    return (
      this.state.dataLoaded && (
        <QuestionView
          question={this.state.question}
          answers={this.state.answers}
          getSelectedAnswer={this.getSelectedAnswer}
          showCorrectAnswer={this.showCorrectAnswer}
          isQuestionAnswered={this.state.questionAnswered}
        />
      )
    );
  }
}

export default Question;
