import styled from "styled-components";
import ProjectSubItem from "./projects/ProjectSubItem";
import ByYearSubItem from "./byYear/ByYearSubItem";

interface IProps {
    title: string,
    activeId: string | null,
    setActiveSnbItem: Function,
}

const SnbItem = (props: IProps) => {

    const snbItemClickHandler = (clickedTitle: string) => {
        if (clickedTitle === props.activeId) {
            return props.setActiveSnbItem(null);
        }
        props.setActiveSnbItem(props.title);
    }

    return (
        <>
            <StItemArea
                key={`ST_SNB_ITEM_AREA_${props.title}`}
                $isActive={props.title === props.activeId}
                onClick={() => snbItemClickHandler(props.title)}
            >
                <StTitle>{props.title}</StTitle>
            </StItemArea>
            {
                props.title === "projects" &&
                props.title === props.activeId &&
                <ProjectSubItem isActive={props.title === props.activeId}/>
            }
            {
                props.title === "by year" &&
                props.title === props.activeId &&
                <ByYearSubItem isActive={props.title === props.activeId}/>
            }
        </>
    )
}

export default SnbItem

const StItemArea = styled.div<{ $isActive: boolean }>`
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
