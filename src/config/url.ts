export const isDev: boolean = process.env.NODE_ENV === "development";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const port: number = import.meta.env.VITE_MAP_SERVER_PORT;
const ctx: string = isDev ? "/map" : "";

export const URL = {

    MAP: {
        // LIST: `http://${isDev ? window.location.hostname : "spring-backend"}:${port}${ctx}/api/hist/items`,
        // YEAR: `http://${isDev ? window.location.hostname : "spring-backend"}:${port}${ctx}/api/hist/year-items`
        LIST: `${baseUrl}/api/hist/items`,
        YEAR: `${baseUrl}/api/hist/year-items`
    }
}

export default URL
