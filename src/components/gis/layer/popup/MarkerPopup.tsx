import styled from "styled-components";
import {useEffect, useState} from "react";
import {CustomOverlayMap, useMap} from "react-kakao-maps-sdk";
import {IHistory} from "@type/hist.types";
import useViewStore from "@store/viewStore";

import no_image from "@image/no_image.png";
import Url from "@config/url";

interface IProps {
    history: IHistory
}

const MarkerPopup = (props: IProps) => {

    const map: kakao.maps.Map = useMap();

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const {
        navInfo
    } = useViewStore();

    useEffect(() => {
        if (navInfo?.activeHistItem && navInfo.currentNav !== "timeline") {
            map.setLevel(map.getLevel(), {animate: {duration: 550}})
            map.panTo(new kakao.maps.LatLng(+props.history.lat, +props.history.lng))
        }
    }, [navInfo])

    useEffect(() => {
        if (props.history) {
            setPreviewUrl(Url.IMAGE(props.history.siteId, props.history.logoImgPath))
        }
    }, [props.history])

    const activateWheelScroll = () => {
        return map.setZoomable(true);
    }

    const disableWheelScroll = () => {
        return map.setZoomable(false);
    }

    return (
        <div
            onMouseOver={disableWheelScroll}
            onMouseOut={activateWheelScroll}
        >
            <CustomOverlayMap
                position={{lat: +props?.history?.lat, lng: +props?.history?.lng}}
                clickable={true}
                xAnchor={-0.07}
                yAnchor={0.15}
                zIndex={10}
            >
                <PreviewImage>
                    <img src={previewUrl ? previewUrl : no_image}
                         onError={() => setPreviewUrl(no_image)}
                         alt={props.history.histNm}/>
                </PreviewImage>
                <MarkerPopupArea $isShow={navInfo?.activeHistItem?.id === props?.history?.id}>
                    <PopupTitle>
                        프로젝트 명 : {props?.history?.histNm}
                    </PopupTitle>
                    <PopupTitle>
                        기간 : {props?.history?.startDtm + " ~ " + props?.history?.endDtm}
                    </PopupTitle>
                    <PopupTitle>
                        개발인원 : {props?.history?.staffCnt} 명
                    </PopupTitle>
                    <PopupContent>
                        {props?.history?.categoryContent}
                    </PopupContent>
                </MarkerPopupArea>
            </CustomOverlayMap>
        </div>
    )
}


export default MarkerPopup

const PreviewImage = styled.div`
    display: flex;
    width: 367px;
    height: 100px;
    justify-content: center;
    border-radius: 8px;
    background-color: #F7FBFC;
    border: 3px solid #769FCD;

    img {
        max-width: 100%;
        max-height: 100%;
    }
`

const MarkerPopupArea = styled.div<{ $isShow: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 367px;
    height: min-content;
    color: black;
    z-index: 1;
    gap: 3px;
    transition: all 550ms;
    opacity: ${({$isShow}) => $isShow ? '1' : '0'};
    visibility: ${({$isShow}) => $isShow ? 'visible' : 'hidden'};

    border-radius: 8px;
    background-color: #769FCD;
    border: 3px solid #769FCD;
    font-size: smaller;
`

const PopupTitle = styled.div`
    display: flex;
    align-items: center;
    width: 354px;
    border-radius: 2px;
    height: 25px;
    text-align: left;
    background-color: #F7FBFC;
    padding-left: 13px;
`

const PopupContent = styled.div`
    width: 354px;
    border-radius: 2px;
    height: min-content;
    white-space: pre-wrap;
    //padding-left: 13px;
    padding: 3px 0 10px 13px;
    background-color: #F7FBFC;
`
