import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        username: string;
        token: string;
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}