import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {IHistory, IYearHistory} from "@type/hist.types";
import {QueryKeys} from "@query/QueryKeys";
import Url from "@config/url";

export const useHistQuery = (): UseQueryResult<IHistory[], AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.list()],
        queryFn: () => axios.get(Url.MAP.LIST),
        enabled: false,
        select: ({data}) => data?.data,
    })
}

export const useYearHistQuery = (): UseQueryResult<IYearHistory[], AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.year()],
        queryFn: () => axios.get(Url.MAP.YEAR),
        enabled: false,
        select: ({data}) => data?.data,
    })
}
