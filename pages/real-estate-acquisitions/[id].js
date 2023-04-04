import Head from 'next/head'
import Root from '@/components/Root';
import styled from 'styled-components';
import Image from 'next/image';
import { Inter } from '@next/font/google';
// import { useState } from 'react';
// import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/router';
import '@splidejs/react-splide/css';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState } from 'react';


const inter = Inter({subsets: ['latin'], weight: ['300', '400', '500', '600', '700']});

export default function REA(props) {

  const [activeImage, setActiveImage] = useState(0);
  let {
    Name,
    City,
    Description,
    MainImage,
    Slug,
    SliderImages
  } = props.rea.data[0].attributes;

  const router = useRouter();

  
  // console.log(SliderImages);
  
  useEffect(() => {
    if (SliderImages.data.filter(image => image.id === MainImage.data.id).length == 0) {
      SliderImages.data.unshift(MainImage.data)
    }
  }, []);

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
                  src={SliderImages.data[activeImage].attributes.url}
                  fill
                  alt={Name}
                />
              </div>
              <div className="slider slider-mobile">
                <Splide
                  onActive={
                    (e) => {
                      setActiveImage(e.index)
                    }
                  }
                  options={{
                    type: 'loop',
                    perPage: 3,
                    perMove: 1,
                    pagination: false
                  }}
                  hasTrack={false}
                >
                  <SplideTrack>
                    {SliderImages.data.map((image, index) => (
                      <SplideSlide key={index}>
                        <div className="slide-image">
                          <Image
                            fill
                            alt={image.attributes.name}
                            src={image.attributes.url}
                          />
                        </div>
                        <div className="index">
                          <span>{index >= 10 ? index + 1 : '0' + (index + 1)}</span>
                        </div>
                      </SplideSlide>
                    ))}
                  </SplideTrack>
                  <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev">
                      <Image
                        fill
                        src="/general/caret-left.svg"
                        alt={'Previous'}
                      />
                    </button>
                    <button className="splide__arrow splide__arrow--next">
                      <Image
                        fill
                        src="/general/caret-right.svg"
                        alt={'Next'}
                      />
                    </button>
                  </div>
                </Splide>
              </div>
              <span className={`city ${inter.className}`}>{City}</span>
              <h1>{Name}</h1>
            </div>
            <div className="body">
              <ReactMarkdown className={inter.className}>
                {Description}
              </ReactMarkdown>
            </div>
          </div>
          <div className="slider slider-desktop">

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
      'sidebar content';
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
    grid-area: content;
    flex-direction: column;
    @media ${props => props.theme.bp.md} {
      flex-direction: row;
    }
    .main-content {
      flex-grow: 1;
      .header {
        .header-image {
          position: relative;
          height: 29rem;
          margin-bottom: 2rem;
          @media ${props => props.theme.bp.md} {
            height: 53rem;
          }
          img {
            object-fit: cover;
          }
        }
        .slider {
          margin-bottom: 2.625rem;
        }
        .city {
          text-transform: uppercase;
          font-size: 1.625rem;
          margin-bottom: 0.5rem;
          font-weight: 300;
        }
        h1 {
          color: ${props => props.theme.colors.gold900};
          font-weight: 700;
          font-size: 4.125rem;
        }
      }
      .body {
        margin-top: 3rem;
        background: ${props => props.theme.colors.gold25};
        padding: 3rem;
        font-size: 1.625rem;
        font-weight: 300;
        line-height: 2.437rem;
        p, li {
          margin-bottom: 1.5rem;
        }
      }
    }
    .slider {
      /* display: flex; */
      justify-content: center;
      position: relative;
      width: 100%;
      .splide {
        .splide__track {
          width: 33.625rem;
          margin: 0 auto;
        }
        .splide__list {
          .splide__slide {
            display: flex;
            flex-direction: column;
            align-items: center;
            .slide-image {
              position: relative;
              width: 9rem;
              height: 8rem;
              border: 0.25rem solid ${props => props.theme.colors.gold100};
            }
            .index {
              font-size: 2rem;
              letter-spacing: 0.03rem;
              color: ${props => props.theme.colors.gold500};
              margin-right: 0;
              display: flex;
              width: 9rem;
              span {
                margin-right: auto;
              }
            }
          }
        }
        .splide__arrows {
          position: absolute;
          top: 4rem;
          width: 100%;
          .splide__arrow {
            background: transparent;
            width: 1.5rem;
            height: 3rem;
            top: 0;
            outline: none;
            img {
              object-fit: cover;
              object-position: center;
            }
          }
          .splide__arrow--prev {
            left: 0;
          }
          .splide__arrow--next {
            right: 0;
            /* transform: rotate(180deg); */
          }
        }
      }
      @media ${props => props.theme.bp.md} {
        width: 14rem;
      }
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

