import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        userName: string;
        token: string;
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}