import styled from "styled-components";
import {IHistory} from "../../../../types/hist.types";
import {useEffect} from "react";
import useMapStore from "../../../../store/mapStore";
import {CustomOverlayMap, MapInfoWindow, useMap} from "react-kakao-maps-sdk";
import {MAP_DEFAULT_CONST} from "../../../../config/constant";
import useViewStore from "../../../../store/viewStore";

interface IProps {
    history: IHistory
}

const MarkerPopup = (props: IProps) => {

    const map: kakao.maps.Map = useMap();

    const {
        navInfo
    } = useViewStore();

    useEffect(() => {
        if (navInfo?.activeHistItem && navInfo.currentNav !== "timeline") {
            map.setLevel(map.getLevel(), {animate: {duration: 550}})
            map.panTo(new kakao.maps.LatLng(+props.history.lat, +props.history.lng))
        }
    }, [navInfo])

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

const MarkerPopupArea = styled.div<{ $isShow: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 367px;
    height: min-content;
    color: black;
    z-index: 10;
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
