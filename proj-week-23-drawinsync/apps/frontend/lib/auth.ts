import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginUserSchema } from '@repo/lib/types';
import { JWT } from 'next-auth/jwt';
import { NextAuthOptions } from 'next-auth';
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
                    return null;
                }
                const response = await fetch(`${process.env.HTTP_SERVER_URL}/user/signin`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                });
                if (!response.ok) {
                    return null;
                }
                const verifiedUser = await response.json();
                // const userDetails = verifiedUser.user;
                // userDetails.token = verifiedUser.token;
                // console.log(verifiedUser);
                const user = {
                    userName: verifiedUser.user.userName,
                    email: verifiedUser.user.email,
                    id: verifiedUser.user.id,
                    jwt_token: verifiedUser.token,
                };
                return user;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    callbacks: {
        jwt: async ({ token, user, account, profile, trigger, session }) => {
            let newToken = { ...token };
            if (user) {
                newToken = {
                    ...newToken,
                    jwt_token: `Bearer ${user.jwt_token}`
                };
            }
            // console.log("New Token:", newToken);
            return newToken;
        },
        session: async ({ session, token, user }) => {
            // console.log("Session:", session);

            if (token) {
                session.user = {
                    ...session.user,
                    jwt_token: token.jwt_token,
                };
            }

            // console.log("New Session:", session);
            return { ...session, };
        }

    }
} satisfies NextAuthOptions;