import React, { Component } from 'react';
import styled from 'styled-components';
import { shuffle } from '../utils/utils';
import QuestionView from './QuestionView';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      questionAnswered: false,
      currentQuestionNum: 1,
      selectedAnswersList: [],
      allQuestionsAnswered: false,
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
        }&difficulty=${this.props.difficulty}&type=multiple&encode=url3986`
      );
      const data = await res.json();

      // https://medium.com/front-end-weekly/immutability-in-array-of-objects-using-map-method-dd61584c7188
      const newData = await data.results.map(item => {
        item = {
          ...item,
          question: decodeURIComponent(item.question),
          category: decodeURIComponent(item.category),
          correct_answer: decodeURIComponent(item.correct_answer),
          incorrect_answers: item.incorrect_answers.map(i =>
            decodeURIComponent(i)
          ),
        };
        return item;
      });
      console.log(newData);
      await this.setState({
        questions: newData,
        correctAnswer:
          newData[this.state.currentQuestionNum - 1].correct_answer,
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
    console.log(this.state.questions);
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
    if (this.state.currentQuestionNum < 3) {
      await this.setState({
        questionAnswered: false,
        currentQuestionNum: this.state.currentQuestionNum + 1,
        correctAnswer: this.state.questions[this.state.currentQuestionNum]
          .correct_answer,
      });
      await this.getAnswersList();
    }
    if (
      this.state.currentQuestionNum === 3 &&
      this.state.questionAnswered === true
    ) {
      this.setState({
        allQuestionsAnswered: true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.allQuestionsAnswered !== this.state.allQuestionsAnswered) {
      // this.props.isQuestionsRoundFinished();
      console.log(this.state.selectedAnswersList);
      this.props.getSelectedAnswers(this.state.selectedAnswersList);
    }
  }

  render() {
    return (
      this.state.dataLoaded && (
        <QuestionView
          question={this.state.questions[this.state.currentQuestionNum - 1]}
          answers={this.state.answers}
          getSelectedAnswer={this.getSelectedAnswer}
          showCorrectAnswer={this.showCorrectAnswer}
          selectedAnswersList={this.state.selectedAnswersList}
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
