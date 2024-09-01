import TopBar from "../components/common/TopBar";
import LnbArea from "../components/common/lnb/LnbArea";
import GisArea from "../components/gis/GisArea";
import UseInitPage from "../hooks/useInitPage";

const MainPage = ()=> {

    UseInitPage();

    return (
        <div className={"wrap"}>
            {/*탑바 영역*/}
            <TopBar/>
            {/*네비게이션 바*/}
            <LnbArea/>
            {/*지도 표출 영역*/}
            <GisArea/>
        </div>
    )
}

export default MainPage
