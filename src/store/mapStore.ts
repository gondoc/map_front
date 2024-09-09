import {create} from "zustand";
import {MAP_DEFAULT_CONST} from "../config/constant";

interface IMapStore {

    resetMapState: () => void;

    zoomLevel: number;
    setZoomLevel: (arg: number) => void;

    mapCenter: { center: { lat: number, lng: number } };
    setMapCenter: (arg: { center: { lat: number, lng: number } }) => void;
}

const useMapStore = create<IMapStore>((set) => ({
    resetMapState: () => set(() => ({
        zoomLevel: MAP_DEFAULT_CONST.zoomLv.init,
        mapCenter: MAP_DEFAULT_CONST.position
    })),

    zoomLevel: MAP_DEFAULT_CONST.zoomLv.init,
    setZoomLevel: (arg: number) => set((state) => ({zoomLevel: arg})),

    mapCenter: MAP_DEFAULT_CONST.position,
    setMapCenter: (arg: { center: { lat: number, lng: number } }) => set((state) => ({mapCenter: arg})),
}))

export default useMapStore
