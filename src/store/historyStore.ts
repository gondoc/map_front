import {_MapProps} from "react-kakao-maps-sdk/dist/components/Map";
import {create} from "zustand";
import {MAP_DEFAULT_CONST} from "../config/constant";

// interface IHistoryStore {
//
//     zoomLevel: number;
//     setZoomLevel: (arg: number) => void;
//
//     mapCenter: _MapProps;
//     setMapCenter: (arg: _MapProps) => void;
// }
//
// const useMapStore = create<IMapStore>((set) => ({
//     zoomLevel: MAP_DEFAULT_CONST.zoomLv,
//     setZoomLevel: (arg: number) => set((state) => ({zoomLevel: arg})),
//
//     mapCenter: MAP_DEFAULT_CONST.center,
//     setMapCenter: (arg: _MapProps) => set((state) => ({mapCenter: arg})),
//
// }))
//
// export default useMapStore
