// import LandingPage from "@pages/Landing";
import { createHashRouter } from "react-router";
import Login from "../views/login";
import Home from "../views/home";


// Here we add main routes and if you want to have nested routes you must use children: [] as done in /app/*

const router = createHashRouter([
    { path: "/", Component: Login },
    { path: "/login", Component: Login },
    { path: "/home", Component: Home },
])

export default router;
