// app/components/Navbar.js
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/search">Search</Link></li>
                {session?.user.isAdmin && (
                    <li><Link href="/admin/dashboard">Admin Dashboard</Link></li>
                )}
                {!session ? (
                    <>
                        <li><Link href="/auth/login">Login</Link></li>
                        <li><Link href="/auth/register">Register</Link></li>
                    </>
                ) : (
                    <li><button onClick={() => signOut()}>Sign Out</button></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
