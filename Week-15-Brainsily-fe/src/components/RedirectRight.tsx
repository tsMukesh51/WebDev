import { ReactElement } from "react";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

const authenticatedRoutes = [<Dashboard />];
const unauthenticatedRoutes = [<Signin />, <Signup />];

export function RedirectRight({ comp }: { comp: ReactElement }) {
    function isAuthenticated() {
        const token = localStorage.getItem('token')?.split(" ")[1];
        if (token && token != "") {
            const payload = decodeURIComponent(atob(token)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join(""));
            const { exp } = JSON.parse(payload);
            const expired = Date.now() >= exp * 1000
            return expired
        }
        return false;
    }

    if (authenticatedRoutes.includes(comp)) {
        if (isAuthenticated()) {
            return comp;
        } else {
            return <Signin />;
        }
    } else if (unauthenticatedRoutes.includes(comp)) {
        if (isAuthenticated()) {
            return <Dashboard />;
        } else {
            return comp;
        }
    }
}