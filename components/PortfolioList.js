import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import { Inter } from 'next/font/google';
import ReactMarkdown from "react-markdown";
import { fadeUp } from '@/theme/animations';
import { keyframes } from 'styled-components';

const inter = Inter({ subsets: ['latin'] })

const ItemCard = ({content, type}) => {
  return (
    <StyledPortfolioItemCard className="portfolio-item-card">
      <div className="header">
        <div className="image">
          <Image
            fill
            src={content.mainImage}
            alt={content.name}
          />
        </div>
      </div>
      <div className="body">
        {type === 'rea' && (
          <div className={`city ${inter.className}`}>
            {content.location}
          </div>
        )}
        <h2>{content.name}</h2>
        {type === 'investment' && (
          <ReactMarkdown className={inter.className}>
            {content.description}
          </ReactMarkdown>
        )}
      </div>
    </StyledPortfolioItemCard>
  )
}


const PortfolioList = ({data, className, isCurrentView, type, title}) => {

  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <StyledPortfolioList 
      className={`portfolio-list ${className} ${isCurrentView ? 'show' : ''} ${isOpen ? 'toggle-open' : ''}`}>
      <div 
        className="list-visibility-toggle" 
        onClick={() => { 
          setIsOpen(!isOpen);
        }}
      >
        <h1>{title}</h1>
        <div className="chevron">
          <Image
            fill
            src={'/general/chevron-down.svg'}
            alt={'Toggle'}
          />
        </div>
      </div>
      <ul>
        {data.map((content, index) => (
          <li key={index}>
            {type === 'rea' ? (
              <Link 
                href={`/portfolio/real-estate-acquisitions/${content.slug.current}`}
              >
                <ItemCard content={content} type={type}/>
              </Link>
            ) : (
              <ItemCard content={content} type={type} />
            )}
          </li>
        ))}
      </ul>
    </StyledPortfolioList>
  )
}

const borderCardAnimation = keyframes`
  0% {border-color: transparent};
  100% {border-color: hsla(33, 16%, 89%, 1)};
`;

const StyledPortfolioList = styled.div`
  display: block;
  margin-bottom: 5rem;
  &.investments {
    .portfolio-item-card {
      .header {
        width: 100%;
        height: 25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${props => props.theme.colors.gold25};
        .image {
          max-width: 25rem;
          max-height: 10.5rem;
          img {
            object-fit: contain;
            object-position: center;
          }
        }
      }
      .body {
        font-weight: 300;
        opacity: 0;
        animation: 1s ${fadeUp} ease-out 2.5s forwards;
        h2 {
          font-size: 3.5rem;
          line-height: 4.5rem;
          opacity: 1;
          animation: none;
          @media ${props => props.theme.bp.lg} {
            font-size: 4.125rem;
            line-height: 6rem;
          }
        }
        @media ${props => props.theme.bp.lg} {
          min-height: 22rem;
        }
        @media ${props => props.theme.bp.xl} {
          min-height: 20rem;
        }
        p {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        a {
          color:  ${props => props.theme.colors.gold500};
        }
      }
    }
  }
  &.rea {
    ul {
      li {
        &:hover {
          .body {
            .city,
            h2 {
              color: ${props => props.theme.colors.gold500};
            }
          }
          .portfolio-item-card {
            .header {
              .image {
                &:after {
                  opacity: 1;
                  border: 1rem solid ${props => props.theme.colors.gold25};
                }
              }
            }
          }
        }
      }
    }
  }
  .list-visibility-toggle {
    display: flex;
    border-bottom: 1px solid ${props => props.theme.colors.gold100};
    padding: 2rem 0;
    margin-bottom: 2rem;
    align-items: center;
    justify-content: space-between;
    @media ${props => props.theme.bp.lg} {
      display: none;
    }
    h1 {
      cursor: pointer;
      font-size: 3.5rem;
    }
    .chevron {
      position: relative;
      width: 3rem;
      height: 3rem;
      transition: 0.25s ease-in-out all;
    }
  }
  @media ${props => props.theme.bp.lg} {
    display: none;
  }
  &.show {
    display: block;
  }
  &.toggle-open {
    .list-visibility-toggle {
      .chevron {
        transform: rotate(180deg);
      }
    }
    ul {
      max-height: 300rem;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0rem 4rem;
    width: 100%;
    overflow-y: hidden;
    max-height: 0;
    transition: 0.5s ease-in-out all;
    @media ${props => props.theme.bp.lg} {
      overflow-y: visible;
      max-height: unset;
    }
    li {
      width: 100%;
      @media ${props => props.theme.bp.md} {
        width: calc(50% - 2rem);
      }
    }
  }
`;

const StyledPortfolioItemCard = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid transparent;
  animation: 0.25s ${borderCardAnimation} ease-out 2.25s forwards;
  @media ${props => props.theme.bp.lg} {
    margin-bottom: 6rem;
  }
  .header {
    margin-bottom: 3rem;
    .image {
      position: relative;
      height: 25rem;
      width: 100%;
      opacity: 0;
      animation: 1s ${fadeUp} ease-out 2s forwards;
      &:after {
        border: 0rem solid ${props => props.theme.colors.gold25};
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 100%;
        z-index: 2;
        transition: 0.25s ease-in-out all;
        box-sizing: border-box;
      }
      @media ${props => props.theme.bp.lg} {
        height: 35.25rem;
      }
      img {
        object-fit: cover;
        object-position: center;
      }
    }
  }
  .body {
    @media ${props => props.theme.bp.md} {
      overflow: hidden;
    }
    h2,
    .city {
      transition: 0.25s ease-in-out color;
    }
    .city {
      text-transform: uppercase;
      font-weight: 300;
      margin-bottom: 0.5rem;
      font-size: 1.625rem;
      opacity: 0;
      animation: 1s ${fadeUp} ease-out 2.5s forwards;
    }
    h2 {
      margin-bottom: 1rem;
      font-size: 3.5rem;
      font-weight: 600;
      line-height: 4.5rem;
      opacity: 0;
      animation: 1s ${fadeUp} ease-out 3s forwards;
      @media ${props => props.theme.bp.md} {
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
        line-clamp: 1;
        white-space: nowrap;
      }
      @media ${props => props.theme.bp.lg} {
        font-size: 4.125rem;
        line-height: 6rem;
      }
    }
  }
`;

export default PortfolioList;