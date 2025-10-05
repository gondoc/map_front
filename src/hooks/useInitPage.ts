import {QueryKeys} from "@query/QueryKeys";
import {useHistQuery, useYearHistQuery} from "@query/MapQuery";
import {useEffect} from "react";
import {IHistory} from "@type/hist.types";
import {useQueryClient} from "@tanstack/react-query";

const UseInitPage = () => {

    const qc = useQueryClient()
    const {refetch: histItemsFetch} = useHistQuery();
    const {refetch: yearHistItemsFetch} = useYearHistQuery();

    useEffect(() => {
        histItemsFetch().then(({data}) => {
            const histItems: IHistory[] = data && data.length > 0 ? data : [];
            qc.setQueryData(QueryKeys.MAP.list(), histItems);
            qc.setQueryData(QueryKeys.MAP.time(), Array.from(histItems).reverse())
            console.log("history init fetch success !! ")
        }).catch((error) => {
            console.error("error ", error)
            console.log("history init fetch failed !! ")
        });

        yearHistItemsFetch().then(() => {
            console.log("by year init fetch success !! ")
        }).catch((error) => {
            console.error("error ", error)
            console.log("by year init fetch failed !! ")
        });
    })
}

export default UseInitPage
