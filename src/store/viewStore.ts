import {create} from "zustand";
import {INavInfo, TitleType, ToastStatusType} from "../types/common.types";
import {INIT_SNB_INFO} from "../config/constant";

interface IViewStore {
    navInfo: INavInfo,
    setNavInfo: (arg: INavInfo) => void;
    resetNavInfo: () => void;

    searchWord: string,
    setSearchWord: (arg: string) => void;

    toastStatus: ToastStatusType,
    setToastStatus: (arg: ToastStatusType) => void;
}

const useViewStore = create<IViewStore>((set) => ({
    navInfo: INIT_SNB_INFO,
    setNavInfo: (arg: INavInfo) => set((state) => ({navInfo: arg})),
    resetNavInfo: () => set(() => ({navInfo: INIT_SNB_INFO})),

    searchWord: "",
    setSearchWord: (arg: string) => set((state) => ({searchWord: arg})),

    toastStatus: "none",
    setToastStatus: (arg: ToastStatusType) => set(() => ({toastStatus: arg})),
}))

export default useViewStore
