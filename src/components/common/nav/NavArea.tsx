import styled from "styled-components";
import ProjectNavItem from "./navItem/projects/ProjectNavItem";
import YearNavItem from "./navItem/year/YearNavItem";

const NavArea = () => {

    return (
        <NavAreaWrapper>
            <StNavItemArea>
                <ProjectNavItem title={"projects"}/>
                <YearNavItem title={"year"}/>
                {/*<NavItem title={"timeline"}/>*/}
            </StNavItemArea>
        </NavAreaWrapper>
    )
}

export default NavArea

const NavAreaWrapper = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    left: 0;
    z-index: 10;
    background: #F7FBFC;
`

const StNavItemArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 260px;
`
