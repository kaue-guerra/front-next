import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clienteSecret: process.env.GITHUB_SECRET,
        }),
    ],

    database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);