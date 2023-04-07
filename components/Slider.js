import Image from "next/image";
import { SplideSlide, Splide, SplideTrack } from "@splidejs/react-splide";
import styled from "styled-components";

const mobileOptions = {
  perPage: 3,
  perMove: 1,
  pagination: false,
  // arrows: false
}

const desktopOptions = {
  // type: 'loop',
  direction: 'ttb',
  height: '43rem',
  perPage: 3,
  perMove: 1,
  pagination: false,
  // arrows: false
}

const Slider = (props) => {
  // console.log(props.sliderImages.length)
  return (
    props.sliderImages && (
      <StyledSlider className={`slider ${props.type === 'mobile' ? 'slider-mobile' : 'slider-desktop'}`}>
        <Splide
          onActive={
            (splide) => {
              props.setActiveImage(splide.index);
            }
          }
          options={props.type === 'mobile' ? mobileOptions : desktopOptions}
          hasTrack={false}
        >
          <SplideTrack>
            {props.sliderImages.map((image, index) => (
              <SplideSlide 
                key={index}
                onClick={() => {
                  props.setActiveImage(index)
                }}
              >
                <div className="slide-image">
                  <Image
                    fill
                    alt={image.attributes.name}
                    src={image.attributes.url}
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div className="index">
                  <span>{index >= 10 ? index + 1 : '0' + (index + 1)}</span>
                </div>
              </SplideSlide>
            ))}
          </SplideTrack>
          {/* {props.sliderImages.length > 3 && ( */}
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
          {/* )} */}
        </Splide>
      </StyledSlider>
    )
  )
}

const StyledSlider = styled.div`
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
          transform: rotate(180deg);
        }
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
          cursor: pointer;
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
`

export default Slider;