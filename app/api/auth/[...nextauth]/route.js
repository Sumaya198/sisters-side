import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                await dbConnect();

                const { email, password } = credentials;

                // Find user in the database
                const user = await User.findOne({ email });

                if (!user) {
                    console.error('No user found with this email');
                    throw new Error('No user found with this email');
                }

                // Validate password
                const isValidPassword = await bcrypt.compare(password, user.password);

                if (!isValidPassword) {
                    console.error('Invalid password');
                    throw new Error('Invalid password');
                }

                return { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin };
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.isAdmin = token.isAdmin;
            return session;
        },
    },
    debug: true, // Enable debug messages in the console
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
