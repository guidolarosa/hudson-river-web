import Head from 'next/head'
import Root from '@/components/Root';
import styled from 'styled-components';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { fadeUp } from '@/theme/animations';
import { keyframes } from 'styled-components';
import PortfolioList from '@/components/PortfolioList';
import { herokuUrl } from '@/utils/constants';

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
  }, [router.query.section])

  return (
    <>
      <Head>
        <title>Hudson River</title>
        <meta name="description" content="Hudson River" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
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
          <PortfolioList 
            className={'rea'}
            isCurrentView={currentView === 'real-estate-acquisitions'}
            data={props.rea.data}
            handleToggleClick={handleToggleClick}
            type={'rea'}
            title={'Real Estate Acquisitions'}
          />
          <PortfolioList
            className={'investments'}
            isCurrentView={currentView === 'investments'}
            data={props.investments.data}
            handleToggleClick={handleToggleClick}
            type={'investment'}
            title={'Investments'}
          />
        </main>
      </StyledRoot>
    </>
  )
};

const borderCardAnimation = keyframes`
  0% {border-color: transparent};
  100% {border-color: hsla(33, 16%, 89%, 1)};
`;

const StyledRoot = styled(Root)`
  ${props => props.theme.boxSizes.default};
  display: flex;
  flex-direction: column;
  @media ${props => props.theme.bp.md} {
    padding-top: 4rem;
  }
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
      margin-bottom: 5rem;
      &.investments {
        ul {
          .portfolio-item-card {
            h2 {
              font-size: 5rem;
              line-height: 6rem;
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
          font-size: 4.125rem;
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
        .portfolio-item-card {
          margin-bottom: 2rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid transparent;
          animation: 0.25s ${borderCardAnimation} ease-out 2.25s forwards;
          @media ${props => props.theme.bp.lg} {
            margin-bottom: 6rem;
          }
          .header {
            margin-bottom: 3rem;
            opacity: 0;
            animation: 0.25s ${fadeUp} ease-out 1.5s forwards;
            .image {
              position: relative;
              height: 25rem;
              width: 100%;
              transition: 0.35s ease-in-out all;
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
              animation: 0.25s ${fadeUp} ease-out 1.75s forwards;
              @media ${props => props.theme.bp.lg} {
                font-size: 2rem;
              }
            }
            h2 {
              margin-bottom: 1rem;
              font-size: 4rem;
              font-weight: 600;
              line-height: 4.5rem;
              opacity: 0;
              animation: 0.25s ${fadeUp} ease-out 2s forwards;
              @media ${props => props.theme.bp.lg} {
                font-size: 5rem;
                line-height: 6rem;
              }
              @media ${props => props.theme.bp.md} {
                text-overflow: ellipsis;
                width: 100%;
                overflow: hidden;
                line-clamp: 1;
                white-space: nowrap;

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
          animation: 0.25s ${fadeUp} ease-out 2.25s forwards;
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
  const investmentsRes = await fetch(`${herokuUrl}/api/investments?populate=*`);
  const investments = await investmentsRes.json();

  const reaRes = await fetch(`${herokuUrl}/api/real-estate-acquisitions?populate=*`);
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
