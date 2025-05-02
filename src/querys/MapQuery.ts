import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {IResponse} from "@type/common.types";
import {IHistory, IYearHistory} from "@type/hist.types";
import {QueryKeys} from "@query/QueryKeys";
import Url from "@config/url";

export const useHistQuery = (): UseQueryResult<IResponse<IHistory[]>, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.list()],
        queryFn: () => axios.get(Url.MAP.LIST),
        enabled: false,
    })
}

export const useYearHistQuery = (): UseQueryResult<IResponse<IYearHistory[]>, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.year()],
        queryFn: () => axios.get(Url.MAP.YEAR),
        enabled: false,
    })
}
