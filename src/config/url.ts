import {envConfig} from "./envConfig";

// const port: number = envConfig.MAP_SERVER.PORT as unknown as number;
// const ctx: string = envConfig.MAP_SERVER.CONTEXT_PATH as unknown as string;

const port: number = 18080;
const ctx: string = "map";

export const URL = {

    MAP: {
        list: `http://${window.location.hostname}:${port}/${ctx}/api/hist`
    }
}

export default URL
