import styled from "styled-components";
import {useHistQuery} from "../../../../querys/MapQuery";
import {useEffect, useState} from "react";
import {IHistory} from "../../../../types/hist.types";
import useViewStore from "../../../../store/viewStore";

interface IProps {
    isActive: boolean
}

const ProjectSubItem = (props: IProps) => {

    const {
        activeSubItemId,
        setActiveSubItemId,
    } = useViewStore();
    const {data: histFetchRes, isSuccess} = useHistQuery()
    const [projectItems, setProjectItems] = useState<IHistory[]>([]);
    // const [typing, setTyping] = useState<string>("");
    // const debouncedValue = useDebounce(typing, 1000);

    useEffect(() => {
        if (isSuccess) {
            histFetchRes?.data && histFetchRes?.data?.length > 0 && setProjectItems(histFetchRes.data);
        }

        return (() => {
            setActiveSubItemId(null);
        })
    }, [histFetchRes])

    const clickSubItemHandler = (clickedId: string) => {
        if (activeSubItemId === clickedId) {
            return setActiveSubItemId(null);
        }
        setActiveSubItemId(clickedId);
    }

    return (
        <StProjectItemArea
            $isOpen={props.isActive}
            $itemSize={projectItems.length}
        >
            {
                projectItems.map((it: IHistory) => {
                    return (
                        <StProjectItemLi
                            key={`ST_SUB_ITEM_LI_KEY_${it.id}`}
                            $isOpen={props.isActive}
                            $isActive={it.id === activeSubItemId}
                            onClick={() => clickSubItemHandler(it.id)}
                        >{it.siteNm.concat(" ").concat(it.categoryNm)}
                        </StProjectItemLi>
                    )
                })
            }
        </StProjectItemArea>
    )
}

export default ProjectSubItem

const StProjectItemArea = styled.div<{ $isOpen: boolean, $itemSize: number }>`
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 245px;
    margin: 0;
    padding-left: 15px;
    transition: all 250ms;
    height: ${({$isOpen, $itemSize}) => $isOpen ? `calc(${$itemSize}*23px)` : '0'};
    opacity: ${({$isOpen}) => $isOpen ? '1' : '0'};
    visibility: ${({$isOpen}) => $isOpen ? 'visible' : 'hidden'};
`

const StProjectItemLi = styled.div<{ $isOpen: boolean,$isActive: boolean }>`
    width: 225px;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 3px;
    padding-left: 8px;
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
