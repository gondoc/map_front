import styled from "styled-components";
import useViewStore from "../../../../../store/viewStore";
import {TitleType} from "../../../../../types/common.types";
import YearList from "./YearList";
import {useYearHistQuery} from "../../../../../querys/MapQuery";
import {useEffect, useState} from "react";
import {IYearHistory} from "../../../../../types/hist.types";

interface IProps {
    title: TitleType,
}

const YearNavItem = (props: IProps) => {

    const {
        navInfo,
        setNavInfo,
    } = useViewStore();

    const {data: yearHistRes, isSuccess} = useYearHistQuery();
    const [yearHistItems, setYearHistItems] = useState<IYearHistory[]>([]);

    useEffect(() => {
        if (isSuccess) {
            yearHistRes?.data && yearHistRes?.data?.length > 0 && setYearHistItems(yearHistRes.data);
        }

        return (() => {
            setNavInfo({currentNav: "year", isOpen: false, year: null, activeHistItem: null})
        })
    }, [yearHistRes])

    const navItemClickHandler = (clickedTitle: TitleType) => {
        if (clickedTitle === navInfo.currentNav) {
            return setNavInfo({currentNav: "none", isOpen: false, year: null, activeHistItem: null});
        }
        setNavInfo({currentNav: "year", isOpen: true, year: {isOpen: false, activeYear: null}, activeHistItem: null});
    }

    return (
        <>
            <StItemArea
                key={`ST_NAV_ITEM_${props.title}`}
                $isActive={props.title === navInfo.currentNav}
                onClick={() => navItemClickHandler(props.title)}
            >
                <StTitle>{props.title}</StTitle>
            </StItemArea>
            <YearList
                isOpen={navInfo.currentNav === "year" && navInfo.isOpen}
                items={yearHistItems}
            />
        </>
    )
}

export default YearNavItem

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
