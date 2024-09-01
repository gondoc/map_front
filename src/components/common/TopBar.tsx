import styled from "styled-components";

const TopBar = () => {



    return (
        <TopBarWrapper>
            Gondo's Career Map
        </TopBarWrapper>
    )
}

export default TopBar

const TopBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    top: 0;
    width: 100%;
    background: red;
    font-weight: 500;
    font-size: large;
    z-index: 10;
`
