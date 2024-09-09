import TopBar from "../components/common/TopBar";
import NavArea from "../components/common/nav/NavArea";
import GisArea from "../components/gis/GisArea";
import UseInitPage from "../hooks/useInitPage";
import ToastArea from "../components/common/toast/ToastArea";

const MainPage = ()=> {

    UseInitPage();

    return (
        <div className={"wrap"}>
            {/*탑바 영역*/}
            <TopBar/>
            {/*네비게이션 바*/}
            <NavArea/>
            {/*지도 표출 영역*/}
            <GisArea/>
            {/*토스트 알림 영역*/}
            <ToastArea/>
        </div>
    )
}

export default MainPage
