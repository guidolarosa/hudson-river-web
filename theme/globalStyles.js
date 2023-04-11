import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body, html {
    background: ${props => props.theme.colors.offWhite};
    color: ${props => props.theme.colors.gold900};
    font-size: 8px;
    overflow-x: hidden;
  }
  
  body {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, p, a {
    margin: 0;
  }

  ul, li {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.gold900};
  }

  h1 {
    font-size: 3.5rem;
    color: ${props => props.theme.colors.gold500};
    font-weight: 500;
    @media ${props => props.theme.bp.md} {
      font-size: 5rem;
    }
  }
    
  .page-transition-enter {
    opacity: 0;
  }
  .page-transition-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

export default GlobalStyles;