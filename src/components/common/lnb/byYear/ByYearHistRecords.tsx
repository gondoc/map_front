import {IHistory} from "../../../../types/hist.types";
import styled from "styled-components";
import {useEffect} from "react";

interface IProps {
    isShow: boolean,
    activeId: string | null,
    histRecords: IHistory[]
}

const ByYearHistRecords = (props: IProps) => {

    useEffect(() => {
        console.log("props.isShow ", props)
    }, [props.isShow])

    return (
        <StYearSubAreaUl
            $isOpen={props.isShow}
            $itemSize={props.histRecords.length}
        >
            {
                props.histRecords.map((hist: IHistory) => {
                    return (
                        <StYearSubAreaLi
                            key={`ST_YEAR_HIST_RECORD_LI_KEY_${hist.id}`}
                            $isOpen={props.isShow}
                            $isActive={hist.id === props.activeId}
                            // onClick={() => setActiveYear(it.yearLabel)}
                        >{hist.siteNm}
                        </StYearSubAreaLi>
                    )
                })

            }
        </StYearSubAreaUl>
    )
}

export default ByYearHistRecords

const StYearSubAreaUl = styled.div<{ $isOpen: boolean, $itemSize: number }>`
    width: 225px;
    margin: 0;
    padding-left: 15px;
    transition: all 250ms;
    height: ${({$isOpen, $itemSize}) => $isOpen ? `calc(${$itemSize}*23px)` : '0'};
    opacity: ${({$isOpen}) => $isOpen ? '1' : '0'};
    visibility: ${({$isOpen}) => $isOpen ? 'visible' : 'hidden'};

`

const StYearSubAreaLi = styled.div<{ $isOpen: boolean, $isActive?: boolean }>`
    width: 215px;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 3px;
    padding-left: 5px;
    border-radius: 5px;
    transition: all 250ms;
    opacity: ${({$isOpen}) => $isOpen ? '1' : '0'};
    visibility: ${({$isOpen}) => $isOpen ? 'visible' : 'hidden'};

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
