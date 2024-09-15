import useViewStore from "../../../store/viewStore";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {TOAST_CONTENT} from "../../../config/constant";
import {ToastStatusType} from "../../../types/common.types";
import close_btn from "../../../assets/image/close_btn.svg";

const ToastArea = () => {

    const {
        toastStatus,
        setToastStatus,

        searchWord
    } = useViewStore();

    const [content, setContent] = useState<string>("");

    useEffect(() => {
        console.log("toastStatus ", toastStatus)
        if (toastStatus !== "none") {
            if (toastStatus === "noResult") {
                if (searchWord.length > 0) {
                    const findContent: string = findShowContent(toastStatus, searchWord);
                    setContent(findContent);
                }
            } else {
                const findContent: string = findShowContent(toastStatus);
                setContent(findContent);
            }
            setTimeout(() => setToastStatus("none"), 3000)
        }
    }, [toastStatus])

    const onClickToastCloseBtn = () => {
        console.log("test")
        setToastStatus("none");
    }

    const findShowContent = (toastStatus: ToastStatusType, searchWord?: string) => {
        if (toastStatus !== "noResult") {
            return TOAST_CONTENT[toastStatus].content;
        } else {
            return TOAST_CONTENT[toastStatus].content.replace("{search}", `<span>${searchWord}</span>`);
        }
    }

    return (
        <StToastAreaWrapper $isShow={toastStatus !== "none"}>
            <StToastArea>
                <StToastContentArea dangerouslySetInnerHTML={{__html: content}}/>
                {/*<StCloseBtn onClick={() => onClickToastCloseBtn()}/>*/}
            </StToastArea>
        </StToastAreaWrapper>
    )
}

export default ToastArea

const StToastAreaWrapper = styled.div<{ $isShow: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1920px;
    height: 1080px;
    transition: all 250ms;
    opacity: ${({$isShow}) => $isShow ? '1' : '0'};
    visibility: ${({$isShow}) => $isShow ? 'visible' : 'hidden'};
`

const StToastContentArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 460px;
    height: 54px;
    color: black;
    font-size: large;
    white-space: pre-wrap;
`

const StToastArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 73px;
    z-index: 10;
    border-radius: 8px;
    border: 3px solid #769FCD;
    background-color: #F7FBFC;
`

const StCloseBtn = styled.button`
    width: 24px;
    height: 24px;
    border: none;
    z-index: 11;
    margin: 10px;
    background: url(${close_btn}) no-repeat center/100%;
`

