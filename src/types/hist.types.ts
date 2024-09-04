export interface IHistory {
    categoryContent: string,
    categoryNm: string,
    startDtm: string,
    endDtm: string,
    histNm: string,
    id: string,
    lat: string,
    lng: string,
    logoImgPath: string,
    siteNm: string,
    staffCnt: number
}

export interface IYearHistory {
    yearLabel: string,
    histRecords: IHistory[]
}
