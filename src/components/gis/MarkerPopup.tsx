import styled from "styled-components";
import {IHistory} from "../../types/hist.types";
import {useEffect} from "react";
import useMapStore from "../../store/mapStore";
import {CustomOverlayMap, useMap} from "react-kakao-maps-sdk";

export interface IProps {
    history: IHistory
}

const MarkerPopup = (props: IProps) => {

    const {
        mapCenter,
        setMapCenter,
        zoomLevel,
        setZoomLevel,
    } = useMapStore();

    useEffect(() => {
        if (props?.history) {
            setMapCenter({center: {lat: +props.history.lat, lng: +props.history.lng}})
            setZoomLevel(7)
        }
    }, [props.history])

    const parseBr = (content: string ): string => {
        return content.replaceAll("\r\n", `<br/>`);
    }

    return (
        <CustomOverlayMap
            position={{lat: +props.history.lat, lng: +props.history.lng}}
            clickable={true}
            xAnchor={-0.05}
            yAnchor={0.15}
        >
            <MarkerPopupArea>
                <PopupTitle>
                    프로젝트 명 : {props.history.histNm}
                </PopupTitle>
                <PopupTitle>
                    기간 : {props.history.dtm}
                </PopupTitle>
                <PopupTitle>
                    개발인원 : {props.history.staffCnt} 명
                </PopupTitle>
                <PopupContent>
                    {props.history.categoryContent}
                </PopupContent>
            </MarkerPopupArea>
        </CustomOverlayMap>
    )
}


export default MarkerPopup

const MarkerPopupArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 450px;
    height: 300px;
    color: white;
    z-index: 10;
    overflow-y: auto;

    gap: 3px;
    //opacity: 0.3;
`

const PopupTitle = styled.div`
    width: 100%;
    height: 25px;
    background: gray;

    //padding-left: 3px;
    //border: 3px solid black;
    //border-radius: 3px;
`

const PopupContent = styled.div`
    width: 100%;
    height: 800px;
    overflow-y: auto;
    white-space: pre-wrap;
    background: gray;
    
`
