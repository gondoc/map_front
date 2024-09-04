import TopBar from "../components/common/TopBar";
import SnbArea from "../components/common/lnb/SnbArea";
import GisArea from "../components/gis/GisArea";
import UseInitPage from "../hooks/useInitPage";

const MainPage = ()=> {

    UseInitPage();

    return (
        <div className={"wrap"}>
            {/*탑바 영역*/}
            <TopBar/>
            {/*네비게이션 바*/}
            <SnbArea/>
            {/*지도 표출 영역*/}
            <GisArea/>
        </div>
    )
}

export default MainPage
