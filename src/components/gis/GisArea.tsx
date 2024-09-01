import 'leaflet/dist/leaflet.css';
import useMapStore from "../../store/mapStore";
import styled from "styled-components";
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import {envConfig} from "../../config/envConfig";
import {useHistQuery} from "../../querys/MapQuery";
import {IHistory} from "../../types/hist.types";
import {useEffect, useState} from "react";
import MarkerPopup from "./MarkerPopup";
import {IMapCenter} from "../../types/map.types";
import {MAP_DEFAULT_CONST} from "../../config/constant";

const GisArea = () => {

    const {
        mapCenter,
        zoomLevel,
    } = useMapStore();
    const {data, status} = useHistQuery();
    const [loading, error] = useKakaoLoader({
        appkey: envConfig.API_KAKAO_JS_KEY as string, // 발급 받은 APPKEY
    });

    const [activeHistId, setActiveHistId] = useState<string | null>(null);
    const [position, setPosition] = useState<IMapCenter>(MAP_DEFAULT_CONST.position);
    const clickMarkerHandler = (item: IHistory): void => {
        if (activeHistId && activeHistId === item.id) {
            return setActiveHistId(null);
        }
        setActiveHistId(item.id);
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
                    isPanto={true}
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
                                    // image={{src: "../../../src/assets/image/img.png", size: {width: 122, height: 122}}}
                                    onClick={() => clickMarkerHandler(item)}
                                >
                                    {
                                        activeHistId &&
                                        activeHistId === item.id &&
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

