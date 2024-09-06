import {create} from "zustand";
import {ISnbInfo, TitleType} from "../types/common.types";
import {INIT_SNB_INFO} from "../config/constant";

interface IViewStore {
    navInfo: ISnbInfo,
    setNavInfo: (arg: ISnbInfo) => void;
    resetNavInfo: () => void;

    // currentSnbItem: TitleType,
    // setCurrentSnbItem: (arg: TitleType) => void;
}

const useViewStore = create<IViewStore>((set) => ({
    navInfo: INIT_SNB_INFO,
    setNavInfo: (arg: ISnbInfo) => set((state) => ({navInfo: arg})),
    resetNavInfo: () => set(() => ({navInfo: INIT_SNB_INFO})),

    // currentSnbItem: "none",
    // setCurrentSnbItem: (arg: TitleType) => set((state) => ({currentSnbItem: arg})),

}))

export default useViewStore
