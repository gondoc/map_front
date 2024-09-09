import {IYearHistory} from "../../../../../../types/hist.types";
import useViewStore from "../../../../../../store/viewStore";
import styled from "styled-components";
import HistList, {StNavSubItemArea} from "../../projects/histList/HistList";

interface IProps {
    isOpen: boolean
    items: IYearHistory[]
}

const YearList = (props: IProps) => {

    const {
        navInfo,
        setNavInfo,
    } = useViewStore();

    const yearLabelClickHandler = (yearLabel: string) => {
        if (yearLabel === navInfo?.year?.activeYear) {
            return setNavInfo({...navInfo, year: {isOpen: false, activeYear: null}, activeHistItem: null});
        }
        setNavInfo({...navInfo, year: {isOpen: true, activeYear: yearLabel}, activeHistItem: null});
    }

    return (
        <StNavSubItemArea
            $isOpen={props.isOpen}
            $itemSize={props?.items?.length}
        >
            {
                props.items.map((it: IYearHistory) => {
                    return (
                        <StYearSubArea key={`YEAR_HIST_ITEMS_KEY_${it.yearLabel}`}>
                            <StYearLabelArea
                                $isActive={navInfo?.year?.activeYear === it.yearLabel}
                                onClick={() => yearLabelClickHandler(it.yearLabel)}
                            >{it.yearLabel}</StYearLabelArea>
                            <HistList
                                items={it.histRecords}
                                isOpen={
                                    navInfo.currentNav === "year" &&
                                    navInfo.year?.activeYear === it.yearLabel
                                }
                            />
                        </StYearSubArea>
                    )
                })
            }
        </StNavSubItemArea>
    )
}

export default YearList

const StYearSubArea = styled.div``

const StYearLabelArea = styled.div<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    width: 232px;
    height: 20px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    margin-top: 3px;
    padding-left: 8px;
    border-radius: 5px;

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
