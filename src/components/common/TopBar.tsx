import styled from "styled-components";

const TopBar = () => {

    const onClickHandler = () => {
        const backOfficePort: number = import.meta.env.VITE_BACK_OFFICE_PORT;
        window.location.href = `${process.env.NODE_ENV === "development" ? "http" : "https"}://${window.location.hostname}:${backOfficePort}/back/login`
    }

    return (
        <TopAreaWrapper>
            <TitleArea>
                Gondo's Career Map
            </TitleArea>
            <NavigateBtn onClick={() => onClickHandler()}>Admin Page</NavigateBtn>
        </TopAreaWrapper>
    )
}

export default TopBar


const TopAreaWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    position: relative;
    width: 1920px;
    height: 70px;
    background-color: #D6E6F2;
    z-index: 1;
`

const TitleArea = styled.h2`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    top: 0;
    width: 100%;
    font-weight: 500;
    margin: 0;
`

const NavigateBtn = styled.button<{
    $width?: string,
    $height?: string,
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 165px;
    height: 45px;
    margin-left: auto;
    margin-right: 25px;
    border-radius: 5px;
    background-color: #F7FBFC;
    font-size: 16px;
    color: #000000;
    z-index: 1;

    cursor: pointer;
    border: 3px solid #769FCD;

    &:hover {
        border-color: #93B7E4;
    }

    &:active {
        border-color: #517EBC;
    }

`