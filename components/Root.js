import styled from 'styled-components';
import { Cormorant_Garamond } from '@next/font/google';
import Navbar from './Navbar';

const cormorantGaramond = Cormorant_Garamond({subsets: ['latin'], weight: ['300', '400', '500', '600', '700']});

const Root = (props) => {
  return (
    <div className={`${cormorantGaramond.className}`}>
      <Navbar/>
      <StyledRoot {...props}>
        {props.children}
        {/* <Footer /> */}
      </StyledRoot>
    </div>
  );
};

const StyledRoot = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default Root;