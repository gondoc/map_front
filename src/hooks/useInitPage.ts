import {useHistQuery, useYearHistQuery} from "../querys/MapQuery";
import {useEffect} from "react";
import {IHistory} from "../types/hist.types";
import {useQueryClient} from "@tanstack/react-query";
import {QueryKeys} from "../querys/QueryKeys";

const UseInitPage = () => {

    const qc = useQueryClient()
    const {refetch: histItemsFetch} = useHistQuery();
    const {refetch: yearHistItemsFetch} = useYearHistQuery();

    useEffect(() => {
        histItemsFetch().then(({data}) => {
            const histItems: IHistory[] = data?.data && data?.data.length > 0 ? data?.data : [];
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
