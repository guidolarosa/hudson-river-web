const bp = {
  md: `(min-width: 768px)`,
  lg: `(min-width: 1280px)`,
  xl: `(min-width: 1600px)`,
}

const theme = {
  colors: {
    offWhite: 'hsla(40, 100%, 99%, 1)',
    gold25: 'hsla(34, 41%, 97%, 1)',
    gold50: 'hsla(33, 16%, 89%, 1)',
    gold100: 'hsla(28, 13%, 75%, 1)',
    gold500: 'hsla(31, 21%, 51%, 1)',
    gold900: 'hsla(31, 20%, 9%, 1)',
    error: 'hsla(343, 79%, 50%, 1)'
  },
  bp: bp,
  boxSizes: {
    default: `
      width: calc(100% - 6rem);
      margin: 0 auto;
      @media ${bp.md} {
        width: calc(100% - 12rem);
      } 
      @media ${bp.lg} {
        width: calc(100% - 16rem);
      } 
      @media ${bp.xl} {
        width: calc(100% - 30rem);
      } 
    `
  }
};

export default theme;