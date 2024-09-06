import styled from "styled-components";
import {IHistory} from "../../../../../../types/hist.types";
import useViewStore from "../../../../../../store/viewStore";

interface IProps {
    items: IHistory[],
    isOpen: boolean,
}

const HistList = (props: IProps) => {

    const {
        navInfo,
        setNavInfo,
    } = useViewStore();

    const histItemClickHandler = (clickedItem: IHistory) => {
        if (navInfo?.activeHistItem?.id === clickedItem.id) {
            return setNavInfo({...navInfo, activeHistItem: null});
        }
        setNavInfo({...navInfo, activeHistItem: clickedItem})
    }

    {/*>{it.siteNm.concat(" ").concat(it.categoryNm)}*/}
    return (
        <StNavSubItemArea
            $isOpen={props.isOpen}
            $itemSize={props?.items?.length}
        >
            {
                props?.items?.map((it: IHistory) => {
                    return (
                        <StProjectItemLi
                            key={`ST_HIST_ITEM_LI_KEY_${it.id}`}
                            $isActive={it.id === navInfo?.activeHistItem?.id}
                            onClick={() => histItemClickHandler(it)}
                        >{it.histNm}
                        </StProjectItemLi>
                    )
                })
            }
        </StNavSubItemArea>
    )
}

export default HistList

export const StNavSubItemArea = styled.div<{ $isOpen: boolean, $itemSize: number }>`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 240px;

    transition: all 250ms;
    height: ${({$isOpen, $itemSize}) => $isOpen ? `calc(${$itemSize}*23px)` : '0'};
    opacity: ${({$isOpen}) => $isOpen ? '1' : '0'};
    visibility: ${({$isOpen}) => $isOpen ? 'visible' : 'hidden'};
`

export const StProjectItemLi = styled.div<{ $isActive: boolean }>`
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
        background-color: #78B7D0;
    }
`
