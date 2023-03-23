import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body, html {
    background: ${props => props.theme.colors.offWhite};
    color: ${props => props.theme.colors.gold900};
    font-size: 8px;
  }

  body {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  ul, li {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  h1 {
    font-size: 4.125rem;
    color: ${props => props.theme.colors.gold500};
    font-weight: 600;
  }
`;

export default GlobalStyles;