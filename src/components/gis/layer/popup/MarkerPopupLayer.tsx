import React from "react";
import useViewStore from "@store/viewStore";
import {IHistory} from "@type/hist.types";
import MarkerPopup from "@component/gis/layer/popup/MarkerPopup";

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
