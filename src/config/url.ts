const baseUrl = import.meta.env.VITE_API_BASE_URL;
const ctxPath: string = import.meta.env.VITE_MAP_SERVER_CONTEXT_PATH;

export const URL = {

    MAP: {
        // LIST: `http://${isDev ? window.location.hostname : "spring-backend"}:${port}${ctx}/api/hist/items`,
        // YEAR: `http://${isDev ? window.location.hostname : "spring-backend"}:${port}${ctx}/api/hist/year-items`
        LIST: `${baseUrl}/${ctxPath}/api/hist/items`,
        YEAR: `${baseUrl}/${ctxPath}/api/hist/year-items`
    },
    IMAGE: (id: string, fileNm: string) => `${baseUrl}/${ctxPath}/images/`.concat(id.concat("|").concat(fileNm)),

}

export default URL
