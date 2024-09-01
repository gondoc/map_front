import styled from "styled-components";
import {useEffect, useState} from "react";
import useDebounce from "../../../hooks/useDebounce";

const LnbArea = () => {

    const [typing, setTyping] = useState<string>("");
    const debouncedValue = useDebounce(typing, 1000);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        console.log("debouncedValue", debouncedValue);
    }, [debouncedValue])

    return (
        <LnbAreaWrapper>
            <div>projects</div>
            <div>by year</div>
            <div>by category</div>
            <div>timeline</div>
        </LnbAreaWrapper>
    )
}

export default LnbArea

const LnbAreaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 100%;
    left: 0;
    background: #000;
    z-index: 10;

    input {
        margin-top: 10px;
    }

    div {
        display: flex;
        width: 180px;
        padding: 10px;
        height: 30px;
        margin-top: 6px;
        background: white;
        align-items: center;
    }
`
