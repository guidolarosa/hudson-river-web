import Head from 'next/head'
import Root from '@/components/Root';
import styled from 'styled-components';
import Image from 'next/image';

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Hudson River</title>
        <meta name="description" content="Hudson River" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledRoot>
        <div className="hero">
          <div className="hero-content">
            <h1>Real Estate Private <br/> Equity & Investments</h1>
          </div>
          <Image
            fill
            src={'/homepage/hero-image.png'}
            alt="Hudson River"
            className="hero-background"
          />
        </div>
      </StyledRoot>
    </>
  )
};

const StyledRoot = styled(Root)`
  .hero {
    height: 100%;
    background: blue;
    flex-grow: 1;
    position: relative;
    .hero-background {
      object-fit: cover;
      object-position: 80% 0;
    }
    .hero-content {
      ${props => props.theme.boxSizes.default};
      margin-top: 6rem;
      position: relative;
      z-index: 1;
    }
  }
`;
