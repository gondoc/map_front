import styled from "styled-components";
import ProjectNavItem from "@component/common/nav/navItem/projects/ProjectNavItem";
import YearNavItem from "@component/common/nav/navItem/year/YearNavItem";
import TimeLineNavItem from "@component/common/nav/navItem/timeLine/TimeLineNavItem";

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
    z-index: 1;
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

const ContactArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;

    background-color: #769FCD;
    row-gap: 13px;
`

const IconArea = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4C5580;
`
