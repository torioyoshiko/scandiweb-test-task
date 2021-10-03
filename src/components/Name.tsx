import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const NameOfCategory = styled.div<{ selected: boolean }>`
  height: 55px;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  margin: 3px;

  &:hover {
    color: #5ECE7B;
    border-bottom: 2px solid #5ECE7B;
    cursor: pointer;
  }

  ${({ selected }) => selected && `
    color: #5ECE7B;
    border-bottom: 2px solid #5ECE7B;
  `}
`;

interface NameProps {
  nameOfCategory: string
  currentlyChosen: boolean
  to: string
}

class Name extends Component<NameProps> {
  render() {
    return (
      <StyledLink to={this.props.to}>
        <NameOfCategory
          selected={!this.props.currentlyChosen}
          key={this.props.nameOfCategory}
        >
          {this.props.nameOfCategory?.toUpperCase()}
        </NameOfCategory>
      </StyledLink>
    );
  }
}

export default Name;
