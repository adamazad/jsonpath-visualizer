import React from 'react';
import Styled from 'styled-components';

const StyledContainer = Styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const StyledSidebar = Styled.aside`
  max-width: 400px;
`;

const StyledMain = Styled.main`
  flex-grow: 2;
  background: #ffffff;
`;

function PancakeStack({ aside: AsideComponent, main: MainComponent }) {

  return (
    <StyledContainer>
      <StyledSidebar>
        <AsideComponent />
      </StyledSidebar>
      <StyledMain>
        <MainComponent />
      </StyledMain>
    </StyledContainer>
  );

}

export default PancakeStack;