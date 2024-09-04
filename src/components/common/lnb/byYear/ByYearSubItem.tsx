import {IYearHistory} from "../../../../types/hist.types";
import {useYearHistQuery} from "../../../../querys/MapQuery";
import {useEffect, useState} from "react";
import useViewStore from "../../../../store/viewStore";
import styled from "styled-components";
import ByYearHistRecords from "./ByYearHistRecords";

interface IProps {
    isActive: boolean
}

const ByYearSubItem = (props: IProps) => {

    const {
        activeSubItemId,
        setActiveSubItemId,

        activeYear,
        setActiveYear,
    } = useViewStore();
    const {data: yearHistRes, isSuccess} = useYearHistQuery();
    const [yearHistItems, setYearHistItems] = useState<IYearHistory[]>([]);

    useEffect(() => {
        if (isSuccess) {
            yearHistRes?.data && yearHistRes?.data?.length > 0 && setYearHistItems(yearHistRes.data);
        }

        return (() => {
            setActiveSubItemId(null);
            setActiveYear(null);
        })
    }, [yearHistRes])

    const snbItemClickHandler = (clickedTitle: string) => {
        if (clickedTitle === activeYear) {
            return setActiveYear(null);
        }
        setActiveYear(clickedTitle);
    }

    useEffect(() => {
        console.log("yearHistItems ", yearHistItems)
    }, [yearHistItems])

    return (
        <>
            {
                yearHistItems.map((it: IYearHistory) => {
                    return (
                        <>
                            <StYearSubArea
                                key={`YEAR_HIST_ITEMS_KEY_${it.yearLabel}`}
                                $isOpen={props.isActive}
                                $isActive={activeYear === it.yearLabel}
                                $itemSize={1}
                                onClick={() => snbItemClickHandler(it.yearLabel)}
                            >
                                {it.yearLabel}
                            </StYearSubArea>
                            <ByYearHistRecords
                                isShow={activeYear === it.yearLabel}
                                activeId={activeYear}
                                histRecords={it.histRecords}
                            />
                        </>
                    )
                })
            }
        </>
    )
}

export default ByYearSubItem

const StYearSubArea = styled.div<{ $isOpen: boolean, $isActive: boolean, $itemSize: number }>`
    display: flex;
    align-items: center;
    width: 220px;

    //height: 20px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    transition: all 250ms;

    height: ${({$isOpen, $itemSize}) => $isOpen ? `calc(${$itemSize}*23px)` : '0'};
    opacity: ${({$isOpen}) => $isOpen ? '1' : '0'};
    visibility: ${({$isOpen}) => $isOpen ? 'visible' : 'hidden'};

    margin-top: 3px;
    padding-left: 11px;
    border-radius: 5px;

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
