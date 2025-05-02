import useViewStore from "@store/viewStore";
import {TitleType} from "@type/common.types";
import {IYearHistory} from "@type/hist.types";
import YearList from "@component/common/nav/navItem/year/yearList/YearList";
import {useYearHistQuery} from "@query/MapQuery";
import {useEffect, useState} from "react";
import {StItemArea, StTitle} from "@component/common/nav/navItem/projects/ProjectNavItem";

interface IProps {
    title: TitleType,
}

const YearNavItem = (props: IProps) => {

    const {
        navInfo,
        setNavInfo,
    } = useViewStore();

    const {data: yearHistRes, isSuccess} = useYearHistQuery();
    const [yearHistItems, setYearHistItems] = useState<IYearHistory[]>([]);

    useEffect(() => {
        if (isSuccess) {
            yearHistRes?.data && yearHistRes?.data?.length > 0 && setYearHistItems(yearHistRes.data);
        }

        return (() => {
            setNavInfo({...navInfo, currentNav: "none", isOpen: false, activeHistItem: null})
        })
    }, [yearHistRes])

    const navItemClickHandler = (clickedTitle: TitleType) => {
        if (clickedTitle === navInfo.currentNav) {
            return setNavInfo({currentNav: "none", isOpen: false, year: null, activeHistItem: null});
        }
        setNavInfo({currentNav: "year", isOpen: true, year: {isOpen: false, activeYear: null}, activeHistItem: null});
    }

    return (
        <>
            <StItemArea
                key={`ST_NAV_ITEM_${props.title}`}
                $isActive={props.title === navInfo.currentNav}
                onClick={() => navItemClickHandler(props.title)}
            >
                <StTitle>{props.title}</StTitle>
            </StItemArea>
            <YearList
                isOpen={navInfo.currentNav === "year" && navInfo.isOpen}
                items={yearHistItems}
            />
        </>
    )
}

export default YearNavItem
