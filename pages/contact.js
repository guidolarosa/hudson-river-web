import styled from 'styled-components';
import Head from 'next/head'
import Image from 'next/image';
import Root from '@/components/Root';
import { Inter } from '@next/font/google';

const inter = Inter({subsets: ['latin']});

const Contact = (props) => {

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Hudson River | About</title>
        <meta name="description" content="Hudson River" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContact>
        <div className="contact-container">
          <div className="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.871772882933!2d-74.0059727!3d40.7208392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598ad0fd2777%3A0xf5eed8f68af0cf!2s6%20St%20Johns%20Ln%2C%20New%20York%2C%20NY%2010013%2C%20USA!5e0!3m2!1sen!2sar!4v1679672191699!5m2!1sen!2sar" width="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <strong>6 St. Johns Ln, New York, NY</strong>
          </div>
          <div className="form-container">
            <h1>Stay in touch</h1>
            <form onSubmit={onFormSubmit} className={inter.className}>
              <div className="input-group">
                <label for="name">Name <span>*</span></label>
                <input type="text" placeholder="Enter your name" id="name" />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label for="email">Email Address <span>*</span></label>
                  <input type="text" placeholder="Enter your email" id="email"/>
                </div>
                <div className="input-group">
                  <label for="phone">Phone <span>*</span></label>
                  <input type="text" placeholder="Enter your phone" id="phone"/>
                </div>
              </div>
              <div className="input-group">
                <label for="message">Message <span>*</span></label>
                <textarea type="text" placeholder="Enter your message" id="message"/>
              </div>
              <div className="input-group">
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>

      </StyledContact>
    </>
  )
};

const StyledContact = styled(Root)`
  .contact-container {
    @media ${props => props.theme.bp.md} {
      ${props => props.theme.boxSizes.default};
      display: flex;
      gap: 4rem;
      margin-top: 6rem;
    }
    .map-container,
    .form-container {
      @media ${props => props.theme.bp.md} {
        width: 50%;
      }
    }
    .map-container {
      iframe {
        height: 30rem;
        border: 0;
        background: ${props => props.theme.colors.gold500};
      }
      strong {
        ${props => props.theme.boxSizes.default};
        display: block;
        margin-top: 3rem;
        font-size: 2.3rem;
        color: ${props => props.theme.colors.gold500};
        @media ${props => props.theme.bp.md} {
          width: unset;
        }
      }
    }
    .form-container {
      ${props => props.theme.boxSizes.default};
      @media ${props => props.theme.bp.md} {
        width: 50%;
      }
      h1 {
        margin-top: 7rem;
        margin-bottom: 5rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid ${props => props.theme.colors.gold500};
        @media ${props => props.theme.bp.md} {
          margin-top: 0;
        }
      }
      .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 4rem;
        label {
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        input, textarea {
          background: transparent;
          border: 0;
          outline: none;
          border-bottom: 1px solid ${props => props.theme.colors.gold100};
          font-family: unset;
          padding: 1rem;
          font-size: 2rem;
          color: ${props => props.theme.colors.gold900};
          &::placeholder {
            color: ${props => props.theme.colors.gold100};
            font-size: 2rem;
          }
        }
        input {
          height: 4.75rem;
        }
        textarea {
          border: 1px solid ${props => props.theme.colors.gold100};
          border-radius: 0.5rem;
          resize: none;
          height: 20rem;
        }
        button {
          height: 5rem;
          background: transparent;
          border: 1px solid ${props => props.theme.colors.gold50};
          color: ${props => props.theme.colors.gold50};
          border-radius: 10rem;
          font-size: 2rem;
        }
      }
    }
  }
`;

export default Contact;