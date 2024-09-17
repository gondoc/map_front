import gis_poi_active_01 from "../../../../assets/image/gis_poi_active_01.png";
import gis_poi_default_01 from "../../../../assets/image/gis_poi_default_01.png";

import React, {useEffect, useState} from "react";
import {IHistory} from "../../../../types/hist.types";
import {useHistQuery} from "../../../../querys/MapQuery";
import useViewStore from "../../../../store/viewStore";
import UseFindCurrentIndex from "../../../../hooks/useFindCurrentIndex";
import {MapMarker, useMap} from "react-kakao-maps-sdk";
import {MAP_DEFAULT_CONST, TIME_LINE_INIT_INDEX} from "../../../../config/constant";
import {useQueryClient} from "@tanstack/react-query";
import {QueryKeys} from "../../../../querys/QueryKeys";

const TimelineMarkerLayer = () => {

    const qc = useQueryClient();
    const {
        navInfo,
        setNavInfo,
        setToastStatus,
    } = useViewStore();
    const map: kakao.maps.Map = useMap();
    const {data: histFetchRes, status: histFetchStatus} = useHistQuery();

    const timelineIndex: number = UseFindCurrentIndex({
        isActive: navInfo.currentNav === "timeline" && navInfo.isOpen,
        lastIndex: histFetchStatus === "success" ? histFetchRes?.data?.length : 0
    });

    const [reversedHistItems, setReversedHistItems] = useState<IHistory[]>([])
    const [markerList, setMarkerList] = useState<IHistory[] | null>(null)

    useEffect(() => {
        if (histFetchStatus === "success") {
            const reversedItems = qc.getQueryData(QueryKeys.MAP.time()) as IHistory[]
            setReversedHistItems(reversedItems)
        }

        return (() => {
            setReversedHistItems([])
        })
    }, [histFetchRes, histFetchStatus])

    useEffect(() => {
        if (navInfo.isOpen) {
            if (timelineIndex === TIME_LINE_INIT_INDEX) {
                startTimeline();
            }
            const nextItem: IHistory = reversedHistItems[timelineIndex];
            if ((timelineIndex !== TIME_LINE_INIT_INDEX) && nextItem) {
                moveNextItem(nextItem);
                activeNextItem(markerList ? markerList : [], nextItem);
            }

            if (timelineIndex === reversedHistItems.length) {
                endTimeline();
            }
        }
    }, [navInfo.isOpen, timelineIndex, reversedHistItems])

    const startTimeline = () => {
        map.setCenter(new kakao.maps.LatLng(MAP_DEFAULT_CONST.position.center.lat, MAP_DEFAULT_CONST.position.center.lng))
        map.setLevel(MAP_DEFAULT_CONST.zoomLv.init)
        setToastStatus("activeTimeline");
        setMarkerList(null);
    }

    const endTimeline = () => {
        setNavInfo({...navInfo, activeHistItem: null})
        map.panTo(new kakao.maps.LatLng(+MAP_DEFAULT_CONST.position.center.lat, +MAP_DEFAULT_CONST.position.center.lng))
        setTimeout(() => {
            map.setLevel(MAP_DEFAULT_CONST.zoomLv.init, {
                animate: {duration: 500}
            })
            setNavInfo({...navInfo, currentNav: "none", activeHistItem: null})
        }, 1000)
        setToastStatus("deactivatedTimeline")
    }

    const moveNextItem = (nextItem: IHistory) => {
        map.setLevel(MAP_DEFAULT_CONST.zoomLv.timeline, {
            animate: {duration: 500},
            anchor: new kakao.maps.LatLng(+nextItem.lat, +nextItem.lng)
        })
        map.panTo(new kakao.maps.LatLng(+nextItem.lat, +nextItem.lng))
    }

    const activeNextItem = (markerList: IHistory[], nextItem: IHistory) => {
        setTimeout(() => {
            markerList.push(nextItem);
            setMarkerList(markerList)
            setNavInfo({...navInfo, activeHistItem: nextItem})
        }, 600)
    }

    return (
        <>
            {
                markerList &&
                markerList.map((item: IHistory, index: number) => {
                    const isActive: boolean = item.id === navInfo.activeHistItem?.id;
                    return (<MapMarker
                        key={`MAP_MARKER_KEY_TIMELINE_${item.id}_${index}`}
                        position={{lat: +item.lat, lng: +item.lng}}
                        clickable={true}
                        title={item.categoryContent}
                        draggable={false}
                        zIndex={isActive ? 10 : 0}
                        image={{
                            src: isActive ? gis_poi_active_01 : gis_poi_default_01,
                            size: {width: 29, height: 42}
                        }}
                    />)
                })
            }
        </>
    )
}

export default TimelineMarkerLayer
