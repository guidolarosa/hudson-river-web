import Head from 'next/head'
import Root from '@/components/Root';
import styled from 'styled-components';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import ReactMarkdown from 'react-markdown';
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/router';
import '@splidejs/react-splide/css';
import { useEffect, useState } from 'react';
import Slider from '@/components/Slider';
import { herokuUrl } from '@/utils/constants';

const inter = Inter({subsets: ['latin'], weight: ['300', '400', '500', '600', '700']});

export default function REA(props) {

  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let {
    Name,
    City,
    Description,
    MainImage,
    SliderImages
  } = props.rea.data[0].attributes;

  const router = useRouter();

  useEffect(() => {
    console.log(activeImage);
    // console.log(new Date().getMilliseconds())
  }, [activeImage])
  
  useEffect(() => {
    if (SliderImages.data && SliderImages.data.filter(image => image.id === MainImage.data.id).length == 0) {
      SliderImages.data.unshift(MainImage.data)
    }
  }, [SliderImages, MainImage]);

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
              <div 
                className="header-image"
                onClick={() => {
                  setIsModalOpen(!isModalOpen)
                }}
              >
                <div 
                  className="screen-size" 
                  onClick={() => {
                    setIsModalOpen(true)
                  }}
                >
                  <Image
                    fill
                    src={'/general/screen-size.svg'}
                    alt="View image"
                  />
                </div>
                {SliderImages.data ? (
                  <Image
                    src={SliderImages.data[activeImage].attributes.url}
                    fill
                    alt={Name}
                  />
                ) : (
                  <Image
                    src={MainImage.data.attributes.url}
                    fill
                    alt={Name}
                  />
                )}
              </div>
              <Slider
                setActiveImage={setActiveImage}
                sliderImages={SliderImages.data}
                type={'mobile'}
              />
              <span className={`city ${inter.className}`}>{City}</span>
              <h1>{Name}</h1>
            </div>
            {Description && (
              <div className="body">
                <ReactMarkdown className={inter.className}>
                  {Description}
                </ReactMarkdown>
              </div>
            )}
          </div>
          <Slider
            setActiveImage={setActiveImage}
            sliderImages={SliderImages.data}
            type={'desktop'}
          />
          <div className={`modal ${isModalOpen ? 'open' : ''}`}>
            <div 
              className="close-modal" 
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              <Image
                src={'/general/close.svg'}
                fill
                alt={'Close'}
              />
            </div>
            <div className="modal-body">
              <div className="main-image">
                {SliderImages.data ? (
                  <Image
                    src={SliderImages.data[activeImage].attributes.url}
                    fill
                    alt={Name}
                  />
                ) : (
                  <Image
                    src={MainImage.data.attributes.url}
                    fill
                    alt={Name}
                  />
                )}
              </div>
              <Slider
                setActiveImage={setActiveImage}
                sliderImages={SliderImages.data}
                type={'mobile'}
              />
            </div>
            <div 
              className="underlay"
              onClick={() => {
                setIsModalOpen(false)
              }}
            />
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
          .screen-size {
            width: 3rem;
            height: 3rem;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
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
          @media ${props => props.theme.bp.md} {
            font-size: 2rem;
          }
        }
        h1 {
          color: ${props => props.theme.colors.gold900};
          font-weight: 700;
          font-size: 4.125rem;
          @media ${props => props.theme.bp.md} {
            font-size: 5rem;
          }
        }
      }
      .body {
        margin-top: 3rem;
        background: ${props => props.theme.colors.gold25};
        padding: 3rem;
        font-size: 1.625rem;
        font-weight: 300;
        line-height: 2.437rem;
        @media ${props => props.theme.bp.md} {
          font-size: 2rem;
          line-height: 2.7rem;
        }
        p, li {
          margin-bottom: 1.5rem;
        }
      }
    }
  }
  .modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: 0.25s ease-in-out all;
    &.open {
      opacity: 1;
      pointer-events: auto;
    }
    .close-modal {
      position: absolute;
      top: 0;
      width: 2rem;
      height: 2rem;
      z-index: 1;
      top: 3.5rem;
      right: 3.5rem;
      @media ${props => props.theme.bp.md} {
        right: 6.5rem;
      }

    }
    .modal-body {
      position: relative;
      z-index: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .slider {
        display: block;
        width: 100%;
      }
      .main-image {
        ${props => props.theme.boxSizes.default};
        border: 1.25rem solid ${props => props.theme.colors.offWhite};
        box-shadow: 0 0 0px 1px ${props => props.theme.colors.gold50};
        height: 27.25rem;
        position: relative;
        margin-bottom: 4rem;
        max-width: 39rem;
        @media ${props => props.theme.bp.md} {
          height: 49.25rem;
          max-width: 75.5rem;
        }
        @media ${props => props.theme.bp.xl} {
          height: 66.5rem;
          max-width: 102.5rem;
        }
        img {
          object-fit: cover;
          object-position: center;
        }
      }
    }
    .underlay {
      background: hsla(40, 100%, 99%, 0.9);
      position: absolute;
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;
      backdrop-filter: blur(3px);
    }
  }
  .slider {
    /* display: flex; */
    justify-content: center;
    position: relative;
    width: 100%;
    &.slider-mobile {
      @media ${props => props.theme.bp.md} {
        display: none;
      }
    }
    &.slider-desktop {
      display: none;
      width: 9rem;
      @media ${props => props.theme.bp.md} {
        display: block;
      }
      .splide {
        .splide__track {
          width: unset;
          margin: unset;
          .splide__list {
            .splide__slide {
              width: 9rem;
            }
          }
        }
        .splide__arrows {
          width: 9rem;
          left: 1.5rem;
          top: 50rem;
          transform: rotate(90deg);
          .splide__arrow--prev {
            display: none;
          }
        }
      }
    }
    .splide {
      .splide__track {
        width: 33.625rem;
        margin: 0 auto;
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
      }
      .splide__arrows {
        position: absolute;
        top: 4rem;
        width: 40rem;
        left: calc(50% - 20rem);
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
`;

export async function getStaticProps(ctx) {
  const reaRes = await fetch(`${herokuUrl}/api/real-estate-acquisitions?filters[Slug][$eq]=${ctx.params.id}&populate=*`);
  const rea = await reaRes.json();
  return {
    props: {
      rea: rea
    }
  }
}

export async function getStaticPaths() {
  let reaPaths = [];
  const reaRes = await fetch(`${herokuUrl}/api/real-estate-acquisitions`);
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

