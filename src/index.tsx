import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import MainPage from "./page/MainPage";
import "../src/assets/css/common.css"

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <QueryClientProvider client={queryClient}>
        <MainPage/>
    </QueryClientProvider>
);
