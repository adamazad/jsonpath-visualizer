import React from 'react';
import Styled from 'styled-components';

// Feel free to adjust the header height here
const HEADER_HEIGHT = '60px';

const Container = Styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const Content = Styled.div`
  display: flex;
  flex-grow: 1;
`;

const HeaderWrapper = Styled.div`
  text-align: center;
  flex: 0 0 ${HEADER_HEIGHT};
`;

const HeaderInnerWrapper = Styled.header`
  position: fixed;
  width: 100%;
  background: #fff;
  z-index: 1;
  height: ${HEADER_HEIGHT};
  box-shadow: 0px 6px 6px 0 rgba(0,0,0,.12);
`;

/**
 * A wrapper for fixed header
 */
const Header = ({ children }) => (
  <HeaderWrapper>
    <HeaderInnerWrapper>
      { children }
    </HeaderInnerWrapper>
  </HeaderWrapper>
);

export default {
  Container,
  Content,
  Header
}