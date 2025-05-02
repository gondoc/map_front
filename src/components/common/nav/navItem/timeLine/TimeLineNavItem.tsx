import useViewStore from "@store/viewStore";
import {TitleType} from "@type/common.types";
import {StItemArea, StTitle} from "@component/common/nav/navItem/projects/ProjectNavItem";

interface IProps {
    title: TitleType,
}

const TimeLineNavItem = (props: IProps) => {

    const {
        navInfo,
        setNavInfo,
        setToastStatus
    } = useViewStore();

    const snbItemClickHandler = (clickedTitle: TitleType) => {
        if (clickedTitle === navInfo.currentNav) {
            setToastStatus("deactivatedTimeline");
            return setNavInfo({currentNav: "none", isOpen: false, year: null, activeHistItem: null});
        }
        setToastStatus("activeTimeline");
        setNavInfo({currentNav: clickedTitle, isOpen: true, year: null, activeHistItem: null});
    }

    return (
        <StItemArea
            key={`ST_SNB_ITEM_AREA_${props.title}`}
            $isActive={props.title === navInfo.currentNav}
            onClick={() => snbItemClickHandler(props.title)}
        >
            <StTitle>{props.title}</StTitle>
        </StItemArea>
    )
}

export default TimeLineNavItem
