// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    const protectedPaths = ['/api/reviews', '/user']; // Adjust as needed
    const token = req.cookies.get('token')?.value;

    if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/reviews/:path*', '/user/:path*'],
};
