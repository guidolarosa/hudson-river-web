import styled from 'styled-components';
import Head from 'next/head'
import Image from 'next/image';
import Root from '@/components/Root';
import { Inter } from '@next/font/google';
import { fadeUp } from '@/theme/animations';

const inter = Inter({subsets: ['latin']})

const About = (props) => {
  return (
    <>
      <Head>
      <title>Hudson River | About</title>
        <meta name="title" content="Hudson River | About"/>
        <meta name="description" content="Hudson River Companies is a real estate acquisition and investment firm focused on risk adjusted opportunistic strategy."/>
        <meta name="keywords" content="real estate, investments, real estate acquisitions, new york, atlanta, georgia, USA, saral gupta"/>
        <meta name="robots" content="index, follow"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="language" content="English"/>
        <meta name="author" content="Guido La Rosa, Entrecasas Studio"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta property={'og:title'} content='Hudson River | About'/>
        <meta property={'og:image'} content='https://i.ibb.co/Snst5hs/thumbnail.png'/>
        <meta property={'og:description'} content='Hudson River Companies is a real estate acquisition and investment firm focused on risk adjusted opportunistic strategy.'/>
        <meta property={'og:url'} content='https://hudsonriverco.com'/>
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='627' />
      </Head>
      <StyledAbout>
        <div className="about-header">
          <strong>
            Hudson River Companies is a real estate acquisition and investment firm focused on risk adjusted opportunistic strategy.
          </strong>
        </div>
        <div className="separator" />
        <div className="about-body">
          <div className="about-image-container">
            <Image className={'about-image'} src="/about/Founder.png" fill alt="Saral Gupta" />
          </div>
          <div className={`about-content ${inter.className}`}>
            <strong>Founder | Principal</strong>
            <p>
              Saral Gupta founded Hudson River Companies in 2018 to take an entrepreneurial and creative approach to opportunistic real estate acquisitions and investing. Prior to founding HRC, Saral worked at General Motors asset Management, in the alternative investments group and at BNY Mellon as an AVP. Saral has an undergraduate degree in Finance from Rutgers Business School and a M.S. in Real Estate Development & Finance from New York University.
            </p>
          </div>
        </div>
      </StyledAbout>
    </>
  )
};

const StyledAbout = styled(Root)`
  .about-header {
    ${props => props.theme.boxSizes.default};
    padding: 6rem 0;
    border-bottom: 0.5rem solid ${props => props.theme.colors.gold500};
    opacity: 0;
    animation: 0.5s ${fadeUp} 1s forwards;
    @media ${props => props.theme.bp.md} {
      padding: 12rem 9rem;
      text-align: center;
    }
    @media ${props => props.theme.bp.lg} {
      display: flex;
      align-items: center;
      height: 29rem;
      max-width: calc(100vw - 44rem);
    }
    @media ${props => props.theme.bp.xl} {
      height: 38.5rem;
      max-width: calc(100vw - 65.75rem);
    }
    strong {
      color: ${props => props.theme.colors.gold500};
      font-weight: 400;
      font-size: 2.875rem;
      @media ${props => props.theme.bp.md} {
        font-size: 4rem;
      }
      @media ${props => props.theme.bp.xl} {
        font-size: 5rem;
      }
    }
  }
  .separator {
    border-top: 1px solid ${props => props.theme.colors.gold100};
    opacity: 0;
    animation: 0.5s ${fadeUp} 1s forwards;
  }
  .about-body {
    @media ${props => props.theme.bp.md} {
      ${props => props.theme.boxSizes.default};
      display: flex;
      gap: 4.125rem;
      padding-top: 6rem;
      padding-bottom: 29rem;
    }
    @media ${props => props.theme.bp.lg} {
      max-width: calc(100vw - 44rem);
    }
    @media ${props => props.theme.bp.xl} {
      max-width: calc(100vw - 65.75rem);
    }
    .about-image-container {
      position: relative;
      width: 100%;
      height: 50vw;
      margin-top: 2rem;
      opacity: 0;
      animation: 0.5s ${fadeUp} 1.25s forwards;
      .about-image {
        object-fit: cover;
        object-position: center;
      }
      @media ${props => props.theme.bp.md} {
        margin-top: 0;
        height: 41rem;
        flex-grow: 1;
      }
      @media ${props => props.theme.bp.lg} {
        max-width: 72rem;
        max-height: 32rem;
      }
      @media ${props => props.theme.bp.xl} {
        max-width: unset;
        max-height: 44rem;
      }
    }
    .about-content {
      ${props => props.theme.boxSizes.default};
      margin-top: 2.5rem;
      font-size: 2rem;
      line-height: 2.7rem;
      padding-bottom: 8rem;
      opacity: 0;
      animation: 0.5s ${fadeUp} 1.5s forwards;
      @media ${props => props.theme.bp.md} {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 0;
        flex-grow: 1;
        margin-top: 0;
      }
      @media ${props => props.theme.bp.xl} {
        font-size: 2.375rem;
        line-height: 3.25rem;
      }
      strong {
        margin-bottom: 2rem;
        display: inline-block;
        color: ${props => props.theme.colors.gold500};
        font-weight: 300;
      }
      p {
        font-weight: 300;
      }
    }
  }
`;

export default About;