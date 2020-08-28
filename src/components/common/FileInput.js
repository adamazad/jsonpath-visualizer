import React from 'react';
import Styled from 'styled-components';

const InputContainer = Styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  & * {
    cursor: pointer;
  }
`;

const StyledFileInput = Styled.input`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  background: none repeat scroll 0 0 transparent;
  cursor: inherit;
  display: block;
`;

export default ({ children, className, ...props }) => (
  <InputContainer className={className}>
    {children}
    <StyledFileInput type="file" { ...props } />
  </InputContainer>
)