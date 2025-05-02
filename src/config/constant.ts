import {INavInfo} from "@type/common.types";

export const MAP_DEFAULT_CONST = {
    position: {center: {lat: 36.514217, lng: 127.602323}}, // initialize load default crdnt
    zoomLv: {
        init: 12,
        active: 10,
        timeline: 11,
    },
}

export const INIT_SNB_INFO: INavInfo = {
    currentNav: "none",
    isOpen: false,
    activeHistItem: null,
    year: null,
}

export const TIME_LINE_INIT_INDEX = -1;

export const TOAST_CONTENT = {
    none: {
        content: "",
    },
    noResult: {
        content: `설정한 {search} 검색어에 대한 검색 결과가 없습니다.`
    },
    reset: {
        content: "화면이 초기화되었습니다."
    },
    error: {
        content: "에러가 발생하였습니다. 잠시후 시도 바랍니다."
    },
    activeTimeline: {
        content: "타임라인 기능을 시작합니다."
    },
    deactivatedTimeline: {
        content: "타임라인 기능을 종료합니다."
    },
}