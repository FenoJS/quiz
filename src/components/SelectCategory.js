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

class SelectCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: null,
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.getRandomCategories = this.getRandomCategories.bind(this);
  }

  selectCategory(id, name) {
    this.props.addSelectedCategory(id, name);
  }

  getRandomCategories() {
    const newArr = [];
    while (newArr.length < 3) {
      const randomItem = this.props.allCategories[
        Math.floor(Math.random() * this.props.allCategories.length)
      ];
      if (newArr.includes(randomItem) === false) {
        newArr.push(randomItem);
      }
    }
    this.setState({ categoriesList: newArr });
  }
  // ??
  componentWillMount() {
    if (this.state.categoriesList === null) {
      this.getRandomCategories();
    }
  }

  render() {
    console.log(this.state);
    return (
      <FlexContainer>
        <Header>Select Category</Header>
        <ul>
          {this.state.categoriesList.map(item => (
            <li>
              <Button
                onClick={() => {
                  this.selectCategory(item.id, item.name);
                }}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      </FlexContainer>
    );
  }
}

export default SelectCategory;
