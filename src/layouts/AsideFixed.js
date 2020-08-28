import Styled from 'styled-components';

const MARGIN_X = `20px`;

const StyledContainer = Styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const StyledSidebar = Styled.aside`
  position: fixed;
  width: 400px;
  top: 30px;
  margin-right: ${MARGIN_X};
  margin-left: ${MARGIN_X};
  display: flex;
`;

const StyledMain = Styled.main`
  margin-right: ${MARGIN_X};
  margin-left: ${MARGIN_X};
  display: flex;
  flex-grow: 2;
  background: #ffffff;
`;

export default {
  Container: StyledContainer,
  Aside: StyledSidebar,
  Main: StyledMain
}