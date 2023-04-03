import Head from 'next/head'
import Root from '@/components/Root';
import styled from 'styled-components';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/router';

const inter = Inter({subsets: ['latin'], weight: ['300', '400', '500', '600', '700']});

export default function REA(props) {

  let {
    Name,
    City,
    Description,
    MainImage,
    Slug
  } = props.rea.data[0].attributes;

  const router = useRouter();

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
              className={`current`}
            >
              Real Estate Acquisitions
            </li>
            <li 
              role="button" 
              onClick={() => { router.push('/portfolio/investments') }}
            >
              Investments
            </li>
          </ul>
        </Sidebar>
        <main className="portfolio-item-details">
          <div className="main-content">
            <div className="header">
              <div className="header-image">
                <Image
                  src={MainImage.data.attributes.url}
                  fill
                  alt={Name}
                />
              </div>
              <span className="city">{City}</span>
              <h1>{Name}</h1>
            </div>
            <div className="body">
              <ReactMarkdown>
                {Description}
              </ReactMarkdown>
            </div>
          </div>
          <div className="slider">

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
  .portfolio-item-details {
    display: flex;
    gap: 4rem;
    .main-content {
      flex-grow: 1;
      .header {
        .header-image {
          position: relative;
          height: 53rem;
          img {
            object-fit: cover;
          }
        }
      }
    }
    .slider {
      width: 14rem;
    }
  }
`;

export async function getStaticProps(ctx) {
  const reaRes = await fetch(`https://hudson-river-admin.herokuapp.com/api/real-estate-acquisitions?filters[Slug][$eq]=${ctx.params.id}&populate=*`);
  const rea = await reaRes.json();

  return {
    props: {
      rea: rea
    }
  }
}

export async function getStaticPaths() {
  let reaPaths = [];
  const reaRes = await fetch('https://hudson-river-admin.herokuapp.com/api/real-estate-acquisitions');
  const rea = await reaRes.json();
  
  rea.data.forEach((item) => {
    reaPaths.push({
      params: {
        id: item.attributes.Slug
      }
    });
  });
  
  return {
    paths: reaPaths,
    fallback: false, // can also be true or 'blocking'
  }
}

