import styled from "styled-components";
import useViewStore from "../../store/viewStore";
import useMapStore from "../../store/mapStore";
import {useMap} from "react-kakao-maps-sdk";
import {MAP_DEFAULT_CONST} from "../../config/constant";

const ResetBtn = () => {

    const map: kakao.maps.Map = useMap();

    const {
        resetNavInfo,
        setSearchWord,
        setToastStatus,
    } = useViewStore();

    const resetBtnClickHandler = () => {
        console.log("reset btn clicked !!")

        resetNavInfo(); // 내비게이션 영역 초기화 처리

        setSearchWord(""); // 검색어 초기화 처리

        // 지도 영역 초기화 처리
        map.setLevel(MAP_DEFAULT_CONST.zoomLv.init)
        map.setCenter(new kakao.maps.LatLng(MAP_DEFAULT_CONST.position.center.lat, MAP_DEFAULT_CONST.position.center.lng))

        setToastStatus("reset") // 화면 초기화 알람 토스트 팝업 처리
    }

    return (
        <StResetBtnArea onClick={() => resetBtnClickHandler()}>
            초기화
        </StResetBtnArea>
    )
}

export default ResetBtn

const StResetBtnArea = styled.div`
    position: absolute;
    display: flex;
    top: 59px;
    left: 270px;
    align-items: center;
    justify-content: center;
    width: 94px;
    height: 34px;
    z-index: 10;
    border-radius: 8px;
    border: 3px solid #769FCD;

    background: #D6E6F2;
    color: black;

    &:hover {
        background-color: #B9D7EA;
    }

    &:active {
        color: #FFFFFF;
        background-color: #769FCD;
    }

`
