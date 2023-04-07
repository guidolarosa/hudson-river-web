import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import { Inter } from '@next/font/google';
import ReactMarkdown from "react-markdown";

const inter = Inter({subsets: ['latin'], weight: ['300', '400', '500', '600', '700']});

const ItemCard = ({content, type}) => {
  return (
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
        {type === 'rea' && (
          <div className={`city ${inter.className}`}>
            {content.attributes.City}
          </div>
        )}
        <h2>{content.attributes.Name}</h2>
        {type === 'investment' && (
          <ReactMarkdown className={inter.className}>
            {content.attributes.Excerpt}
          </ReactMarkdown>
        )}
      </div>
    </div>
  )
}


const PortfolioList = (props) => {

  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <StyledPortfolioList 
      className={`portfolio-list ${props.className} ${props.isCurrentView ? 'show' : ''} ${isOpen ? 'toggle-open' : ''}`}>
      <div 
        className="list-visibility-toggle" 
        onClick={() => { 
          setIsOpen(!isOpen);
        }}
      >
        <h1>{props.title}</h1>
        <div className="chevron">
          <Image
            fill
            src={'/general/chevron-down.svg'}
            alt={'Toggle'}
          />
        </div>
      </div>
      <ul>
        {props.data.map((content, index) => (
          <li key={index}>
            {props.type === 'rea' ? (
              <Link 
                href={`/portfolio/real-estate-acquisitions/${content.attributes.Slug}`}
              >
                <ItemCard content={content} type={props.type}/>
              </Link>
            ) : (
              <ItemCard content={content} type={props.type} />
            )}
          </li>
        ))}
      </ul>
    </StyledPortfolioList>
  )
}

const StyledPortfolioList = styled.div``;

export default PortfolioList;