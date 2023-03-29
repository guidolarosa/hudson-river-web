import Head from 'next/head'
import Root from '@/components/Root';
import styled from 'styled-components';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const inter = Inter({subsets: ['latin'], weight: ['300', '400', '500', '600', '700']});

export default function Portfolio(props) {
  const [currentView, setCurrentView] = useState('rea');
  return (
    <>
      <Head>
        <title>Hudson River</title>
        <meta name="description" content="Hudson River" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledRoot>
        <div className="sidebar">
          <ul>
            <li 
              role="button" 
              onClick={() => { setCurrentView('rea') }}
              className={`${currentView === 'rea' ? 'current' : ''}`}
            >
              Real Estate Acquisitions
            </li>
            <li 
              role="button" 
              onClick={() => { setCurrentView('investments') }}
              className={`${currentView === 'investments' ? 'current' : ''}`}
            >
              Investments
            </li>
          </ul>
        </div>
        <main className="list-content">
          {currentView === 'rea' ? (
            <div className="rea">
              <ul>
                {props.rea.data.map((content, index) => (
                  <li key={index}>
                    <Link href={`/real-estate-aquicisitions/${content.attributes.Slug}`}>
                      <div className="portfolio-item-card">
                        <div className="header">
                          <div className="image">
                            <Image
                              fill
                              src={content.attributes.MainImage.data.attributes.url}
                              alt={content.attributes.Name}
                            />
                          </div>
                        </div>
                        <div className="body">
                          <div className={`city ${inter.className}`}>{content.attributes.City}</div>
                          <h2>{content.attributes.Name}</h2>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="investments">
              <ul>
                {props.investments.data.map((content, index) => (
                  <li key={index}>
                    <Link href={`/investments/${content.attributes.Slug}`}>
                      <div className="portfolio-item-card">
                        <div className="header">
                          <div className="image">
                            <Image
                              fill
                              src={content.attributes.MainImage.data.attributes.url}
                              alt={content.attributes.Name}
                            />
                          </div>
                        </div>
                        <div className="body">
                          <h2>{content.attributes.Name}</h2>
                          <ReactMarkdown className={inter.className}>
                            {content.attributes.Excerpt}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </StyledRoot>
    </>
  )
};

const StyledRoot = styled(Root)`
  ${props => props.theme.boxSizes.default};
  display: flex;
  flex-direction: column;
  @media ${props => props.theme.bp.lg} {
    padding-top: 6rem;
    display: grid !important;
    grid-template-columns: 25rem 1fr;
    grid-template-rows: 100%;
    grid-template-areas: 
      'sidebar lists';
    grid-column-gap: 4rem;
  }
  .sidebar {
    grid-area: sidebar;
    ul {
      li {
        font-size: 4rem;
        margin-bottom: 4rem;
        transition: 0.25s ease-in-out color;
        cursor: pointer;
        border-bottom: 1px solid ${props => props.theme.colors.gold100};
        padding-bottom: 2rem;
        position: relative;
        &:before {
          content: '';
          width: 2rem;
          height: 2rem;
          background-image: url('/general/arrow.svg');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          position: absolute;
          left: -4rem;
          top: 1.5rem;
          opacity: 0;
          transition: 0.25s ease-in-out opacity;
        }
        &:last-of-type {
          border-bottom: none;
        }
        &.current {
          color: ${props => props.theme.colors.gold500};
          &:before {
            opacity: 1;
          }
        }
      }
    }
  }
  .list-content {
    grid-area: lists;
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0rem 4rem;
      width: 100%;
      li {
        width: 100%;
        @media ${props => props.theme.bp.md} {
          width: calc(50% - 2rem);
        }
        .portfolio-item-card {
          margin-bottom: 6rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid ${props => props.theme.colors.gold50};
          .header {
            margin-bottom: 3rem;
            .image {
              position: relative;
              height: 25rem;
              width: 100%;
              @media ${props => props.theme.bp.md} {
                height: 35.25rem;
              }
              img {
                object-fit: cover;
              }
            }
          }
          .body {
            .city {
              text-transform: uppercase;
              font-size: 2rem;
              font-weight: 300;
              margin-bottom: 0.5rem;
            }
            h2 {
              font-size: 5rem;
              font-weight: 700;
              line-height: 6rem;
              margin-bottom: 1rem;
            }
          }
        }
      }
    }
    .investments {
      .portfolio-item-card {
        .header {
          width: 100%;
          height: 25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${props => props.theme.colors.gold25};
          @media ${props => props.theme.bp.md} {
            height: 35.25rem;
          }
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
  }
`;

export async function getStaticProps(context) {
  const investmentsRes = await fetch('https://hudson-river-admin.herokuapp.com/api/investments?populate=*');
  const investments = await investmentsRes.json();

  const reaRes = await fetch('https://hudson-river-admin.herokuapp.com/api/real-estate-acquisitions?populate=*');
  const rea = await reaRes.json();

  return {
    props: {
      investments: investments,
      rea: rea
    }
  }
}
