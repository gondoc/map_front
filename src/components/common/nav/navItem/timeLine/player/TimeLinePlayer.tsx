import {useEffect, useState} from "react";
import useViewStore from "../../../../../../store/viewStore";
import {useHistQuery} from "../../../../../../querys/MapQuery";
import {IHistory} from "../../../../../../types/hist.types";

interface IProps {
    isActive: boolean,
    // items: IHistory[],
}


const reverseItems = (histItems: IHistory[] | undefined): IHistory[] => {
    return histItems ? histItems.reverse() : [];
}

const TimeLinePlayer = (props: IProps) => {

    const {
        navInfo,
        setNavInfo,
    } = useViewStore();

    const {data: histFetchRes, status: histFetchStatus} = useHistQuery()

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    useEffect(() => {
        console.log("props.isActive ", props.isActive)
        console.log("currentIndex ", currentIndex)
        if (props.isActive) {
            const reverseHistItems: IHistory[] = reverseItems(histFetchRes?.data);
            console.log("reverseHistItems " ,reverseHistItems)
            // setTimeout(() => {
            //     const find: IHistory = reverseHistItems[currentIndex];
            //     console.log("find ", find)
            //     find && setNavInfo({...navInfo, activeHistItem: find})
            //     setCurrentIndex(currentIndex + 1);
            // }, 2000) // 체류 초 시간
        } else {
            setCurrentIndex(0);
        }
    }, [props.isActive, currentIndex]);

    return (
        <></>
    )
}

export default TimeLinePlayer
