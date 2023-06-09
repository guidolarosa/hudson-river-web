import Head from 'next/head'
import Root from '@/components/Root';
import styled from 'styled-components';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
      <title>Hudson River | Portfolio</title>
        <meta name="title" content="Hudson River | Portfolio"/>
        <meta name="description" content="Hudson River Companies is a real estate acquisition and investment firm focused on risk adjusted opportunistic strategy."/>
        <meta name="keywords" content="real estate, investments, real estate acquisitions, new york, atlanta, georgia, USA, saral gupta"/>
        <meta name="robots" content="index, follow"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="language" content="English"/>
        <meta name="author" content="Guido La Rosa, Entrecasas Studio"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta property={'og:title'} content='Hudson River | Portfolio'/>
        <meta property={'og:image'} content='https://i.ibb.co/Snst5hs/thumbnail.png'/>
        <meta property={'og:description'} content='Hudson River Companies is a real estate acquisition and investment firm focused on risk adjusted opportunistic strategy.'/>
        <meta property={'og:url'} content='https://www.hudsonriverco.com'/>
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='627' />
      </Head>
      <StyledRoot>
        <Sidebar>
          <ul>
            <li 
              role="button" 
              onClick={() => { 
                router.push('/portfolio/real-estate-acquisitions') 
              }}
              className={`${currentView === 'real-estate-acquisitions' ? 'current' : ''}`}
            >
              Real Estate Acquisitions
            </li>
            <li 
              role="button" 
              onClick={() => { 
                router.push('investments') 
              }}
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
