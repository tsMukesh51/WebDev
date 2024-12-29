import { JSXElementConstructor, ReactElement } from "react";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { Navigate } from "react-router-dom";

const authenticatedRoutes = [Dashboard];
const unauthenticatedRoutes = [Signin, Signup]

export function RedirectRight({ comp }: { comp: JSX.Element }): ReactElement {
    function isAuthenticated() {
        const token = localStorage.getItem('token')?.toString()?.split(" ")[1];

        if (token && token !== "") {
            try {
                // Extract the payload segment of the token
                const base64Payload = token.split(".")[1]
                    .replace(/-/g, "+")
                    .replace(/_/g, "/")
                    .padEnd(token.split(".")[1].length + (4 - token.split(".")[1].length % 4) % 4, "=");

                // Decode and parse the payload
                const payload = JSON.parse(atob(base64Payload));

                // Check if the payload has an `exp` field and validate it
                if (payload.exp) {
                    const expired = Date.now() >= payload.exp * 1000; // Convert `exp` to milliseconds
                    return !expired;
                }

                // If no `exp` field, consider the token invalid
                return false;
            } catch (err) {
                console.error("Error while checking token:", err);
                return false;
            }
        }

        // Token is missing or invalid
        return false;
    }

    if (authenticatedRoutes.includes(comp.type)) {
        console.log('auth')
        if (isAuthenticated()) {
            console.log('suthed')
            return comp;
        } else {
            history.replaceState({}, "", '/signin');
            return <Signin />;
        }
    } else if (unauthenticatedRoutes.includes(comp.type)) {
        console.log('unauth')
        if (isAuthenticated()) {
            history.replaceState({}, "", '/');
            return <Dashboard />;
        } else {
            return comp;
        }
    } else {
        return <Signin />;
    }
}