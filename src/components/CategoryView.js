import React from 'react';
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

const CategoryView = props => {
  return (
    <FlexContainer>
      <Header>Select Category</Header>
      <ul>
        {props.categoriesList.map(item => (
          <li>
            <Button
              onClick={() => {
                props.selectCategory(item.id, item.name);
              }}
            >
              {item.name}
            </Button>
          </li>
        ))}
      </ul>
    </FlexContainer>
  );
};

export default CategoryView;
