import Styled from 'styled-components';

const StyledContainer = Styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const StyledSidebar = Styled.aside`
  max-width: 300px;
  display: flex;
  flex: 0 0 300px;
`;

const StyledMain = Styled.main`
  display: flex;
  flex-grow: 2;
  background: #ffffff;
`;

export default {
  Container: StyledContainer,
  Aside: StyledSidebar,
  Main: StyledMain
}