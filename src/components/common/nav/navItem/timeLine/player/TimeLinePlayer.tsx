import {useEffect, useState} from "react";
import useViewStore from "../../../../../../store/viewStore";
import {useHistQuery} from "../../../../../../querys/MapQuery";
import {IHistory} from "../../../../../../types/hist.types";

interface IProps {
    isActive: boolean
}

const TimeLinePlayer = (props: IProps) => {

    const {
        setToastStatus,
        navInfo,
        setNavInfo,
    } = useViewStore();

    const {data: histFetchRes, status: histFetchStatus} = useHistQuery();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    useEffect(() => {
        if (props.isActive && histFetchStatus === "success") {
            const originHistItems: IHistory[] = histFetchRes?.data;
            const histItems = originHistItems.reverse()
            if (histItems && histItems.length > 0) {
                setToastStatus("timeline");
                setCurrentIndex(0);
                setNavInfo({...navInfo, activeHistItem: histItems[0]});
            }
        }
    }, [props.isActive, histFetchStatus]);

    useEffect(() => {
        if (props.isActive && histFetchStatus === "success") {
            const histItems: IHistory[] = histFetchRes?.data;
            if (histItems && histItems.length > 0) {
                const timer = setTimeout(() => {
                    const nextIndex = (currentIndex + 1) % histItems.length;
                    setCurrentIndex(nextIndex);
                    setNavInfo({...navInfo, activeHistItem: histItems[nextIndex]});
                }, 5000);
                return () => clearTimeout(timer);
            }
        }
    }, [props.isActive, histFetchStatus, currentIndex]);

    useEffect(() => {
        console.log("navInfo.activeHistItem ", navInfo.activeHistItem)
    }, [navInfo.activeHistItem])

    return (
        <></>
    )
}

export default TimeLinePlayer
