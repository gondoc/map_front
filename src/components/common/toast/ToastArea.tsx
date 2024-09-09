import useViewStore from "../../../store/viewStore";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {TOAST_CONTENT} from "../../../config/constant";
import {ToastStatusType} from "../../../types/common.types";

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
        setToastStatus("none");
    }

    const findShowContent = (toastStatus: ToastStatusType, searchWord?: string) => {
        if (toastStatus !== "noResult") {
            return TOAST_CONTENT[toastStatus].content;
        } else {
            // return searchWord?.length!! > 0 && TOAST_CONTENT[toastStatus].content.replace("{search}", `<span>"${searchWord}"</span>`);
            // const content = TOAST_CONTENT[toastStatus].content.replace("{search}", `<span>"${searchWord}"</span>`);
            //
            // return content.includes("undefined") && content
            return TOAST_CONTENT[toastStatus].content.replace("{search}", `<span>${searchWord}</span>`);
        }
    }

    return (
        <StToastAreaWrapper $isShow={toastStatus !== "none"}>
            {/*{*/}
            {/*    toastStatus === "noResult" ? searchWord.length > 0 &&*/}
            {/*        <StToastArea dangerouslySetInnerHTML={{__html: findShowContent(toastStatus, searchWord)}}/> :*/}
            {/*        <StToastArea dangerouslySetInnerHTML={{__html: findShowContent(toastStatus)}}/>*/}
            {/*}*/}
            {/*{*/}
            {/*    toastStatus === "error" &&*/}
            <StToastArea
                dangerouslySetInnerHTML={{__html: content}}/>
            {/*}*/}
            {/*{*/}
            {/*    toastStatus === "reset" &&*/}
            {/*    <StToastArea dangerouslySetInnerHTML={{__html: findShowContent(toastStatus)}}/>*/}
            {/*}*/}
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

const StToastArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 73px;
    width: 504px;
    height: 54px;
    z-index: 10;
    border-radius: 8px;
    border: 3px solid #769FCD;
    background-color: #F7FBFC;
    color: black;
    font-size: large;
    white-space: pre-wrap;

    span {
        white-space: pre-wrap;
        background-color: #B9D7EA;
        //color: 
    }
`
