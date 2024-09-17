import 'leaflet/dist/leaflet.css';
import useMapStore from "../../store/mapStore";
import styled from "styled-components";
import {Map, MapTypeControl, useKakaoLoader, ZoomControl} from "react-kakao-maps-sdk";
import {envConfig} from "../../config/envConfig";
import React, {useEffect, useState} from "react";
import {IMapCenter} from "../../types/map.types";
import {MAP_DEFAULT_CONST} from "../../config/constant";
import useViewStore from "../../store/viewStore";
import ResetBtn from "./ResetBtn";
import MarkerLayer from "./layer/marker/MarkerLayer";
import MarkerPopupLayer from "./layer/popup/MarkerPopupLayer";
import TimelineMarkerLayer from "./layer/marker/TimelineMarkerLayer";

const GisArea = () => {

    const {
        mapCenter,
        zoomLevel,
    } = useMapStore();

    const {
        navInfo,
    } = useViewStore();

    const [loading, error] = useKakaoLoader({
        appkey: envConfig.API_KAKAO_JS_KEY as string, // 발급 받은 APPKEY

    });

    const [position, setPosition] = useState<IMapCenter>(MAP_DEFAULT_CONST.position);

    useEffect(() => {
        if (navInfo.currentNav !== "timeline") {
            setPosition(mapCenter)
        }
    }, [navInfo.currentNav, mapCenter])

    return (
        <div className={"gis"}>
            <StyledGisMapArea id={"map"}>
                <Map
                    center={position.center}
                    disableDoubleClickZoom={false}
                    isPanto={true}
                    disableDoubleClick={false}
                    level={zoomLevel}
                    style={{width: '100%', height: '100%', top: "48px"}}
                    minLevel={12}
                >
                    <ResetBtn/>

                    <MapTypeControl position={"TOPRIGHT"}/>
                    <ZoomControl position={"RIGHT"}/>
                    {navInfo.currentNav !== "timeline" ? <MarkerLayer/> : <TimelineMarkerLayer/>}
                    <MarkerPopupLayer activeHistItem={navInfo?.activeHistItem}/>
                </Map>
            </StyledGisMapArea>
        </div>
    )
}

export default GisArea

const StyledGisMapArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #4f4f4f;
    z-index: 0;
`

