import styled from "styled-components";
import useViewStore from "../../../../../store/viewStore";
import {TitleType} from "../../../../../types/common.types";

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
        setNavInfo({...navInfo, currentNav: clickedTitle});
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
            {/*<ProjectHistList*/}
            {/*    isActive={props.title === snbInfo.activeNavId}*/}
            {/*    isShow={props.title === "projects" && props.title === snbInfo.activeNavId}*/}
            {/*/>*/}
            {/*{*/}
            {/*    props.title === "by year" &&*/}
            {/*    props.title === snbInfo.activeNavId &&*/}
            {/*    <ByYearSubItem isActive={props.title === snbInfo.activeNavId}/>*/}
            {/*}*/}
        </>
    )
}

export default TimeLineNavItem

export const StItemArea = styled.div<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    margin-top: 11px;
    border-radius: 8px;
    width: 90%;
    height: 40px;

    transition: all 250ms;

    background: ${(props) => props.$isActive ? "#769FCD" : "#D6E6F2"};
    color: ${(props) => props.$isActive ? "#FFFFFF" : "black"};

    &:hover {
        background-color: ${(props) => props.$isActive ? "#769FCD" : "#B9D7EA"};;
    }

    &:active {
        color: #FFFFFF;
        background-color: #769FCD;
    }
`

const StTitle = styled.div`
    display: flex;
    align-items: center;
    padding-left: 11px;
`
