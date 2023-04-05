import Head from 'next/head'
import Root from '@/components/Root';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { fadeUp } from '@/theme/animations';

export default function Home() {
  return (
    <>
      <Head>
        <title>Hudson River</title>
        <meta name="description" content="Hudson River" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <StyledRoot>
        <div className="init-animation">
          <div className="init-image">
            <object 
              type="image/svg+xml" 
              data="/homepage/intro.svg"
            />
          </div>
        </div>
        <div className="hero">
          <div className="hero-content">
            <h1>Real Estate Private <br/> Equity & Investments</h1>
          </div>
          <Image
            fill
            src={'/homepage/hero-image-mobile.png'}
            alt="Hudson River"
            className="hero-background hero-background-mobile"
          />
          <Image
            fill
            src={'/homepage/hero-image.png'}
            alt="Hudson River"
            className="hero-background hero-background-desktop"
          />
        </div>
      </StyledRoot>
    </>
  )
};

const fadeOut = keyframes`
  0% {opacity: 1};
  100% {opacity: 0};
`;

const StyledRoot = styled(Root)`
  .init-animation {
    background: ${props => props.theme.colors.offWhite};
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    animation: 1s ${fadeOut} 2s forwards ease-out;
  }
  .hero {
    height: 100%;
    flex-grow: 1;
    position: relative;
    .hero-background {
      object-fit: cover;
      object-position: 80% 0;
      &.hero-background-mobile {
        @media ${props => props.theme.bp.md} {
          display: none;
        }
      }
      &.hero-background-desktop {
        display: none;
        @media ${props => props.theme.bp.md} {
          display: block;
        }
      }
    }
    .hero-content {
      ${props => props.theme.boxSizes.default};
      margin-top: 6rem;
      position: relative;
      z-index: 1;
      opacity: 0;
      animation: 0.25s ${fadeUp} 2.25s ease-out forwards;
      @media ${props => props.theme.bp.md} {
        margin-top: 11rem;
      }
      @media ${props => props.theme.bp.xl} {
        margin-top: 15rem;
      }
    }
  }
`;
