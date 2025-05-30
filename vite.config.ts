import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        // vite config
        define: {
            APP_HOME: JSON.stringify(env.APP_ENV),
            REACT_APP_KAKAO_JS_KEY: JSON.stringify(env.APP_ENV),
            MAP_SERVER_CONTEXT_PATH: JSON.stringify(env.APP_ENV),
            MAP_SERVER_PORT: JSON.stringify(env.APP_ENV),
        },
        base: process.env.NODE_ENV === "development" ? "/" : '/main',
        server: {
            cors: {
                credentials: true
            },
        },
        plugins: [react({
            babel: {
                plugins: [
                    [
                        'babel-plugin-styled-components',
                        {displayName: true, fileName: false}
                    ]
                ]
            },
        }), tsconfigPaths(),
            // moveIndexHtml()
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: [
                // {find: "@", replacement: path.resolve(__dirname, 'src')},
                {find: "@css", replacement: path.resolve(__dirname, './src/assets/css')},
                {find: "@image", replacement: path.resolve(__dirname, './src/assets/image')},
                {find: "@component", replacement: path.resolve(__dirname, './src/components')},
                {find: "@hook", replacement: path.resolve(__dirname, './src/hooks')},
                {find: "@query", replacement: path.resolve(__dirname, './src/querys')},
                {find: "@store", replacement: path.resolve(__dirname, './src/store')},
                {find: "@type", replacement: path.resolve(__dirname, './src/types')},
                {find: "@page", replacement: path.resolve(__dirname, './src/page')},
                {find: "@config", replacement: path.resolve(__dirname, './src/config')},
            ],
            'styled-components': 'styled-components/dist/styled-components.esm.js',
        },
        build: {
            chunkSizeWarningLimit: 3600,
            sourcemap: false,
            rollupOptions: {
                output: {
                    // manualChunks(id) {
                    //     if (id.includes('node_modules')) {
                    //         return id.toString()
                    //             .split('node_modules/')[1]
                    //             .split('/')[0].toString();
                    //     }
                    // },
                    assetFileNames: (assetInfo) => {
                        // @ts-ignore
                        let extType = assetInfo.name.split(".").at(1);
                        // @ts-ignore
                        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                            extType = "img";
                        }
                        return `assets/${extType}/[name]-[hash][extname]`;
                    },
                    chunkFileNames: "assets/js/[name]-[hash].js",
                    entryFileNames: "assets/js/[name]-[hash].js",
                }
            },
            outDir: '../src/main/resources/static', // Spring Boot의 정적 리소스 디렉토리
            assetsDir: 'assets',
            emptyOutDir: true,
            assetsInlineLimit: 0,
        },
    }
})
