import { DefaultJWT } from 'next-auth/jwt';
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        userName?: string;
        jwtToken?: string;
    }

    interface Session extends DefaultSession {
        user?: {
            id?: string;
            email?: string;
            userName?: string;
            token?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string;
    }
}