import Head from 'next/head'
import Root from '@/components/Root';
import styled from 'styled-components';
import Image from 'next/image';

export default function Home(props) {
  console.log(props)
  return (
    <>
      <Head>
        <title>Hudson River</title>
        <meta name="description" content="Hudson River" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <StyledRoot>
        <div className="hero">
          <div className="hero-content">
            <h1>Real Estate Private <br/> Equity & Investments</h1>
          </div>
          <Image
            fill
            src={'/homepage/hero-image.png'}
            alt="Hudson River"
            className="hero-background"
          />
        </div>
      </StyledRoot>
    </>
  )
};

const StyledRoot = styled(Root)`
  .hero {
    height: 100%;
    flex-grow: 1;
    position: relative;
    .hero-background {
      object-fit: cover;
      object-position: 80% 0;
    }
    .hero-content {
      ${props => props.theme.boxSizes.default};
      margin-top: 6rem;
      position: relative;
      z-index: 1;
      @media ${props => props.theme.bp.md} {
        margin-top: 11rem;
      }
      @media ${props => props.theme.bp.xl} {
        margin-top: 15rem;
      }
    }
  }
`;

export async function getStaticProps(ctx) {
  const investmentRes = await fetch(`https://hudson-river-admin.herokuapp.com/api/investments?filters[Slug][$eq]=${ctx.params.id}`);
  const investment = await investmentRes.json();

  return {
    props: {
      investment: investment
    }
  }
}

export async function getStaticPaths() {
  let investmentsPaths = [];
  const investmentsRes = await fetch('https://hudson-river-admin.herokuapp.com/api/investments');
  const investments = await investmentsRes.json();
  
  investments.data.forEach((item) => {
    investmentsPaths.push({
      params: {
        id: item.attributes.Slug
      }
    });
  });
  
  return {
    paths: investmentsPaths,
    fallback: false, // can also be true or 'blocking'
  }
}
