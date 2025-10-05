import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import MainPage from "@page/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "@css/common.css"
import NotFoundPage from "@page/NotFoundPage";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={"/main"}>
            <Routes>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path={"/*"} element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);
