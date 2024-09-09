import {IHistory} from "./hist.types";

export interface IResponse<T> {
    code: number;
    message: string;
    data: T
}

export interface ILabelValue {
    label: string,
    value: string
}

export type TitleType = "none" // 초기화 상태
    | "projects"    // 전체 보기
    | "year"     // 연도별 보기
    | "timeline"    // 타임라인 보기

export interface ISnbInfo {
    currentNav: TitleType
    isOpen: boolean,
    activeHistItem: IHistory | null,
    year: {
        isOpen: boolean,
        activeYear: string | null,
    } | null,
    isPlay?: boolean
}

export type ToastStatusType = "none" // 토스트 초기화 상태
    | "noResult"   // 검색 결과 없음.
    | "reset"       // 화면이 초기화되었습니다.
    | "error"       // 통신 상태 에러 // 잠시후 다시 시도 바랍니다.
