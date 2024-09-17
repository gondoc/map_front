import MarkerPopup from "./MarkerPopup";
import {IHistory} from "../../../../types/hist.types";
import React from "react";
import useViewStore from "../../../../store/viewStore";

const MarkerPopupLayer = (props: { activeHistItem: IHistory | null }) => {

    const {
        searchWord
    } = useViewStore();

    return (
        <>
            {
                props.activeHistItem?.histNm.includes(searchWord) &&
                <MarkerPopup
                    key={`MARKER_POPUP_KEY_${props?.activeHistItem?.id}`}
                    history={props?.activeHistItem as IHistory}
                />
            }
        </>
    )
}

export default MarkerPopupLayer
