import useViewStore from "../../../../../store/viewStore";
import {TitleType} from "../../../../../types/common.types";
import {StItemArea, StTitle} from "../projects/ProjectNavItem";
import TimeLinePlayer from "./player/TimeLinePlayer";
import {useHistQuery} from "../../../../../querys/MapQuery";
import {IHistory} from "../../../../../types/hist.types";

interface IProps {
    title: TitleType,
}

const TimeLineNavItem = (props: IProps) => {

    const {
        navInfo,
        setNavInfo,
        setToastStatus
    } = useViewStore();

    const {data: histFetchRes, status: histFetchStatus} = useHistQuery();

    const snbItemClickHandler = (clickedTitle: TitleType) => {
        if (clickedTitle === navInfo.currentNav) {
            setToastStatus("deactivatedTimeline");
            return setNavInfo({currentNav: "none", isOpen: false, year: null, activeHistItem: null});
        }
        setToastStatus("activeTimeline");
        setNavInfo({currentNav: clickedTitle, isOpen: true, year: null, activeHistItem: null});
    }

    return (
        <>
            <StItemArea
                key={`ST_SNB_ITEM_AREA_${props.title}`}
                $isActive={props.title === navInfo.currentNav}
                onClick={() => snbItemClickHandler(props.title)}
            >
                <StTitle>{props.title}</StTitle>
            </StItemArea>
            {/*{*/}
            {/*    histFetchStatus === "success" && histFetchRes?.data?.length > 0 &&*/}
            {/*    <TimeLinePlayer*/}
            {/*        isActive={navInfo.currentNav === "timeline" && navInfo.isOpen}*/}
            {/*    />*/}
            {/*}*/}
        </>
    )
}

export default TimeLineNavItem
