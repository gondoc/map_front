import {create} from "zustand";
import {_MapProps} from "react-kakao-maps-sdk/dist/components/Map";
import {MAP_DEFAULT_CONST} from "../config/constant";

interface IMapStore {

    zoomLevel: number;
    setZoomLevel: (arg: number) => void;

    mapCenter: { center: { lat: number, lng: number } };
    setMapCenter: (arg: { center: { lat: number, lng: number } }) => void;
}

const useMapStore = create<IMapStore>((set) => ({
    zoomLevel: MAP_DEFAULT_CONST.zoomLv,
    setZoomLevel: (arg: number) => set((state) => ({zoomLevel: arg})),

    mapCenter: MAP_DEFAULT_CONST.position,
    setMapCenter: (arg: { center: { lat: number, lng: number } }) => set((state) => ({mapCenter: arg})),

}))

export default useMapStore
