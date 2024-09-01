export const envConfig = {
    // 카카오 js key
    API_KAKAO_JS_KEY: process.env.REACT_APP_KAKAO_JS_KEY,

    // 서버 통신
    MAP_SERVER: {
        CONTEXT_PATH: process.env.MAP_SERVER_CONTEXT_PATH,
        PORT: process.env.MAP_SERVER_PORT
    }
}
