import {create} from "zustand";

interface IViewStore {
    activeSubItemId: string | null;
    setActiveSubItemId: (arg: string | null) => void;

    activeYear: string | null;
    setActiveYear: (arg: string | null) => void;
}

const useViewStore = create<IViewStore>((set) => ({
    activeSubItemId: null,
    setActiveSubItemId: (arg: string | null) => set((state) => ({activeSubItemId: arg})),

    activeYear: null,
    setActiveYear: (arg: string | null) => set((state) => ({activeYear: arg})),

}))

export default useViewStore
