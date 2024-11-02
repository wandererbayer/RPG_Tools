import './index.css'
import React from 'react';
import * as ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App';
import Players from './pages/players';
import Enemies from './pages/Enemies';
import Tracker from './pages/Tracker';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

    },
    {
        path: "/players",
        element: <Players />,

    },
    {
        path: "/enemies",
        element: <Enemies />,

    },
    {
        path: "/tracker",
        element: <Tracker />,

    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
