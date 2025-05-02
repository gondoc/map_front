import styled from "styled-components";
import {useState} from "react";
import close_btn from "@image/close_btn.svg";


const NotDisplayToday = () => {

    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <NotTodayArea $isActive={isOpen}>
            <DimmedArea/>
            <PopupArea>
                <PopupHeader>
                    <Title>Notice</Title>
                    <CloseBtn type={"button"} onClick={() => setIsOpen(false)}></CloseBtn>
                </PopupHeader>

                <PopupBody>

                </PopupBody>

                <PopupFooter>
                    <CheckBox type={"checkbox"}/>
                    <CheckBoxLabel>오늘 하루 그만 보기</CheckBoxLabel>
                </PopupFooter>

            </PopupArea>
        </NotTodayArea>
    )
}

export default NotDisplayToday

const NotTodayArea = styled.div<{ $isActive: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;

    visibility: ${({$isActive}) => $isActive ? 'visible' : 'hidden'};
    opacity: ${({$isActive}) => $isActive ? '1' : '0'};
    transition: ${({$isActive}) => $isActive ? 'opacity 450ms' : 'visibility 1ms 450ms, opacity 450ms'};
`

const DimmedArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`

const PopupArea = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 294px;
    height: 494px;
    z-index: 3;
    background-color: #F7FBFC;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid #769FCD;
    border-radius: 8px;
`

const PopupHeader = styled.div`
    width: auto;
    height: 30px;
    display: flex;
    padding: 0 5px;
    align-items: center;
    justify-content: space-between;
    background-color: #D6E6F2;
    border-radius: 8px 8px 0 0;
`

const Title = styled.div`
`

const CloseBtn = styled.button`
    width: 23px;
    height: 23px;
    background-color: #D6E6F2;
    border-radius: 3px;
    border: 2px solid #769FCD;

    background-image: url(${close_btn});

    &:hover {
        cursor: pointer;
        background-color: #B9D7EA;
    }

    &:active {
        background-color: #769FCD
    }
`

const PopupBody = styled.div`
    height: 452px;
    //background-color: #4C5580;
`

const PopupFooter = styled.div`
    height: 20px;
    background-color: #D6E6F2;
    display: flex;
    align-items: center;
`

const CheckBox = styled.input`
    accent-color: #F7FBFC;
`

const CheckBoxLabel = styled.label`


`


