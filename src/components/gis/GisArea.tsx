import 'leaflet/dist/leaflet.css';
import useMapStore from "../../store/mapStore";
import styled from "styled-components";
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import {envConfig} from "../../config/envConfig";
import {useHistQuery, useYearHistQuery} from "../../querys/MapQuery";
import {IHistory} from "../../types/hist.types";
import React, {useEffect, useState} from "react";
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
        navInfo,
        setNavInfo
    } = useViewStore();
    const {data: histFetchRes, status: histFetchStatus} = useHistQuery();
    const {data: yearHistFetchRes, status: yearHistFetchStatus} = useYearHistQuery();
    const [loading, error] = useKakaoLoader({
        appkey: envConfig.API_KAKAO_JS_KEY as string, // 발급 받은 APPKEY
    });

    const [position, setPosition] = useState<IMapCenter>(MAP_DEFAULT_CONST.position);
    const [showHistList, setShowHistList] = useState<IHistory[]>([]);

    const clickMarkerHandler = (item: IHistory): void => {
        // if (snbInfo?.histItem?.id === item.id) {
        //     return setSnbInfo({...snbInfo, histItem: null});
        // }
        // setSnbInfo({...snbInfo, histItem: item});
    }

    useEffect(() => {
        setPosition(mapCenter)
    }, [mapCenter])

    useEffect(() => {
        if (histFetchStatus === "success") {
            // if(snbInfo.)
            // if (histFetchRes?.data && histFetchRes?.data?.length > 0) {
            //     if (!activeYear) {
            //         setShowHistList(histFetchRes.data)
            //     } else {
            //         setShowHistList(histFetchRes.data.filter((hist: IHistory) -> hist.))
            //     }
            // }
        }

    }, [histFetchRes, navInfo])

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
                        showHistList.map((item: IHistory) => {
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
                                    {/*{*/}
                                    {/*    snbInfo?.histItem?.id === item.id &&*/}
                                    {/*    <MarkerPopup*/}
                                    {/*        key={`MARKER_POPUP_KEY_${item.id}`}*/}
                                    {/*        history={item}*/}
                                    {/*    />*/}
                                    {/*}*/}
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

