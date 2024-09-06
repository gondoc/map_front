import styled from "styled-components";
import useViewStore from "../../../../../store/viewStore";
import {TitleType} from "../../../../../types/common.types";
import {useEffect, useState} from "react";
import HistList from "./histList/HistList";
import {IHistory} from "../../../../../types/hist.types";
import {useHistQuery} from "../../../../../querys/MapQuery";

interface IProps {
    title: TitleType,
}

const ProjectNavItem = (props: IProps) => {

    const {
        navInfo,
        setNavInfo,
    } = useViewStore();

    const navItemClickHandler = (navTitle: TitleType) => {
        if (navTitle === navInfo.currentNav) {
            return setNavInfo({currentNav: "none", isOpen: false, year: null, activeHistItem: null}); // 동일 navItem click
        }
        setNavInfo({currentNav: "projects", isOpen: true, year: null, activeHistItem: null});
    }

    const {data: histFetchRes, isSuccess} = useHistQuery()

    const [projectItems, setProjectItems] = useState<IHistory[]>([]);

    useEffect(() => {
        if (isSuccess) {
            histFetchRes?.data && histFetchRes?.data?.length > 0 && setProjectItems(histFetchRes.data);
        }

        return (() => {
            setNavInfo({...navInfo, currentNav: "none", isOpen: false, activeHistItem: null})
        })
    }, [histFetchRes])

    return (
        <>
            <StItemArea
                key={`ST_NAV_ITEM_${props.title}`}
                $isActive={props.title === navInfo.currentNav}
                onClick={() => navItemClickHandler(props.title)}
            >
                <StTitle>{props.title}</StTitle>
            </StItemArea>
            <HistList
                isOpen={navInfo.currentNav === "projects" && navInfo.isOpen}
                items={projectItems}
            />
        </>
    )
}

export default ProjectNavItem

export const StItemArea = styled.div<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    margin-top: 11px;
    border-radius: 8px;
    width: 240px;
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
