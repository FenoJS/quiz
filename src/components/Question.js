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
      currentQuestionNum: 1,
      selectedAnswersList: [],
    };

    this.getQuestionsData = this.getQuestionsData.bind(this);
    this.getAnswersList = this.getAnswersList.bind(this);
    this.getSelectedAnswer = this.getSelectedAnswer.bind(this);
    this.showCorrectAnswer = this.showCorrectAnswer.bind(this);
    this.continueQuiz = this.continueQuiz.bind(this);
  }

  async getQuestionsData() {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=3&category=${
          this.props.categoryID
        }&difficulty=${this.props.difficulty}&type=multiple`
      );
      const data = await res.json();
      await this.setState({
        questions: data.results,
        correctAnswer:
          data.results[this.state.currentQuestionNum - 1].correct_answer,
        selectedAnswer: null,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    await this.getQuestionsData();
    await this.getAnswersList();
    await this.setState({
      dataLoaded: true,
    });
  }

  async getAnswersList() {
    try {
      const answersList = [
        this.state.questions[this.state.currentQuestionNum - 1].correct_answer,
        ...this.state.questions[this.state.currentQuestionNum - 1]
          .incorrect_answers,
      ];
      this.setState({ answers: shuffle(answersList) });
    } catch (err) {
      console.log(err);
    }
  }

  getSelectedAnswer(event) {
    const answer = event.target.innerText;
    let isAnswerCorrect;
    if (answer === this.state.correctAnswer) {
      isAnswerCorrect = true;
    } else {
      isAnswerCorrect = false;
    }
    this.setState({
      selectedAnswer: answer,
      questionAnswered: true,
      selectedAnswersList: [...this.state.selectedAnswersList, isAnswerCorrect],
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

  async continueQuiz() {
    await this.setState({
      questionAnswered: false,
      currentQuestionNum: this.state.currentQuestionNum + 1,
      correctAnswer: this.state.questions[this.state.currentQuestionNum]
        .correct_answer,
    });
    await this.getAnswersList();
  }

  render() {
    return (
      this.state.dataLoaded && (
        <QuestionView
          question={this.state.questions[this.state.currentQuestionNum - 1]}
          answers={this.state.answers}
          getSelectedAnswer={this.getSelectedAnswer}
          showCorrectAnswer={this.showCorrectAnswer}
          aselectedAnswersList={this.state.selectedAnswersList}
          answersBarLength={this.state.questions}
          isQuestionAnswered={this.state.questionAnswered}
          continueQuiz={
            this.state.questionAnswered ? this.continueQuiz : undefined
          }
        />
      )
    );
  }
}

export default Question;
