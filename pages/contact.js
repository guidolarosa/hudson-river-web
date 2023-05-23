import styled from 'styled-components';
import Head from 'next/head'
import Root from '@/components/Root';
import { useEffect, useState, useRef } from 'react';
import { fadeUp } from '@/theme/animations';
import mapboxgl from 'mapbox-gl';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

const Contact = (props) => {

  mapboxgl.accessToken = 'pk.eyJ1IjoiaHVkc29ucml2ZXIiLCJhIjoiY2xnNDBjM2N4MGdvZDNxcWk1bmp1NXhrcCJ9.EwqxmMnu7VG6XoPHyLSYYg';

  const defaultCoord = {
    lat: 40.721181,
    lng: -74.005887
  }

  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(defaultCoord.lng);
  const [lat, setLat] = useState(defaultCoord.lat);
  const [zoom, setZoom] = useState(11);

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        properties: {
          title: 'Hudson River',
          description: 'Offices',
        }
      },
    ]
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/hudsonriver/clg40efwd00cr01nzey0cpm6c',
      center: [lng, lat],
      zoom: zoom
    });

    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
    
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map.current);
    }
  });

  return (
    <>
      <Head>
        <title>Hudson River | Contact</title>
        <meta name="title" content="Hudson River | Contact"/>
        <meta name="description" content="Hudson River Companies is a real estate acquisition and investment firm focused on risk adjusted opportunistic strategy."/>
        <meta name="keywords" content="real estate, investments, real estate acquisitions, new york, atlanta, georgia, USA, saral gupta"/>
        <meta name="robots" content="index, follow"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="language" content="English"/>
        <meta name="author" content="Guido La Rosa, Entrecasas Studio"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta property={'og:title'} content='Hudson River | Contact'/>
        <meta property={'og:image'} content='https://i.ibb.co/Snst5hs/thumbnail.png'/>
        <meta property={'og:description'} content='Hudson River Companies is a real estate acquisition and investment firm focused on risk adjusted opportunistic strategy.'/>
        <meta property={'og:url'} content='https://www.hudsonriverco.com'/>
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='627' />
      </Head>
      <StyledContact>
        <div className="contact-container">
          <div className="location">
            <div ref={mapContainer} className="map-container" />
          </div>
          <div className="form-container">
            <h1>Stay in touch</h1>
            <Link href={'tel:2129252539'}>
              <strong>
                Phone: 212 925 2539
              </strong>
            </Link>
            <address>
              <strong>
                Address: 6 St. Johns Ln, New York, NY
              </strong>
            </address>
            {/* <ContactForm /> */}
          </div>
        </div>

      </StyledContact>
    </>
  )
};

const StyledContact = styled(Root)`
  .contact-container {
    display: flex;
    flex-direction: column;
    @media ${props => props.theme.bp.md} {
      ${props => props.theme.boxSizes.default};
      gap: 4rem;
      margin-top: 6rem;
    }
    @media ${props => props.theme.bp.lg} {
      max-width: calc(100vw - 44rem);
    }
    @media ${props => props.theme.bp.xl} {
      max-width: calc(100vw - 65.75rem);
    }
    .location {
      .map-container {
        height: 62rem;
        max-height: calc(100vh - 40rem);
        @media ${props => props.theme.bp.xl} {
          height: 60rem;
        }
        .marker {
          background-image: url('/general/marker.svg');
          background-size: cover;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          cursor: pointer;
        }
        .mapboxgl-control-container {
          display: none;
        }
        iframe {
          border: 0;
          background: ${props => props.theme.colors.gold500};
          opacity: 0;
          animation: 0.5s ${fadeUp} 1.5s forwards;
          width: 100%;
          height: 100%;
        }
      }
    }
    .form-container {
      ${props => props.theme.boxSizes.default};
      opacity: 0;
      animation: 0.5s ${fadeUp} 1.75s forwards;
      @media ${props => props.theme.bp.md} {
        margin: unset;
        width: unset;
      }
      address, a {
        font-style: normal;
        @media ${props => props.theme.bp.md} {
          display: block;
          margin-bottom: 1.8rem;
        }
        strong {
          ${props => props.theme.boxSizes.default};
          display: block;
          color: ${props => props.theme.colors.gold500};
          opacity: 0;
          font-weight: 400;
          animation: 0.5s ${fadeUp} 1.5s forwards;
          width: unset;
          font-size: 2rem;
          margin-top: 1.8rem;
          @media ${props => props.theme.bp.md} {
            margin-top: 3rem;
            font-size: 2.375rem;
            margin: unset;
          }
        }
      }
      
      h1 {
        margin-top: 3rem;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid ${props => props.theme.colors.gold100};
        font-size: 4.125rem;
        @media ${props => props.theme.bp.md} {
          margin-top: 0;
        }
      }
    }
  }
`;

export default Contact;

export async function getStaticProps(context) {
  return {
    props: {}
  }
}