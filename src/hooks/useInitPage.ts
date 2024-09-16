import {useHistQuery, useYearHistQuery} from "../querys/MapQuery";
import {useEffect} from "react";

const UseInitPage = () => {

    const {refetch: histItemsFetch} = useHistQuery();
    const {refetch: yearHistItemsFetch} = useYearHistQuery();

    useEffect(() => {
        histItemsFetch().then(() => {
            console.log("history init fetch success !! ")
        }).catch((error) => {
            console.error("error ", error)
            console.log("history init fetch failed !! ")
        }).finally(() => {
            console.log("history init fetch finished !! ")
        });

        yearHistItemsFetch().then(() => {
            console.log("by year init fetch success !! ")
        }).catch((error) => {
            console.error("error ", error)
            console.log("by year init fetch failed !! ")
        }).finally(() => {
            console.log("by year init fetch finished !! ")
        })
    })
}

export default UseInitPage
