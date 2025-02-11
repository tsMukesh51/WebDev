import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

console.log(process.env.NEXTAUTH_SECRET);
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Name_96' },
                password: { label: 'Password', type: 'password', placeholder: 'p@ssW0rd' }
            },
            async authorize(credentials, req) {
                // console.log(credentials);
                // console.log(req);
                const user = { id: "2", name: 'Mukesh', email: 'something@emial.com' };
                // if (credentials?.username == "tsMukesh")
                    return user;
                // return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };