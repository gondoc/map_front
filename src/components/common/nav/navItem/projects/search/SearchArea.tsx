import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import useDebounce from "../../../../../../hooks/useDebounce";
import useViewStore from "../../../../../../store/viewStore";

interface IProps {
    isOpen: boolean,
}

const SearchArea = (props: IProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const {
        setSearchWord
    } = useViewStore();
    const [typing, setTyping] = useState<string>("");
    const debouncedValue = useDebounce(typing, 1000);

    useEffect(() => {
        setSearchWord(debouncedValue);
    }, [debouncedValue])

    useEffect(() => {
        if (props.isOpen) {
            // inputRef?.current.focus();
        } else {
            setTyping("");
        }
    }, [props.isOpen])

    const focusInput = () => {
        return inputRef.current !== null && inputRef?.current.focus();
    }

    const onKeyUpHandler = (pressKey: string) => {
        if (pressKey === "escape") {
            setSearchWord("")
            return setTyping("")
        }
    }

    return (
        <StSearchArea
            $isOpen={props.isOpen}
        >
            <StProjectSearchInput
                ref={el => {
                    return el !== null && el;
                }}
                // innerref={inputRef}
                // innerRef={inputRef}
                type={"search"}
                placeholder={"검색"}
                value={typing}
                onChange={(e) => setTyping(e.target.value)}
                onKeyUp={(e) => onKeyUpHandler(e.key)}
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
