import useMapStore from "@store/mapStore";
import styled from "styled-components";
import {Map, MapTypeControl, useKakaoLoader, ZoomControl} from "react-kakao-maps-sdk";
import React, {useEffect, useState} from "react";
import {IMapCenter} from "@type/map.types";
import {MAP_DEFAULT_CONST} from "@config/constant";
import useViewStore from "@store/viewStore";
import MarkerLayer from "@component/gis/layer/marker/MarkerLayer";
import TimelineMarkerLayer from "@component/gis/layer/marker/TimelineMarkerLayer";
import MarkerPopupLayer from "@component/gis/layer/popup/MarkerPopupLayer";
import ResetBtn from "@component/gis/ResetBtn";

const GisArea = () => {

    const {
        mapCenter,
        zoomLevel,
    } = useMapStore();

    const {
        navInfo,
    } = useViewStore();

    useKakaoLoader({appkey: `${import.meta.env.VITE_REACT_APP_KAKAO_JS_KEY}`});

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
                    style={{width: '100%', height: '100%'}}
                    minLevel={12}
                >
                    <ResetBtn/>

                    <StyledControlArea>
                        <MapTypeControl/>
                        <ZoomControl/>
                    </StyledControlArea>
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
    top: 70px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #4f4f4f;
    z-index: 0;
`

const StyledControlArea = styled.div`
    position: absolute;
    display: flex;
    top: 10px;
`
