import {ISnbInfo} from "../types/common.types";

export const MAP_DEFAULT_CONST = {
    position: {center: {lat: 36.514217, lng: 127.602323}}, // initialize load default crdnt
    zoomLv: {
        init: 12,
        active: 10,
    },
}

export const INIT_SNB_INFO: ISnbInfo = {
    currentNav: "none",
    isOpen: false,
    activeHistItem: null,
    year: null,
}

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

}

export const LNB_AREA_CONSTANT = [
    {
        name: "project",
        items: [
            {label: "성남시 드론", value: "sungnamsi-drone"},
            {label: "밀양시 스마트", value: "miryangsi-smart"},
            {label: "세종시 행정안전부", value: "sejongsi-safety"},
            {label: "함양군 재난관제", value: "hamyanggun-disaster"},
            {label: "진주시 차량인식", value: "jinjusi-vehicle"},
            {label: "합천군 재난관제", value: "hapcheongun-disaster"},
            {label: "남해군 경로당", value: "namhaegun-senior"},
            {label: "하동군 경로당", value: "hadonggun-senior"},
            {label: "남해군 차량인식", value: "namhaegun-vehicle"},
            {label: "산청군 차량인식", value: "sancheonggun-vehicle"},
            {label: "영주시 차량인식", value: "yeongjusi-vehicle"},
        ]
    },
    {
        name: "by year",
        items: [
            {label: "성남시 드론", value: "sns"},
            {label: "밀양시 스마트", value: "mrs"},
            {label: "세종시 행정안전부", value: "sjs"},
            {label: "함양군 재난관제", value: "hyg"},
            {label: "진주시 차량인식", value: "jjs"},
            {label: "합천군 재난관제", value: "hcg"},
            {label: "남해군 경로당", value: "nhg"},
            {label: "하동군 경로당", value: "hdg"},
            {label: "남해군 차량인식", value: "nhg"},
            {label: "산청군 차량인식", value: "scg"},
            {label: "영주시 차량인식", value: "yjs"},
        ]
    },
    {
        name: "by category",
        items: [
            {label: "성남시 드론", value: "sns"},
            {label: "밀양시 스마트", value: "mrs"},
            {label: "세종시 행정안전부", value: "sjs"},
            {label: "함양군 재난관제", value: "hyg"},
            {label: "진주시 차량인식", value: "jjs"},
            {label: "합천군 재난관제", value: "hcg"},
            {label: "남해군 경로당", value: "nhg"},
            {label: "하동군 경로당", value: "hdg"},
            {label: "남해군 차량인식", value: "nhg"},
            {label: "산청군 차량인식", value: "scg"},
            {label: "영주시 차량인식", value: "yjs"},
        ]
    },
]










