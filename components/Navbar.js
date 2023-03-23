import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import navigation from "@/content/navigation";
import Link from "next/link";

const Navbar = (props) => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();

  console.log(router);

  return (
    <StyledNavbar>
      <div className="inner-navbar-container">
        <div className="logo-container">
          <Image
            src={'/general/Logo.svg'}
            fill
            alt="Hudson River"
          />
        </div>
        <nav className="desktop-navigation">
          <ul>
            {navigation.map((navigationItem, index) => (
              <li key={navigationItem.label}>
                <Link href={`${navigationItem.url}`} className={`${router.pathname === navigationItem.url ? 'current' : ''}`}>
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
    </StyledNavbar>
  )
};

const StyledNavbar = styled.div`
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .inner-navbar-container {
    ${props => props.theme.boxSizes.default};
    position: relative;
    display: inherit;
    justify-content: space-between;
    .logo-container {
      width: 20rem;
      height: 4rem;
      position: relative;
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

`;

export default Navbar;