import 'leaflet/dist/leaflet.css';
import useMapStore from "../../store/mapStore";
import styled from "styled-components";
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import {envConfig} from "../../config/envConfig";
import {useHistQuery, useYearHistQuery} from "../../querys/MapQuery";
import {IHistory, IYearHistory} from "../../types/hist.types";
import React, {useEffect, useState} from "react";
import MarkerPopup from "./MarkerPopup";
import {IMapCenter} from "../../types/map.types";
import {MAP_DEFAULT_CONST} from "../../config/constant";
import useViewStore from "../../store/viewStore";
import ResetBtn from "./ResetBtn";

const GisArea = () => {

    const {
        mapCenter,
        zoomLevel,
    } = useMapStore();

    const {
        navInfo,
        setNavInfo,
        searchWord
    } = useViewStore();
    const {data: histFetchRes, status: histFetchStatus} = useHistQuery();
    const {data: yearHistFetchRes, status: yearHistFetchStatus} = useYearHistQuery();
    const [loading, error] = useKakaoLoader({
        appkey: envConfig.API_KAKAO_JS_KEY as string, // 발급 받은 APPKEY

    });

    const [position, setPosition] = useState<IMapCenter>(MAP_DEFAULT_CONST.position);
    const [showHistList, setShowHistList] = useState<IHistory[]>([]);

    const clickMarkerHandler = (item: IHistory): void => {
        if (navInfo?.activeHistItem?.id === item.id) {
            return setNavInfo({...navInfo, activeHistItem: null});
        }
        setNavInfo({...navInfo, activeHistItem: item});
    }

    useEffect(() => {
        setPosition(mapCenter)
    }, [mapCenter])

    useEffect(() => {
        if (navInfo.currentNav !== "year") {
            if (histFetchRes?.data && histFetchRes?.data?.length > 0 &&
                histFetchStatus === "success"
            ) {
                const showList: IHistory[] = histFetchRes.data
                    .filter((hist: IHistory) => hist.histNm.includes(searchWord)) as IHistory[];
                return setShowHistList(showList);
            }
        } else {
            if (yearHistFetchRes?.data && yearHistFetchRes?.data?.length > 0 &&
                yearHistFetchStatus === "success" &&
                navInfo?.year?.activeYear
            ) {
                const showList: IHistory[] = yearHistFetchRes?.data
                    .find((yearHist: IYearHistory) => yearHist.yearLabel === navInfo.year?.activeYear!!)
                    ?.histRecords as IHistory[];
                return setShowHistList(showList);
            }
        }
    }, [navInfo, histFetchRes, yearHistFetchRes, searchWord])

    return (
        <div className={"gis"}>
            <StyledGisMapArea id={"map"}>
                <Map
                    center={position.center}
                    disableDoubleClickZoom={false}
                    level={zoomLevel}
                    style={{width: '100%', height: '100%'}}
                    disableDoubleClick={false}
                    minLevel={12}
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
                                    {/*    navInfo?.activeHistItem?.id === item.id &&*/}
                                    {/*    <MarkerPopup*/}
                                    {/*        key={`MARKER_POPUP_KEY_${item.id}`}*/}
                                    {/*        history={item}*/}
                                    {/*    />*/}
                                    {/*}*/}
                                </MapMarker>
                            )
                        })
                    }
                    {
                        navInfo?.activeHistItem?.id &&
                        <MarkerPopup
                            key={`MARKER_POPUP_KEY_${navInfo?.activeHistItem?.id}`}
                            history={navInfo?.activeHistItem as IHistory}
                        />
                    }
                </Map>

                <ResetBtn/>
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

