import UseInitPage from "@hook/useInitPage";
import NavArea from "@component/common/nav/NavArea";
import GisArea from "@component/gis/GisArea";
import ToastArea from "@component/common/toast/ToastArea";
import NotDisplayToday from "@component/notice/NotDisplayToday";
import TopBar from "@component/common/TopBar";

const MainPage = () => {

    UseInitPage();

    return (
        <div className={"wrap"}>
            {/*안내*/}
            <NotDisplayToday/>
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
