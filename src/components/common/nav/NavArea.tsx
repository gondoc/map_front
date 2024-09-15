import styled from "styled-components";
import ProjectNavItem from "./navItem/projects/ProjectNavItem";
import YearNavItem from "./navItem/year/YearNavItem";
import TimeLineNavItem from "./navItem/timeLine/TimeLineNavItem";

const NavArea = () => {

    return (
        <NavAreaWrapper>
            <StNavItemArea>
                <ProjectNavItem title={"projects"}/>
                <YearNavItem title={"year"}/>
                <TimeLineNavItem title={"timeline"}/>
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
    height: auto;
`
