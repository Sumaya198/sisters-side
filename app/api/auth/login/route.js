// app/api/auth/login/route.js
import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(req) {
    await dbConnect();

    const { email, password } = await req.json();

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Password mismatch');
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Set token as a cookie
        const cookie = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24, // 1 day
            sameSite: 'strict',
            path: '/',
        });

        return new Response(JSON.stringify({ token, user }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': cookie,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
