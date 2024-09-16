import MarkerPopup from "./MarkerPopup";
import {IHistory} from "../../../../types/hist.types";
import React from "react";

const MarkerPopupLayer = (props: { activeHistItem: IHistory | null }) => {

    return (
        <MarkerPopup
            key={`MARKER_POPUP_KEY_${props?.activeHistItem?.id}`}
            history={props?.activeHistItem as IHistory}
        />
    )
}

export default MarkerPopupLayer
