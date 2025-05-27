import styled from "styled-components";

const TopBar = () => {

    return (
        <TopBarWrapper>Gondo's Career Map</TopBarWrapper>
    )
}

export default TopBar

const TopBarWrapper = styled.h2`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    top: 0;
    width: 100%;
    font-weight: 500;
    margin: 0;
    z-index: 1;
    background-color: #D6E6F2;
`
