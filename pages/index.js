import Head from "next/head";
import Root from "@/components/Root";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { fadeUp, fadeIn } from "@/theme/animations";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hudson River</title>
        <meta name="title" content="Hudson River" />
        <meta
          name="description"
          content="Hudson River Companies is a real estate acquisition and investment firm focused on risk adjusted opportunistic strategy."
        />
        <meta
          name="keywords"
          content="real estate, investments, real estate acquisitions, new york, atlanta, georgia, USA, saral gupta"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquivv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Guido La Rosa, Entrecasas Studio"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta property={"og:title"} content="Hudson River" />
        <meta
          property={"og:image"}
          content="https://i.ibb.co/Snst5hs/thumbnail.png"
        />
        <meta
          property={"og:description"}
          content="Hudson River Companies is a real estate acquisition and investment firm focused on risk adjusted opportunistic strategy."
        />
        <meta property={"og:url"} content="https://www.hudsonriverco.com" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
      </Head>
      <StyledRoot isIndex={true}>
        <div className="init-animation">
          <div className="init-image">
            <object type="image/svg+xml" data="/homepage/intro.svg" />
          </div>
        </div>
        <div className="hero">
          <div className="hero-content">
            <h1>
              Real Estate Private <br /> Equity & Investments
            </h1>
          </div>
          <Image
            fill
            src={"/homepage/hero-image-mobile.png"}
            alt="Hudson River"
            className="hero-background hero-background-mobile"
          />
          <Image
            fill
            src={"/homepage/hero-image.png"}
            alt="Hudson River"
            className="hero-background hero-background-desktop"
          />
        </div>
      </StyledRoot>
    </>
  );
}

const fadeOut = keyframes`
  0% {opacity: 1};
  100% {opacity: 0};
`;

const StyledRoot = styled(Root)`
  .init-animation {
    background: ${(props) => props.theme.colors.offWhite};
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
    background: #ebebed;
    overflow: hidden;
    opacity: 0;
    animation: 1s ${fadeIn} ease-out 3.5s forwards;
    .hero-background {
      object-fit: cover;
      object-position: 45% 0;
      @media ${(props) => props.theme.bp.md} {
        object-position: 80% 20%;
      }
      @media ${(props) => props.theme.bp.lg} {
        object-position: 80% 0rem;
        transform: scale(1.5) translateX(-25rem);
      }
      @media ${(props) => props.theme.bp.xl} {
        object-position: 80% -5rem;
        transform: scale(1.5) translateX(-25rem);
      }
      &.hero-background-mobile {
        @media ${(props) => props.theme.bp.md} {
          display: none;
        }
      }
      &.hero-background-desktop {
        display: none;
        @media ${(props) => props.theme.bp.md} {
          display: block;
        }
      }
    }
    .hero-content {
      ${(props) => props.theme.boxSizes.default};
      margin-top: 6rem;
      position: relative;
      z-index: 1;
      opacity: 0;
      animation: 1s ${fadeUp} 4.5s ease-out forwards;
      @media ${(props) => props.theme.bp.md} {
        margin-top: 11rem;
      }
      @media ${(props) => props.theme.bp.xl} {
        margin-top: 15rem;
      }
    }
  }
`;
