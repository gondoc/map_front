import {useHistQuery} from "../querys/MapQuery";
import {useEffect} from "react";

const UseInitPage = () => {

    const {refetch: histApiCall} = useHistQuery();

    useEffect(() => {
        histApiCall().then(({data}) => {
            console.log("history init fetch success !! ")
        }).catch((error) => {
            console.error("error ", error)
            console.log("history init fetch failed !! ")
        }).finally(() => {
            console.log("history init fetch finished !! ")
        });
    }, [])
}

export default UseInitPage
