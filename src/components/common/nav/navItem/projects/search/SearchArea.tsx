import styled from "styled-components";
import {useEffect, useState} from "react";
import useDebounce from "../../../../../../hooks/useDebounce";

interface IProps {
    isOpen: boolean,
    setDebouncedTyping: Function,
}

const SearchArea = (props: IProps) => {

    const [typing, setTyping] = useState<string>("");
    const debouncedValue = useDebounce(typing, 300);

    useEffect(() => {
        props.setDebouncedTyping(debouncedValue);
    }, [debouncedValue])

    useEffect(() => {
        !props.isOpen && setTyping("");
    }, [props.isOpen])

    return (
        <StSearchArea
            $isOpen={props.isOpen}
        >
            <StProjectSearchInput
                type={"search"}
                placeholder={"검색"}
                value={typing}
                onChange={(e) => setTyping(e.target.value)}
            />
        </StSearchArea>
    )
}

export default SearchArea

const StSearchArea = styled.div<{ $isOpen: boolean }>`
    position: relative;
    transition: all 250ms;
    height: ${({$isOpen}) => $isOpen ? '35px' : '0'};
    opacity: ${({$isOpen}) => $isOpen ? '1' : '0'};
    visibility: ${({$isOpen}) => $isOpen ? 'visible' : 'hidden'};

    &:focus {
        background-color: #769FCD
    }
`

const StProjectSearchInput = styled.input`
    border: none;
    width: 240px;
    margin-top: 3px;
    padding-left: 8px;
    border-radius: 5px;
    height: 31px;
    background-color: #B9D7EA;

    &:focus {
        outline: none;
    }
`
