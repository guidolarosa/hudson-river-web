import Head from 'next/head'
import Root from '@/components/Root';
import styled from 'styled-components';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({subsets: ['latin'], weight: ['300', '400', '500', '600', '700']});

export default function Portfolio(props) {
  const [currentView, setCurrentView] = useState('real-estate-acquisitions');

  const handleToggleClick = (list) => {
    if (currentView === list) {
      setCurrentView(null)
    } else {
      setCurrentView(list)
    }
  };

  const router = useRouter();
  
  useEffect(() => {
    let section = router.query.section;
    setCurrentView(section);
  }, [])

  return (
    <>
      <Head>
        <title>Hudson River</title>
        <meta name="description" content="Hudson River" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledRoot>
        <Sidebar>
          <ul>
            <li 
              role="button" 
              onClick={() => { router.push('/portfolio/real-estate-acquisitions') }}
              className={`${currentView === 'real-estate-acquisitions' ? 'current' : ''}`}
            >
              Real Estate Acquisitions
            </li>
            <li 
              role="button" 
              onClick={() => { router.push('investments') }}
              className={`${currentView === 'investments' ? 'current' : ''}`}
            >
              Investments
            </li>
          </ul>
        </Sidebar>
        <main className="list-content">
          <div className={`rea portfolio-list ${currentView === 'real-estate-acquisitions' ? 'show' : ''}`}>
            <div 
              className="list-visibility-toggle" 
              onClick={() => { 
                handleToggleClick('real-estate-acquisitions') 
              }}
            >
              <h1>Real Estate Acquisitions</h1>
            </div>
            <ul>
              {props.rea.data.map((content, index) => (
                <li key={index}>
                  <Link href={`/real-estate-acquisitions/${content.attributes.Slug}`}>
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
          <div className={`investments portfolio-list ${currentView === 'investments' ? 'show' : ''}`}>
            <div 
              className="list-visibility-toggle" 
              onClick={() => { handleToggleClick('investments') }}
            >
              <h1>Investments</h1>
            </div>
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
    display: none;
    @media ${props => props.theme.bp.lg} {
      display: block;
    }
  }
  .list-content {
    grid-area: lists;
    .portfolio-list {
      display: none;
      display: block;
      .list-visibility-toggle {
        display: block;
        @media ${props => props.theme.bp.lg} {
          display: none;
        }
        h1 {
          cursor: pointer;
          margin-bottom: 2rem;
          padding: 2rem 0;
          border-bottom: 1px solid ${props => props.theme.colors.gold100};
          font-size: 4rem;
        }
      }
      @media ${props => props.theme.bp.lg} {
        display: none;
      }
      &.show {
        display: block;
        ul {
          max-height: 300rem;;
          @media ${props => props.theme.bp.lg} {
          }
        }
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0rem 4rem;
      width: 100%;
      overflow-y: hidden;
      max-height: 0;
      transition: 0.25s ease-in-out all;
      @media ${props => props.theme.bp.lg} {
        overflow-y: visible;
        max-height: unset;
      }
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
              font-weight: 300;
              margin-bottom: 0.5rem;
              font-size: 1.5rem;
              @media ${props => props.theme.bp.lg} {
                font-size: 2rem;
              }
            }
            h2 {
              margin-bottom: 1rem;
              font-size: 4rem;
              font-weight: 700;
              line-height: 4.5rem;
              @media ${props => props.theme.bp.lg} {
                font-size: 5rem;
                line-height: 6rem;
              }
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

export async function getStaticPaths(context) {
  return {
    paths: [
      {
        params: {
          section: 'real-estate-acquisitions'
        }
      },
      {
        params: {
          section: 'investments'
        }
      },
    ],
    fallback: false
  }
}
