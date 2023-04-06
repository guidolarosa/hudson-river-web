import Image from "next/image";
import { SplideSlide, Splide, SplideTrack } from "@splidejs/react-splide";

const mobileOptions = {
  type: 'loop',
  perPage: 3,
  perMove: 1,
  pagination: false
}

const desktopOptions = {
  type: 'loop',
  direction: 'ttb',
  height: '43rem',
  perPage: 3,
  perMove: 1,
  pagination: false
}

const Slider = (props) => {
  return (
    props.sliderImages && (
      <div className={`slider ${props.type === 'mobile' ? 'slider-mobile' : 'slider-desktop'}`}>
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
          {props.sliderImages.length > 3 && (
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
          )}
        </Splide>
      </div>
    )
  )
}

export default Slider;