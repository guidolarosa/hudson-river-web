import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import navigation from "@/content/navigation";
import Link from "next/link";
import { fadeDown } from "@/theme/animations";

const Navbar = (props) => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();

  return (
    <StyledNavbar>
      <div className="inner-navbar-container">
        <div className="logo-container">
          <Link href="/">
            <Image
              src={'/general/Logo.svg'}
              fill
              alt="Hudson River"
            />
          </Link>
        </div>
        <nav className="desktop-navigation">
          <ul>
            {navigation.map((navigationItem, index) => (
              <li key={navigationItem.label}>
                <Link href={`${navigationItem.url}`} className={`${router.asPath === navigationItem.url ? 'current' : ''}`}>
                  {navigationItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div 
          className={`hamburger-menu ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen)
          }}
        >
          <div/>
          <div/>
        </div>
      </div>
      <div 
        className={`mobile-navigation ${mobileMenuOpen ? 'open' : ''}`}
      >
        <div className="navigation-container">
          <nav>
            <ul>
              {navigation.map((navigationItem, index) => (
                <li key={index} className={`${router.asPath === navigationItem.url ? 'current' : ''}`}>
                  <Link href={navigationItem.url}>{navigationItem.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </StyledNavbar>
  )
};

const StyledNavbar = styled.div`
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${props => props.theme.bp.lg} {
    height: 15rem;
  }
  .inner-navbar-container {
    ${props => props.theme.boxSizes.default};
    position: relative;
    display: inherit;
    justify-content: space-between;
    z-index: 3;
    opacity: 0;
    animation: 0.25s ${fadeDown} forwards ease-out 1s;
    .logo-container {
      width: 20rem;
      height: 4rem;
      position: relative;
      @media ${props => props.theme.bp.lg} {
        width: 26.5rem;
        height: 5rem;
      }
    }
    .desktop-navigation {
      display: none;
      ul {
        display: flex;
        li {
          margin-left: 7rem;
          a {
            font-size: 2rem;
            text-transform: uppercase;
            font-weight: 500;
            letter-spacing: 0.03em;
            &.current {
              color: ${props => props.theme.colors.gold500};
              position: relative;
              &:after {
                bottom: -1rem;
                left: 0;
                width: 100%;
                height: 1px;
                position: absolute;
                content: '';
                background: ${props => props.theme.colors.gold100};
              }
            }
          }
        }
      }
      @media ${props => props.theme.bp.lg} {
        display: flex;
        align-items: center;
      }
    }
    .hamburger-menu {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      @media ${props => props.theme.bp.lg} {
        display: none;
      }
      &.open {
        div {
          &:first-of-type {
            transform: rotate(-45deg);
          }
          &:last-of-type {
            transform: rotate(45deg);
          }
        }
      }
      div {
        height: 1px;
        width: 2.25rem;
        background: ${props => props.theme.colors.gold900};
        position: absolute;
        transition: 0.25s ease-in-out all;
        &:first-of-type {
          transform: translateY(-0.5rem);
        }
        &:last-of-type {
          transform: translateY(0.5rem);
        }
      }
    }
  }
  .mobile-navigation {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    top: 0;
    background: ${props => props.theme.colors.gold25};
    opacity: 0;
    pointer-events: none;
    transition: 0.2s ease-in-out all;
    top: 10rem;
    &.open {
      opacity: 1;
      pointer-events: unset;
      top: 0;
    }
    .navigation-container {
      ${props => props.theme.boxSizes.default};
      margin-top: 14rem;
      position: relative;
      nav {
        ul {
          li {
            font-size: 2.37rem;
            text-transform: uppercase;
            padding: 2rem 0;
            border-bottom: 1px solid ${props => props.theme.colors.offWhite};
            letter-spacing: 0.03em;
            &.current {
              border-color: ${props => props.theme.colors.gold500};
              a {
                color: ${props => props.theme.colors.gold500};
              }
            }
          }
        }
      }
    }
  }
`;

export default Navbar;