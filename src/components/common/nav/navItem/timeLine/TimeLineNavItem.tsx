import useViewStore from "../../../../../store/viewStore";
import {TitleType} from "../../../../../types/common.types";
import {StItemArea, StTitle} from "../projects/ProjectNavItem";
import TimeLinePlayer from "./player/TimeLinePlayer";

interface IProps {
    title: TitleType,
}

const TimeLineNavItem = (props: IProps) => {

    const {
        navInfo,
        setNavInfo,
    } = useViewStore();

    const snbItemClickHandler = (clickedTitle: TitleType) => {
        if (clickedTitle === navInfo.currentNav) {
            return setNavInfo({currentNav: "none", isOpen: false, year: null, activeHistItem: null});
        }
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
            <TimeLinePlayer
                isOpen={navInfo.currentNav === "timeline" && navInfo.isOpen}
            />
        </>
    )
}

export default TimeLineNavItem
