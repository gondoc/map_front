import styled from "styled-components";
import {useState} from "react";
import SnbItem from "./SnbItem";

const SnbArea = () => {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <LnbAreaWrapper>
            <SnbItem title={"projects"} setActiveSnbItem={setActiveId} activeId={activeId}/>
            <SnbItem title={"by year"} setActiveSnbItem={setActiveId} activeId={activeId}/>
            <SnbItem title={"by category"} setActiveSnbItem={setActiveId} activeId={activeId}/>
            <SnbItem title={"timeline"} setActiveSnbItem={setActiveId} activeId={activeId}/>
        </LnbAreaWrapper>
    )
}

export default SnbArea

const LnbAreaWrapper = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 260px;
    height: 100%;
    left: 0;
    z-index: 10;
    background: #F7FBFC;
`
