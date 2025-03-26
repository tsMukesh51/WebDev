import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginUserSchema } from '@repo/lib/types';
import { JWT } from 'next-auth/jwt';
import { NextAuthOptions } from 'next-auth';
import { EXPIRATIONTIME } from './config';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                userName: { label: "username", type: "text", placeholder: "ramcharan" },
                password: { label: "password", type: "password", placeholder: "P@ssw0rd" }
            },
            authorize: async (credentials, req) => {
                const { success, data, error } = LoginUserSchema.safeParse(credentials);
                if (!success) {
                    console.log("LoginUserSchema parse failed");
                    return null;
                }
                try {
                    const response = await fetch(`${process.env.HTTP_SERVER_URL}/user/signin`, {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: { "Content-Type": "application/json" }
                    });
                    if (!response.ok) {
                        const issues = await response.json();
                        console.log(issues);
                        console.log("Response not OK");
                        return null;
                    }
                    const verifiedUser = await response.json();
                    const user = {
                        userName: verifiedUser.user.userName,
                        email: verifiedUser.user.email,
                        id: verifiedUser.user.id,
                        jwtToken: verifiedUser.token,
                        expiresAt: verifiedUser.expiresAt
                    };
                    return user;
                } catch (err: any) {
                    console.log(JSON.stringify(err));
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    session: {
        maxAge: EXPIRATIONTIME
    },
    jwt: {
        maxAge: EXPIRATIONTIME
    },
    callbacks: {
        jwt: async ({ token, user, account, profile, trigger, session }) => {
            let newToken = { ...token };
            if (user) {
                newToken = {
                    ...newToken,
                    id: user.id,
                    accessToken: `Bearer ${user.jwtToken}`,
                };
            }
            return newToken;
        },
        session: async ({ session, token, user }) => {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id,
                    token: token.accessToken,
                };
            }
            return { ...session };
        }
    }
} satisfies NextAuthOptions;