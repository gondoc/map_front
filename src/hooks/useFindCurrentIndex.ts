import {useEffect, useState} from "react";
import {TIME_LINE_INIT_INDEX} from "@config/constant";

interface IProps {
    isActive: boolean,
    lastIndex: number
}

const UseFindCurrentIndex = (props: IProps) => {

    const [currentIndex, setCurrentIndex] = useState<number>(TIME_LINE_INIT_INDEX);

    useEffect(() => {
        if (props.isActive) {
            setTimeout(() => {
                const nextIndex: number = currentIndex + 1 > props.lastIndex ? TIME_LINE_INIT_INDEX : currentIndex + 1;
                setCurrentIndex(nextIndex)
            }, 2000)
        } else {
            setCurrentIndex(0) // init
        }
    }, [props.isActive, currentIndex])

    return currentIndex
}

export default UseFindCurrentIndex
