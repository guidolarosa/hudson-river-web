import styled from 'styled-components';
import { fadeUp } from '@/theme/animations';

const Sidebar = (props) => {
  return (
    <StyledSidebar className={'sidebar'}>
      {props.children}
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  position: fixed;
  width: 25rem;
  ul {
    li {
      font-size: 4.125rem;
      margin-bottom: 4rem;
      transition: 0.25s ease-in-out all;
      cursor: pointer;
      border-bottom: 1px solid transparent;
      padding-bottom: 2rem;
      position: relative;
      animation: 0.25s ${fadeUp} 1.5s ease-out forwards;
      opacity: 0;
      &:nth-child(2) {
        animation-delay: 2s;
      }
      &:before {
        content: '';
        width: 2rem;
        height: 2rem;
        background-image: url('/general/arrow.svg');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        left: -4rem;
        top: 1.5rem;
        opacity: 0;
        transition: 0.25s ease-in-out opacity;
      }
      &.current {
        color: ${props => props.theme.colors.gold500};
        border-color: ${props => props.theme.colors.gold100};
        &:before {
          opacity: 1;
        }
      }
    }
  }
`;

export default Sidebar;