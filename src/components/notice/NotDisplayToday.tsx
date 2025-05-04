import styled from "styled-components";
import React, {useEffect, useState} from "react";
import close_btn from "@image/close_btn.svg";
import dayjs from "dayjs";


const NotDisplayToday = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        const checkPopupStatus = () => {
            const expireTime = localStorage.getItem("popupExpireTime");

            if (!expireTime || dayjs().valueOf() > parseInt(expireTime)) {
                setIsOpen(true);

                if (expireTime) {
                    localStorage.removeItem("popupExpireTime");
                }
            }

        }

        checkPopupStatus();
    }, [])

    const closePopupClickHandler = () => {
        if (isChecked) {
            const expireTime = dayjs().add(1, 'day').startOf('day').valueOf();
            localStorage.setItem("popupExpireTime", expireTime.toString());
        }
        setIsOpen(false);
    }

    return (
        <NotTodayArea $isActive={isOpen}>
            <DimmedArea/>
            <PopupArea>
                <PopupHeader>
                    <Title>Career Map - 커리어 맵</Title>
                    <CloseBtn type={"button"} onClick={() => closePopupClickHandler()}></CloseBtn>
                </PopupHeader>

                <PopupBody>
                    안녕하세요<br/>
                    간단하게 <a target={"_blank"} rel={"noopener noreferrer"}
                            href={"https://react-kakao-maps-sdk.jaeseokim.dev/"}>react-kakao-maps.sdk</a> 로 전국 프로젝트 수행 지도화 웹사이트를 만들어봤습니다.<br/>
                    <br/>
                    현재 근무 중인 회사는 주로 공공기관과 지방자치단체를 대상으로 B2B 사업을 하고 있습니다.<br/>
                    업무 특성상 전국 지방자치단체 및 시·군·구의 현장을 방문하여 솔루션 개발, 운영, 유지보수 업무를 수행하는 경우가 있습니다.<br/>
                    이에 따라 전국에서 수행한 프로젝트들을 지도에 기록으로 남기고 싶다는 생각이 들어 해당 작업을 진행하게 되었습니다.<br/>
                    <br/>
                    Career Map 프로젝트는 React 모듈과 Spring Boot 모듈로 분리되어 있습니다.<br/>
                    React 에는 Kakao 지도를 적용하였고, 상태 관리는 Zustand 를 활용하였습니다.<br/>
                    서버와의 데이터 통신은 React Query 를 통해 처리하였습니다.<br/>
                    <br/>
                    서버는 Java 와 Spring Boot 기반이며, MVC 패턴 구조를 따르고 있습니다.<br/>
                    ORM 은 JPA 와 Querydsl 을 혼용하여 사용하였습니다.<br/>
                    각 모듈은 Docker 컨테이너로 구성하였고, AWS 환경에서 클라우드 기반으로 동작하도록 설정하였습니다.<br/>
                    <br/>
                    방문해주셔서 감사합니다.
                </PopupBody>

                <PopupFooter>
                    <CheckBox
                        type={"checkbox"} checked={isChecked}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsChecked(e.target.checked)}
                    />
                    <CheckBoxLabel
                        onClick={() => setIsChecked(!isChecked)}>오늘 하루 그만 보기</CheckBoxLabel>
                </PopupFooter>

            </PopupArea>
        </NotTodayArea>
    )
}

export default NotDisplayToday

const NotTodayArea = styled.div<{ $isActive: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;

    visibility: ${({$isActive}) => $isActive ? 'visible' : 'hidden'};
    opacity: ${({$isActive}) => $isActive ? '1' : '0'};
    transition: ${({$isActive}) => $isActive ? 'opacity 450ms' : 'visibility 1ms 450ms, opacity 450ms'};
`

const DimmedArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`

const PopupArea = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 644px;
    z-index: 3;
    background-color: #F7FBFC;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid #769FCD;
    border-radius: 8px;
`

const PopupHeader = styled.div`
    width: auto;
    height: 30px;
    display: flex;
    padding: 0 5px;
    align-items: center;
    justify-content: space-between;
    background-color: #D6E6F2;
    border-radius: 8px 8px 0 0;
`

const Title = styled.div`
`

const CloseBtn = styled.button`
    width: 23px;
    height: 23px;
    background-color: #D6E6F2;
    border-radius: 3px;
    border: 2px solid #769FCD;

    background-image: url(${close_btn});

    &:hover {
        cursor: pointer;
        background-color: #B9D7EA;
    }

    &:active {
        background-color: #769FCD
    }
`

const PopupBody = styled.div`
    padding: 5px 8px;
`

const PopupFooter = styled.div`
    height: 20px;
    background-color: #D6E6F2;
    display: flex;
    align-items: center;
`

const CheckBox = styled.input`
    accent-color: #F7FBFC;
`

const CheckBoxLabel = styled.label`
    &:hover {
        cursor: pointer;
    }
`


