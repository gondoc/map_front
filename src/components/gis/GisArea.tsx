import 'leaflet/dist/leaflet.css';
import useMapStore from "../../store/mapStore";
import styled from "styled-components";
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import {envConfig} from "../../config/envConfig";
import {useHistQuery} from "../../querys/MapQuery";
import {IHistory} from "../../types/hist.types";
import React, {useEffect, useRef, useState} from "react";
import MarkerPopup from "./MarkerPopup";
import {IMapCenter} from "../../types/map.types";
import {MAP_DEFAULT_CONST} from "../../config/constant";
import useViewStore from "../../store/viewStore";

const GisArea = () => {

    const {
        mapCenter,
        zoomLevel,
    } = useMapStore();
    const {
        activeSubItemId,
        setActiveSubItemId,
    } = useViewStore();
    const {data, status} = useHistQuery();
    const [loading, error] = useKakaoLoader({
        appkey: envConfig.API_KAKAO_JS_KEY as string, // 발급 받은 APPKEY
    });

    const [position, setPosition] = useState<IMapCenter>(MAP_DEFAULT_CONST.position);

    const clickMarkerHandler = (item: IHistory): void => {
        if (activeSubItemId && activeSubItemId === item.id) {
            return setActiveSubItemId(null);
        }
        setActiveSubItemId(item.id);
    }

    useEffect(() => {
        setPosition(mapCenter)
    }, [mapCenter])

    return (
        <div className={"gis"}>
            <StyledGisMapArea id={"map"}>
                <Map
                    center={position.center}
                    disableDoubleClickZoom={false}
                    level={zoomLevel}
                    style={{width: '100%', height: '100%'}}
                    disableDoubleClick={false}
                >
                    {
                        status === "success" &&
                        data?.data && data?.data?.length > 0 &&
                        data.data.map((item: IHistory) => {
                            return (
                                <MapMarker
                                    key={`MAP_MARKER_KEY_${item.id}`}
                                    position={{lat: +item.lat, lng: +item.lng}}
                                    clickable={true}
                                    onClick={() => clickMarkerHandler(item)}
                                    title={item.categoryContent}
                                    draggable={true}
                                    infoWindowOptions={{zIndex: 0}}
                                >
                                    {
                                        activeSubItemId &&
                                        activeSubItemId === item.id &&
                                        <MarkerPopup
                                            key={`MARKER_POPUP_KEY_${item.id}`}
                                            history={item}
                                        />
                                    }
                                </MapMarker>
                            )
                        })
                    }
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

