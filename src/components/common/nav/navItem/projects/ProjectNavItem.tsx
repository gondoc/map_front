import styled from "styled-components";
import useViewStore from "../../../../../store/viewStore";
import {TitleType} from "../../../../../types/common.types";
import {useEffect, useState} from "react";
import HistList from "./histList/HistList";
import {IHistory} from "../../../../../types/hist.types";
import {useHistQuery} from "../../../../../querys/MapQuery";
import SearchArea from "./search/SearchArea";

interface IProps {
    title: TitleType,
}

const ProjectNavItem = (props: IProps) => {

    const {
        navInfo,
        setNavInfo,

        searchWord,
        setToastStatus
    } = useViewStore();

    const navItemClickHandler = (navTitle: TitleType) => {
        if (navTitle === navInfo.currentNav) {
            return setNavInfo({currentNav: "none", isOpen: false, year: null, activeHistItem: null});
        }
        setNavInfo({currentNav: "projects", isOpen: true, year: null, activeHistItem: null});
    }

    const {data: histFetchRes, status: histFetchStatus} = useHistQuery()

    const [projectItems, setProjectItems] = useState<IHistory[]>([]);
    const [filterItems, setFilterItems] = useState<IHistory[]>([]);

    useEffect(() => {
        if (histFetchStatus === "success") {
            histFetchRes?.data && histFetchRes?.data?.length > 0 && setProjectItems(histFetchRes.data);
        }

        if (histFetchStatus === "error") {
            setToastStatus("error");
        }

        return (() => {
            setNavInfo({...navInfo, currentNav: "none", isOpen: false, activeHistItem: null})
        })
    }, [histFetchRes])

    useEffect(() => {
        if (projectItems.length > 0) {
            if (searchWord.length === 0) {
                return setFilterItems(projectItems);
            }

            if (searchWord.length > 0) {
                const findFilterItems: IHistory[] = findFilterItemsBySearchWord(projectItems, searchWord);
                findFilterItems.length === 0 && setToastStatus("noResult");
                return setFilterItems(findFilterItems);
            }
        }
    }, [projectItems, searchWord])

    const findFilterItemsBySearchWord = (histItems: IHistory[], searchWord: string): IHistory[] => {
        return histItems.filter((item: IHistory) => item.histNm.includes(searchWord));
    }

    useEffect(() => {
        console.log("filterItems ", filterItems)
    }, [filterItems])

    return (
        <>
            <StItemArea
                key={`ST_NAV_ITEM_${props.title}`}
                $isActive={props.title === navInfo.currentNav}
                onClick={() => navItemClickHandler(props.title)}
            >
                <StTitle>{props.title}</StTitle>
            </StItemArea>
            <SearchArea
                isOpen={navInfo.currentNav === "projects" && navInfo.isOpen}
            />
            <HistList
                isOpen={navInfo.currentNav === "projects" && navInfo.isOpen}
                items={filterItems}
            />
        </>
    )
}

export default ProjectNavItem

export const StItemArea = styled.div<{ $isActive: boolean }>`
    position: relative;

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

export const StTitle = styled.div`
    display: flex;
    align-items: center;
    padding-left: 11px;
`
