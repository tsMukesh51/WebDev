import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        userName?: string;
        jwt_token?: string;
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}