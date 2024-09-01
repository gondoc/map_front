import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {QueryKeys} from "./QueryKeys";
import Url from "../config/url";
import {IHistory} from "../types/hist.types";
import {IResponse} from "../types/common.types";

export const useHistQuery = (): UseQueryResult<IResponse<IHistory[]>, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.list()],
        queryFn: () => axios.get(Url.MAP.list),
        enabled: false,
    })
}
