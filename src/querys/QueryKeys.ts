export const QueryKeys = {

    // 지도 POI 리스트 조회
    MAP: {
        map: ["map"] as const,
        list: () => [...QueryKeys.MAP.map, "list"] as const,
        year: () => [...QueryKeys.MAP.map, "year"] as const,
        time: () => [...QueryKeys.MAP.map, "time"] as const,
    }


}
