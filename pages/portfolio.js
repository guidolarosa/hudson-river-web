import Head from 'next/head'
import Root from '@/components/Root';
import styled from 'styled-components';
import Image from 'next/image';
import { Inter } from '@next/font/google';

const inter = Inter({subsets: ['latin'], weight: ['300', '400', '500', '600', '700']});

export default function Portfolio(props) {
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
            <li>
              Real Estate Acquisitions
            </li>
            <li>
              Investments
            </li>
          </ul>
        </div>
        <main className="list-content">
          <div className="investments">
            <ul>
              {props.rsa.data.map((content, index) => (
                <li key={index}>
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
  }
  .sidebar {
    grid-area: sidebar;
    ul {
      li {
        font-size: 3rem;
        margin-bottom: 4rem;
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
              height: 35.25rem;
              width: 100%;
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
            }
          }
        }
      }
    }
  }
`;

export async function getStaticProps(context) {
  const investmentsRes = await fetch('https://hudson-river-admin.herokuapp.com/api/investments?populate=*');
  const investments = await investmentsRes.json();

  const rsaRes = await fetch('https://hudson-river-admin.herokuapp.com/api/real-estate-acquisitions?populate=*');
  const rsa = await rsaRes.json();

  return {
    props: {
      investments: investments,
      rsa: rsa
    }
  }
}
