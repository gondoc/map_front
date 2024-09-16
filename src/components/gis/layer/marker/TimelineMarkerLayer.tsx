import React, {useEffect, useState} from "react";
import {IHistory} from "../../../../types/hist.types";
import {useHistQuery} from "../../../../querys/MapQuery";
import useViewStore from "../../../../store/viewStore";
import UseFindCurrentIndex from "../../../../hooks/useFindCurrentIndex";
import {MapMarker, useMap} from "react-kakao-maps-sdk";
import {MAP_DEFAULT_CONST, TIME_LINE_INIT_INDEX} from "../../../../config/constant";

const TimelineMarkerLayer = () => {

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
            const reversedItems: IHistory[] = histFetchRes?.data && histFetchRes?.data?.length > 0 ? [...histFetchRes?.data.reverse()] : [];
            setReversedHistItems(reversedItems)
        }

        return (() => {
            setReversedHistItems([])
        })
    }, [histFetchRes, histFetchStatus])

    useEffect(() => {
        if (navInfo.isOpen) {
            const nextItem: IHistory = reversedHistItems[timelineIndex];
            if (timelineIndex !== TIME_LINE_INIT_INDEX && nextItem) {
                moveNextItem(nextItem);
                activeNextItem(markerList ? markerList : [], nextItem);
                // } else if (timelineIndex === histFetchRes?.data?.length) {
                //     finishedTimeline();
            } else {
                initTimeline();
            }
        }
    }, [navInfo.isOpen, timelineIndex])

    const moveNextItem = (nextItem: IHistory) => {
        map.setLevel(MAP_DEFAULT_CONST.zoomLv.timeline, {
            animate: {duration: 500},
            anchor: new kakao.maps.LatLng(+nextItem.lat, +nextItem.lng)
        })
        map.panTo(new kakao.maps.LatLng(+nextItem.lat, +nextItem.lng))

        // map.setCenter(new kakao.maps.LatLng(+MAP_DEFAULT_CONST.position.center.lat, +MAP_DEFAULT_CONST.position.center.lng))
        // map.set
    }

    const activeNextItem = (markerList: IHistory[], nextItem: IHistory) => {
        setTimeout(() => {
            markerList.push(nextItem);
            setMarkerList(markerList)
            setNavInfo({...navInfo, activeHistItem: nextItem})
        }, 600)
    }

    const initTimeline = () => {
        setNavInfo({...navInfo, activeHistItem: null})
        map.panTo(new kakao.maps.LatLng(+MAP_DEFAULT_CONST.position.center.lat, +MAP_DEFAULT_CONST.position.center.lng))
        map.setLevel(MAP_DEFAULT_CONST.zoomLv.init, {
            animate: {duration: 500}
        })
        // setToastStatus("deactivatedTimeline")
        //
        // setTimeout(()=> {
        //     setNavInfo({...navInfo, currentNav: "none", activeHistItem: null})
        // }, 2000)
    }

    const finishedTimeline = () => {
        // map.setCenter(new kakao.maps.LatLng(+MAP_DEFAULT_CONST.position.center.lat, +MAP_DEFAULT_CONST.position.center.lng))
        setNavInfo({...navInfo, activeHistItem: null})
        // map.setBounds(map.getBounds())
        // map.setLevel(MAP_DEFAULT_CONST.zoomLv.init, {animate: {duration: 900}})
        // setToastStatus("deactivatedTimeline")
        // setTimeout(() => {
        //     setNavInfo({...navInfo, currentNav: "none"})
        // }, 2000)
    }


    return (
        <>
            {
                markerList &&
                markerList.map((item: IHistory, index: number) => {
                    return (<MapMarker
                        key={`MAP_MARKER_KEY_TIMELINE_${item.id}_${index}`}
                        position={{lat: +item.lat, lng: +item.lng}}
                        clickable={true}
                        title={item.categoryContent}
                        draggable={true}
                        infoWindowOptions={{zIndex: 0}}
                    />)
                })
            }
        </>
    )
}

export default TimelineMarkerLayer
