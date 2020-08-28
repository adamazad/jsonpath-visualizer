import React from 'react';
import Styled from 'styled-components';

const StyledWrapper = Styled.div`
  background: #e63946;
  color: #fff;
  padding: 0px 10px;
  border-radius: 4px;
`;

/**
 * @param {Object} props
 * @param {Error} props.error
 */
const ErrorMessage = ({ error }) => {

  if (!error) {
    return null;
  }

  return (
    <StyledWrapper>
      <>{ error.message ? error.message : error }</>
    </StyledWrapper>
  );

}

export default ErrorMessage;