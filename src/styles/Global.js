import { createGlobalStyle,  } from 'styled-components';
import { reboot } from 'styled-reboot';
import Theme from './Theme';
// Styled does not work with @import
import './fonts.css';

const GlobalStyle = createGlobalStyle`
  ${reboot}

  html,
  body,
  #root {
    height: 100%;
    width: 100%;
    position: absolute;
  }

  body,
  input,
  button {
    font-family: ${Theme.fonts.base};
    font-size: 16px;
    line-height: 1.5;
  }

  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4,
  h5,
  .h5,
  h6,
  .h6 {
    font-family: ${Theme.fonts.heading};
  }

  input,
  textarea {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: ${Theme.colors.white};
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  input:focus,
  textarea:focus {
    border: 1px solid ${Theme.colors.black};
    outline: ${Theme.colors.black};
  }

  a {
    color: ${Theme.colors.black};
  }

  button {
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;

    &.primary {
      text-transform: uppercase;
      background: ${Theme.colors.black};
      color: ${Theme.colors.white};
      border: 1px solid ${Theme.colors.white};
    }

    &.link {
      border: 1px solid transparent;
      background: transparent;
      padding: 0px;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  button[disabled] {
    background: #ac98e8;
    cursor: not-allowed;
  }

`;

export default GlobalStyle;
