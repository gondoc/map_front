import gis_poi_active_01 from "@image/gis_poi_active_01.png";
import gis_poi_default_01 from "@image/gis_poi_default_01.png";

import {MapMarker} from "react-kakao-maps-sdk";
import React, {useEffect, useState} from "react";
import useViewStore from "@store/viewStore";
import {useHistQuery, useYearHistQuery} from "@query/MapQuery";
import {IHistory, IYearHistory} from "@type/hist.types";

const MarkerLayer = () => {

    const {
        navInfo,
        setNavInfo,
        searchWord
    } = useViewStore();

    const {data: histFetchRes, status: histFetchStatus} = useHistQuery();
    const {data: yearHistFetchRes, status: yearHistFetchStatus} = useYearHistQuery();

    const [showHistList, setShowHistList] = useState<IHistory[]>([]);

    useEffect(() => {
        if (navInfo.currentNav !== "year") {
            if (histFetchStatus === "success") {
                const showList: IHistory[] = filterBySearchWord(histFetchRes.data);
                return setShowHistList(showList);
            }
        } else {
            if (yearHistFetchStatus === "success" && navInfo?.year?.activeYear) {
                const showList: IHistory[] = yearHistFetchRes?.data
                    .find((yearHist: IYearHistory) => yearHist.yearLabel === navInfo.year?.activeYear)
                    ?.histRecords as IHistory[];
                return setShowHistList(showList);
            }
        }
    }, [navInfo, histFetchRes, yearHistFetchRes, searchWord])

    const filterBySearchWord = (originItems: IHistory[]): IHistory[] => {
        return originItems.filter((hist: IHistory) => hist.histNm.includes(searchWord)) as IHistory[];
    }

    const clickMarkerHandler = (item: IHistory): void => {
        if (navInfo?.activeHistItem?.id === item.id) {
            return setNavInfo({...navInfo, activeHistItem: null});
        }
        setNavInfo({...navInfo, activeHistItem: item});
    }

    return (
        <>
            {
                showHistList.map((item: IHistory) => {
                    const isActive: boolean = item.id === navInfo.activeHistItem?.id;
                    return (<MapMarker
                        key={`MAP_MARKER_KEY_${item.id}`}
                        position={{lat: +item.lat, lng: +item.lng}}
                        clickable={true}
                        onClick={() => clickMarkerHandler(item)}
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

export default MarkerLayer
