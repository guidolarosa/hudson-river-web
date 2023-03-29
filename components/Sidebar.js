import styled from 'styled-components';

const Sidebar = (props) => {
  return (
    <StyledSidebar className={'sidebar'}>
      {props.children}
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  ul {
    li {
      font-size: 4rem;
      margin-bottom: 4rem;
      transition: 0.25s ease-in-out color;
      cursor: pointer;
      border-bottom: 1px solid ${props => props.theme.colors.gold100};
      padding-bottom: 2rem;
      position: relative;
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
      &:last-of-type {
        border-bottom: none;
      }
      &.current {
        color: ${props => props.theme.colors.gold500};
        &:before {
          opacity: 1;
        }
      }
    }
  }
`;

export default Sidebar;