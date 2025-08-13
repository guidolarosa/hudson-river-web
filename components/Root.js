import styled from 'styled-components';
import { Cormorant_Garamond } from 'next/font/google';
import Navbar from './Navbar';

const cormorantGaramond = Cormorant_Garamond({subsets: ['latin'], weight: ['300', '400', '500', '600', '700']});

const Root = (props) => {
  return (
    <div className={`${cormorantGaramond.className}`}>
      <Navbar isIndex={props.isIndex} />
      <StyledRoot {...props}>
        {props.children}
      </StyledRoot>
    </div>
  );
};

const StyledRoot = styled.div`
  min-height: calc(100vh - 10rem);
  display: flex;
  flex-direction: column;
  @media ${props => props.theme.bp.lg} {
    min-height: calc(100vh - 15rem);
  }
`;

export default Root;