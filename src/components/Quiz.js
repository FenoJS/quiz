import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import SelectCategory from './SelectCategory';
import Question from './Question';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roundNumber: 1,
      categories: [],
      score: {},
    };

    this.addCategory = this.addCategory.bind(this);
  }

  addCategory(category) {
    this.setState({
      categories: category,
    });
  }

  render() {
    console.log(this.state.categories.length);
    return (
      <Fragment>
        {this.state.categories.length <= 0 ? (
          <SelectCategory addCategory={this.addCategory} />
        ) : (
          <Question />
        )}
      </Fragment>
    );
  }
}

export default Quiz;
