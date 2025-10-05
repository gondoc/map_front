import styled from "styled-components";
import ProjectNavItem from "@component/common/nav/navItem/projects/ProjectNavItem";
import YearNavItem from "@component/common/nav/navItem/year/YearNavItem";
import TimeLineNavItem from "@component/common/nav/navItem/timeLine/TimeLineNavItem";

import icon_github from "@image/icon_github.png";
import icon_mail from "@image/icon_mail.png";

const NavArea = () => {

    const githubBtnClickHandler = () => {
        window.open("https://github.com/gondoc/map_front");
    }

    const mailBtnClickHandler = () => {
        window.open("mailto:chlehddh8062@gmail.com");
    }

    return (
        <NavAreaWrapper>
            <StNavItemArea>
                <ProjectNavItem title={"projects"}/>
                <YearNavItem title={"year"}/>
                <TimeLineNavItem title={"timeline"}/>
            </StNavItemArea>
            <ContactArea>
                <IconArea $image={icon_github} onClick={() => githubBtnClickHandler()}>
                    <i></i>
                </IconArea>
                <IconArea $image={icon_mail} onClick={() => mailBtnClickHandler()}>
                    <i></i>
                </IconArea>
            </ContactArea>
        </NavAreaWrapper>
    )
}

export default NavArea

const NavAreaWrapper = styled.nav`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: calc(100vh - 70px);
    top: 70px;
    //width: 260px;
    width: 13.542vw;
    left: 0;
    z-index: 1;
    background: #F7FBFC;
`

const StNavItemArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    //width: 260px;
    width: 13.542vw;
    height: auto;
`

const ContactArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 135px;
    row-gap: 13px;
`

const IconArea = styled.div<{ $image: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    //width: 85px;
    width: 4.427vw;
    //height: 85px;
    height: 4.427vw;
    border-radius: 15px;
    border: 3px solid #769FCD;
    background-color: #D6E6F2;
    cursor: pointer;

    &:hover {
        background-color: #B9D7EA;
    }

    i {
        //width: 60px;
        width: 3.125vw;
        //height: 60px;
        height: 3.125vw;
        background: url(${({$image}) => $image}) no-repeat center/100%;
        opacity: 0.6;
    }

    transition: all 250ms;
`
// background-image: ${({$image}) => `url(${$image}) no-repeat center/100%`};
