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

// export interface ISnbInfo {
//     projects: {
//         isOpen: boolean,
//         activeItem: IHistory | null,
//     },
//     byYear: {
//         isOpen: boolean,
//         year: {
//             isOpen: boolean,
//             activeYear: string | null,
//             activeItem: IHistory | null,
//         },
//     },
//     timeLine: {
//         isOpen: boolean,
//         isActive: boolean,
//     }
// }
