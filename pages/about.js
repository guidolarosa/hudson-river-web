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
        <meta name="description" content="Hudson River" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
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
    strong {
      color: ${props => props.theme.colors.gold500};
      font-weight: 600;
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
    .about-image-container {
      position: relative;
      width: 100%;
      height: 22.5rem;
      margin-top: 2rem;
      opacity: 0;
      animation: 0.5s ${fadeUp} 1.25s forwards;
      .about-image {
        object-fit: cover;
      }
      @media ${props => props.theme.bp.md} {
        margin-top: 0;
        height: 41rem;
      }
      @media ${props => props.theme.bp.lg} {
        max-width: 85rem;
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