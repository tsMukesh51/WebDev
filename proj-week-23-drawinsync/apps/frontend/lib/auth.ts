import CredentialsProvider from 'next-auth/providers/credentials';
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "username", type: "text", placeholder: "ramcharan" },
                password: { label: "password", type: "password", placeholder: "P@ssw0rd" }
            },
            async authorize(credentials, req) {
                const verifiedUser = await fetch(`${process.env.HTTP_SERVER_URL}/user/signin`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                if (verifiedUser.ok) {
                    const userDetails = verifiedUser.user;
                    userDetails.token = verifiedUser.token;
                    return userDetails;
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
}