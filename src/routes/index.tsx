import { createHashRouter } from "react-router";
import Login from "@views/login";
import Home from "@views/home";
import Matches from "@views/matches";
import Leaderboard from "@views/leaderboard";
import UpdatePassword from "@views/update-password";
import TournamentsAdmin from "@views/admin/tournaments-admin";
import CreateTournament from "@views/admin/create-tournament";
import UpdateTournament from "@views/admin/update-tournament";
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
            { path: "/tournaments-admin", Component: TournamentsAdmin },
            { path: "/tournaments-admin/create", Component: CreateTournament },
            { path: "/tournaments-admin/:id/edit", Component: UpdateTournament },
        ]
    }
])

export default router;
