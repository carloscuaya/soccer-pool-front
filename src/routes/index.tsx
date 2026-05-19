import { createHashRouter } from "react-router";
import Login from "@views/login";
import Home from "@views/home";
import Matches from "@views/matches";
import Leaderboard from "@views/leaderboard";
import UpdatePassword from "@views/update-password";
import AuthenticatedLayout from "@layouts/AuthenticatedLayout";

const router = createHashRouter([
    { path: "/", Component: Login },
    { path: "/login", Component: Login },
    { path: "/update-password", Component: UpdatePassword },
    {
        Component: AuthenticatedLayout,
        children: [
            { path: "/home", Component: Home },
            { path: "/matches", Component: Matches },
            { path: "/leaderboard", Component: Leaderboard },
        ]
    }
])

export default router;
